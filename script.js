/* ==========================================================================
   JavaLab by SAIOS — Application Logic
   Vanilla JS, no framework, no build step.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Application State
     ------------------------------------------------------------------ */
  const state = {
    view: "home",          // home | levels | topics | quiz | result | review | dashboard | about
    currentLevel: null,    // "level1" | "level2"
    currentTopicKey: null,
    currentQuestionIndex: 0,
    selectedAnswers: [],   // original option index chosen per question, or null
    optionOrders: [],       // display index -> original option index for each question
    answerLocked: false,   // prevents double-click on current question
    quizFinished: false
  };

  const STORAGE_KEY = "javalab_progress_v1";

  /* ------------------------------------------------------------------
     Storage helpers (localStorage) — safe wrappers, never throw out
     ------------------------------------------------------------------ */
  function loadProgress() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return { topics: {}, attempts: [] };
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return { topics: {}, attempts: [] };
      parsed.topics = parsed.topics || {};
      parsed.attempts = parsed.attempts || [];
      return parsed;
    } catch (e) {
      console.warn("JavaLab: could not read saved progress, starting fresh.", e);
      return { topics: {}, attempts: [] };
    }
  }

  function saveProgress(progress) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn("JavaLab: could not save progress (localStorage unavailable).", e);
    }
  }

  function recordAttempt(levelKey, topicKey, correctCount, total) {
    const progress = loadProgress();
    const percent = Math.round((correctCount / total) * 100);
    const topicId = levelKey + ":" + topicKey;

    if (!progress.topics[topicId]) {
      progress.topics[topicId] = { attempts: 0, bestScore: 0, lastScore: 0 };
    }
    const t = progress.topics[topicId];
    t.attempts += 1;
    t.lastScore = percent;
    t.bestScore = Math.max(t.bestScore, percent);

    progress.attempts.unshift({
      levelKey: levelKey,
      topicKey: topicKey,
      topicTitle: quizData[levelKey].topics[topicKey].title,
      score: percent,
      correct: correctCount,
      total: total,
      date: new Date().toISOString()
    });
    progress.attempts = progress.attempts.slice(0, 12);

    const reward = awardXp(levelKey, topicKey, correctCount, total);
    progress.xp = reward.totalXp;
    progress.streak = reward.streak;
    progress.lastActivityDate = localDateKey();
    progress.lastReward = reward.gained;
    saveProgress(progress);
  }

  function getTopicStats(levelKey, topicKey) {
    const progress = loadProgress();
    const topicId = levelKey + ":" + topicKey;
    return progress.topics[topicId] || { attempts: 0, bestScore: 0, lastScore: 0 };
  }

  function getLevelProgress(levelKey) {
    const progress = loadProgress();
    const topics = Object.keys(quizData[levelKey].topics);
    let completed = 0;
    let scoreSum = 0;
    topics.forEach(function (key) {
      const stat = progress.topics[levelKey + ":" + key];
      if (stat && stat.attempts > 0) {
        completed += 1;
        scoreSum += stat.bestScore;
      }
    });
    const percent = topics.length ? Math.round((completed / topics.length) * 100) : 0;
    return { completed: completed, total: topics.length, percent: percent };
  }

  function getOverallStats() {
    const progress = loadProgress();
    const allAttempts = progress.attempts || [];
    const topicEntries = Object.values(progress.topics || {});
    const completedQuizzes = topicEntries.reduce(function (sum, t) { return sum + t.attempts; }, 0);
    const avgScore = topicEntries.length
      ? Math.round(topicEntries.reduce(function (sum, t) { return sum + t.lastScore; }, 0) / topicEntries.length)
      : 0;
    const bestScore = topicEntries.length
      ? Math.max.apply(null, topicEntries.map(function (t) { return t.bestScore; }))
      : 0;
    return { completedQuizzes: completedQuizzes, avgScore: avgScore, bestScore: bestScore, recent: allAttempts };
  }


  /* ------------------------------------------------------------------
     Gamification + learning helpers
     ------------------------------------------------------------------ */
  function getProgressData() {
    const progress = loadProgress();
    progress.xp = Number(progress.xp) || 0;
    progress.streak = Number(progress.streak) || 0;
    progress.lastActivityDate = progress.lastActivityDate || null;
    return progress;
  }

  function localDateKey(date) {
    const d = date || new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function daysBetween(dateA, dateB) {
    const a = new Date(dateA + "T00:00:00");
    const b = new Date(dateB + "T00:00:00");
    return Math.round((b - a) / 86400000);
  }

  function updateStreak(progress) {
    const today = localDateKey();
    if (!progress.lastActivityDate) {
      progress.streak = 1;
    } else {
      const gap = daysBetween(progress.lastActivityDate, today);
      if (gap === 1) progress.streak += 1;
      else if (gap > 1) progress.streak = 1;
    }
    progress.lastActivityDate = today;
  }

  function awardXp(levelKey, topicKey, correctCount, total) {
    const progress = getProgressData();
    const gained = (correctCount * 10) + 20;
    progress.xp += gained;
    updateStreak(progress);
    saveProgress(progress);
    return { gained: gained, totalXp: progress.xp, streak: progress.streak };
  }

  function getXpLevel(xp) {
    return Math.max(1, Math.floor((xp || 0) / 100) + 1);
  }

  function getContinueLearning() {
    const progress = loadProgress();
    const recent = progress.attempts && progress.attempts[0];
    if (recent && quizData[recent.levelKey] && quizData[recent.levelKey].topics[recent.topicKey]) return recent;
    for (const levelKey of ["level1", "level2"]) {
      const keys = Object.keys(quizData[levelKey].topics);
      for (const key of keys) {
        const stat = progress.topics[levelKey + ":" + key];
        if (!stat || !stat.attempts) return { levelKey: levelKey, topicKey: key, topicTitle: quizData[levelKey].topics[key].title, score: 0 };
      }
    }
    return null;
  }

  function getAchievements() {
    const progress = getProgressData();
    const allTopics = Object.keys(quizData.level1.topics).length + Object.keys(quizData.level2.topics).length;
    const completedTopics = Object.keys(progress.topics || {}).filter(function (key) {
      return progress.topics[key] && progress.topics[key].attempts > 0;
    }).length;
    const totalAttempts = (progress.attempts || []).length;
    const hasPerfect = Object.values(progress.topics || {}).some(function (t) { return t.bestScore === 100; });
    return [
      { icon: "fa-solid fa-flag-checkered", title: "أول خطوة", desc: "أكمل أول اختبار", unlocked: totalAttempts >= 1 },
      { icon: "fa-solid fa-star", title: "الدرجة الكاملة", desc: "احصل على 100%", unlocked: hasPerfect },
      { icon: "fa-solid fa-fire", title: "ثلاثة أيام", desc: "حافظ على Streak لمدة 3 أيام", unlocked: progress.streak >= 3 },
      { icon: "fa-solid fa-layer-group", title: "مستكشف Java", desc: "أكمل 5 مواضيع", unlocked: completedTopics >= 5 },
      { icon: "fa-solid fa-medal", title: "ملتزم بالتعلم", desc: "أكمل 10 اختبارات", unlocked: totalAttempts >= 10 },
      { icon: "fa-solid fa-crown", title: "Master Level", desc: "أكمل جميع المواضيع", unlocked: completedTopics >= allTopics }
    ];
  }

  /* ------------------------------------------------------------------
     Utilities
     ------------------------------------------------------------------ */
  function qs(selector, root) { return (root || document).querySelector(selector); }
  function qsa(selector, root) { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); }

  function escapeHtml(str) {
    if (str === undefined || str === null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];

  function showToast(message) {
    const toast = qs("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(function () {
      toast.classList.remove("show");
    }, 2200);
  }

  function getTopic(levelKey, topicKey) {
    return quizData[levelKey] && quizData[levelKey].topics[topicKey];
  }

  function countLevelQuestions(levelKey) {
    const topics = quizData[levelKey].topics;
    return Object.keys(topics).length * 10;
  }

  /* ------------------------------------------------------------------
     Navigation
     ------------------------------------------------------------------ */
  function navigate(view, params) {
    params = params || {};

    // Focus mode belongs only to the quiz view. Always restore the normal
    // platform shell when leaving the quiz so the header/navigation return.
    if (view !== "quiz") {
      document.body.classList.remove("focus-mode");
    }

    state.view = view;

    if (params.level) state.currentLevel = params.level;
    if (params.topic) state.currentTopicKey = params.topic;

    if (view === "quiz" && params.startNew) {
      startQuiz(state.currentLevel, state.currentTopicKey);
    }

    closeMobileNav();
    render();
    window.scrollTo(0, 0);
  }

  function closeMobileNav() {
    const mobileNav = qs("#mobileNav");
    if (mobileNav) mobileNav.classList.remove("open");
  }

  /* ------------------------------------------------------------------
     Quiz Engine
     ------------------------------------------------------------------ */
  function startQuiz(levelKey, topicKey) {
    const topic = getTopic(levelKey, topicKey);
    if (!topic) return;
    state.currentLevel = levelKey;
    state.currentTopicKey = topicKey;
    state.currentQuestionIndex = 0;
    state.selectedAnswers = new Array(topic.questions.length).fill(null);
    state.optionOrders = topic.questions.map(function (question) {
      const order = question.options.map(function (_, index) { return index; });
      for (let i = order.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = order[i];
        order[i] = order[j];
        order[j] = temp;
      }
      return order;
    });
    state.answerLocked = false;
    state.quizFinished = false;
  }

  function selectAnswer(optionIndex) {
    if (state.answerLocked) return; // prevent changing after lock / double submission
    const order = state.optionOrders[state.currentQuestionIndex] || [0, 1, 2, 3];
    state.selectedAnswers[state.currentQuestionIndex] = order[optionIndex];
    state.answerLocked = true;
    renderQuizView();
  }

  function goToNextQuestion() {
    const topic = getTopic(state.currentLevel, state.currentTopicKey);
    const isLast = state.currentQuestionIndex === topic.questions.length - 1;

    if (state.selectedAnswers[state.currentQuestionIndex] === null || state.selectedAnswers[state.currentQuestionIndex] === undefined) {
      showToast("الرجاء اختيار إجابة قبل المتابعة");
      return;
    }

    if (isLast) {
      finishQuiz();
      return;
    }

    state.currentQuestionIndex += 1;
    state.answerLocked = false;
    renderQuizView();
  }

  function finishQuiz() {
    if (state.quizFinished) return; // guard against duplicate submissions
    state.quizFinished = true;
    const topic = getTopic(state.currentLevel, state.currentTopicKey);
    let correct = 0;
    topic.questions.forEach(function (q, i) {
      if (state.selectedAnswers[i] === q.correctAnswer) correct += 1;
    });
    recordAttempt(state.currentLevel, state.currentTopicKey, correct, topic.questions.length);
    navigate("result");
  }

  function computeResult() {
    const topic = getTopic(state.currentLevel, state.currentTopicKey);
    let correct = 0;
    topic.questions.forEach(function (q, i) {
      if (state.selectedAnswers[i] === q.correctAnswer) correct += 1;
    });
    const total = topic.questions.length;
    const incorrect = total - correct;
    const percent = Math.round((correct / total) * 100);
    return { correct: correct, incorrect: incorrect, total: total, percent: percent };
  }

  function performanceMessage(percent) {
    if (percent >= 90) return "ممتاز! مستواك رائع 🔥";
    if (percent >= 80) return "ممتاز، استمر بالتقدم 🚀";
    if (percent >= 60) return "جيد جدًا، لكن ما زال أمامك مجال للتحسن 💪";
    if (percent >= 40) return "تحتاج إلى مراجعة بعض المفاهيم 📚";
    return "لا تستسلم، راجع الدرس وحاول مرة أخرى 🔥";
  }

  /* ------------------------------------------------------------------
     Rendering — main dispatcher
     ------------------------------------------------------------------ */
  const app = document.getElementById("app");

  function render() {
    // Defensive reset: focus mode must never leak into non-quiz screens.
    if (state.view !== "quiz") {
      document.body.classList.remove("focus-mode");
    }
    updateNavActiveState();
    switch (state.view) {
      case "home": app.innerHTML = renderHome(); attachHomeEvents(); break;
      case "levels": app.innerHTML = renderLevels(); attachLevelsEvents(); break;
      case "topics": app.innerHTML = renderTopics(); attachTopicsEvents(); break;
      case "quiz": app.innerHTML = renderQuiz(); attachQuizEvents(); break;
      case "result": app.innerHTML = renderResult(); attachResultEvents(); break;
      case "review": app.innerHTML = renderReview(); attachReviewEvents(); break;
      case "dashboard": app.innerHTML = renderDashboard(); attachDashboardEvents(); break;
      case "about": app.innerHTML = renderAbout(); attachAboutEvents(); break;
      default: app.innerHTML = renderHome(); attachHomeEvents();
    }
  }

  function updateNavActiveState() {
    qsa(".nav-link[data-nav]").forEach(function (link) {
      const target = link.getAttribute("data-nav");
      const isActive =
        (target === "home" && state.view === "home") ||
        (target === "levels" && (state.view === "levels" || state.view === "topics" || state.view === "quiz" || state.view === "result" || state.view === "review")) ||
        (target === "dashboard" && state.view === "dashboard") ||
        (target === "about" && state.view === "about");
      link.classList.toggle("active", isActive);
    });
  }

  /* ------------------------------------------------------------------
     View: Home
     ------------------------------------------------------------------ */
  function renderHome() {
    const totalQuestions = countLevelQuestions("level1") + countLevelQuestions("level2");
    const totalTopics = Object.keys(quizData.level1.topics).length + Object.keys(quizData.level2.topics).length;

    return (
      '<section class="hero container">' +
        '<div class="hero-copy">' +
          '<span class="hero-eyebrow"><i class="fa-solid fa-bolt" aria-hidden="true"></i> JavaLab by SAIOS Academy</span>' +
          '<h1>اختبر مهاراتك في <span>Java</span><br>وطوّر مستواك خطوة بخطوة</h1>' +
          '<p class="lead">منصة تدريبية تفاعلية تقدّم لك اختبارات Java حقيقية، بمستويين متدرّجين، وتتبّع تقدّم فوري لمهاراتك.</p>' +
          '<div class="hero-actions">' +
            '<button class="btn btn-primary" data-action="go-levels"><i class="fa-solid fa-play" aria-hidden="true"></i> ابدأ الاختبار</button>' +
            '<button class="btn btn-secondary" data-action="go-levels"><i class="fa-solid fa-book" aria-hidden="true"></i> استكشف المواضيع</button>' +
          '</div>' +
          '<div class="hero-stats">' +
            '<div class="hero-stat"><div class="num">' + totalTopics + '</div><div class="label">موضوع تعليمي</div></div>' +
            '<div class="hero-stat"><div class="num">' + totalQuestions + '</div><div class="label">سؤال حقيقي</div></div>' +
            '<div class="hero-stat"><div class="num">2</div><div class="label">مستويان</div></div>' +
          '</div>' +
        '</div>' +
        '<div class="hero-visual" aria-hidden="true">' + javaGlyphSVG() + '</div>' +
      '</section>' +

      '<section class="section container">' +
        '<h2 class="section-title">مستويان، مسار واضح</h2>' +
        '<p class="section-sub">ابدأ من الأساسيات وتدرّج نحو مفاهيم البرمجة الكائنية المتقدمة.</p>' +
        renderLevelGrid() +
      '</section>'
    );
  }

  function javaGlyphSVG() {
    return (
      '<svg viewBox="0 0 320 320" width="100%" height="100%" role="img" aria-label="Java programming code illustration">' +
        '<defs>' +
          '<linearGradient id="glow1" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0%" stop-color="#7CFF4F" stop-opacity="0.9"/>' +
            '<stop offset="100%" stop-color="#1F7A32" stop-opacity="0.6"/>' +
          '</linearGradient>' +
          '<filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">' +
            '<feGaussianBlur stdDeviation="5" result="blur"/>' +
            '<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>' +
          '</filter>' +
        '</defs>' +
        '<g class="hero-orbit-rings">' +
        '<circle cx="160" cy="160" r="130" fill="none" stroke="url(#glow1)" stroke-width="1.5" opacity="0.4" stroke-dasharray="7 9"/>' +
        '<circle cx="160" cy="160" r="103" fill="none" stroke="#A4FF6A" stroke-width="1" opacity="0.2" stroke-dasharray="3 8"/>' +
        '<circle cx="160" cy="30" r="4" fill="#7CFF4F" opacity="0.9" filter="url(#softGlow)"/>' +
        '</g>' +
        '<rect x="56" y="76" width="208" height="168" rx="20" fill="#081A12" stroke="#7CFF4F" stroke-opacity="0.48" stroke-width="1.5" filter="url(#softGlow)"/>' +
        '<rect x="56" y="76" width="208" height="34" rx="20" fill="#0D291A"/>' +
        '<path d="M56 96H264" stroke="#7CFF4F" stroke-opacity="0.14"/>' +
        '<circle cx="78" cy="93" r="4" fill="#7CFF4F" opacity="0.85"/>' +
        '<circle cx="92" cy="93" r="4" fill="#A4FF6A" opacity="0.55"/>' +
        '<circle cx="106" cy="93" r="4" fill="#EAF7EE" opacity="0.35"/>' +
        '<text x="160" y="165" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-size="13.5" font-weight="600" fill="#A4FF6A">&lt;/&gt;class Java {learn();}</text>' +
        '<circle cx="258" cy="68" r="6" fill="#7CFF4F" opacity="0.9"/>' +
        '<circle cx="63" cy="256" r="4" fill="#A4FF6A" opacity="0.65"/>' +
      '</svg>'
    );
  }

  function renderLevelGrid() {
    const p1 = getLevelProgress("level1");
    const p2 = getLevelProgress("level2");
    return (
      '<div class="level-grid">' +
        levelCard("level1", "Java Level 1", "أساسيات Java", "للمبتدئين", p1) +
        levelCard("level2", "Java Level 2", "المستوى المتقدم", "برمجة كائنية ومفاهيم متقدمة", p2, true) +
      '</div>'
    );
  }

  function levelCard(levelKey, tag, title, desc, progress, isLevel2) {
    const topicCount = Object.keys(quizData[levelKey].topics).length;
    const questionCount = topicCount * 10;
    return (
      '<button class="level-card' + (isLevel2 ? " level-2" : "") + '" data-action="open-level" data-level="' + levelKey + '">' +
        '<span class="level-tag">' + tag + '</span>' +
        '<h3>' + title + '</h3>' +
        '<p class="level-desc">' + desc + '</p>' +
        '<div class="level-meta">' +
          '<div><strong>' + topicCount + '</strong>مواضيع</div>' +
          '<div><strong>' + questionCount + '</strong>سؤال</div>' +
        '</div>' +
        '<div class="level-progress">' +
          '<div class="progress-track"><div class="progress-fill" style="width:' + progress.percent + '%"></div></div>' +
          '<div class="progress-label">تم إنجاز ' + progress.completed + ' من ' + progress.total + ' مواضيع</div>' +
        '</div>' +
        '<span class="btn btn-primary btn-block">ابدأ ' + (levelKey === "level1" ? "Level 1" : "Level 2") + '</span>' +
      '</button>'
    );
  }

  function attachHomeEvents() {
    qsa('[data-action="go-levels"]').forEach(function (btn) {
      btn.addEventListener("click", function () { navigate("levels"); });
    });
    qsa('[data-action="open-level"]').forEach(function (btn) {
      btn.addEventListener("click", function () { navigate("topics", { level: btn.getAttribute("data-level") }); });
    });
  }

  /* ------------------------------------------------------------------
     View: Levels
     ------------------------------------------------------------------ */
  function renderLevels() {
    return (
      '<div class="view-header container">' +
        '<h1>اختر مستواك</h1>' +
        '<p>ابدأ بالمستوى الأول إذا كنت مبتدئًا، أو انتقل مباشرة إلى المستوى الثاني إذا كنت تتقن الأساسيات.</p>' +
      '</div>' +
      '<div class="section container">' + renderLevelGrid() + '</div>'
    );
  }

  function attachLevelsEvents() { attachHomeEvents(); }

  /* ------------------------------------------------------------------
     View: Topics
     ------------------------------------------------------------------ */
  function renderTopics() {
    const levelKey = state.currentLevel || "level1";
    const level = quizData[levelKey];
    const topicKeys = Object.keys(level.topics);

    const cards = topicKeys.map(function (key) {
      const topic = level.topics[key];
      const stats = getTopicStats(levelKey, key);
      const bestLabel = stats.attempts > 0 ? stats.bestScore + "%" : "—";
      const difficulty = levelKey === "level1" ? "مبتدئ" : "متقدم";
      const difficultyIcon = levelKey === "level1" ? "fa-seedling" : "fa-rocket";
      return (
        '<article class="topic-card">' +
          '<div class="topic-icon"><i class="' + escapeHtml(topic.icon || "fa-solid fa-code") + '" aria-hidden="true"></i></div>' +
          '<div class="topic-heading-row"><h4>' + escapeHtml(topic.title) + '</h4><span class="difficulty-badge"><i class="fa-solid ' + difficultyIcon + '" aria-hidden="true"></i> ' + difficulty + '</span></div>' +
          '<div class="topic-meta">' +
            '<span><i class="fa-solid fa-circle-question" aria-hidden="true"></i> 10 أسئلة</span>' +
            '<span><i class="fa-solid fa-trophy" aria-hidden="true"></i> أفضل نتيجة: ' + bestLabel + '</span>' +
          '</div>' +
          '<button class="btn btn-primary btn-block" data-action="start-quiz" data-topic="' + key + '">ابدأ الاختبار</button>' +
        '</article>'
      );
    }).join("");

    return (
      '<div class="view-header container">' +
        '<h1>' + escapeHtml(level.title) + '</h1>' +
        '<p>' + escapeHtml(level.subtitle) + ' — اختر موضوعًا لبدء اختبار من 10 أسئلة</p>' +
      '</div>' +
      '<div class="section container">' +
        '<div class="topics-toolbar">' +
          '<button class="btn btn-ghost" data-action="back-levels"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i> العودة للمستويات</button>' +
        '</div>' +
        '<div class="topic-grid">' + cards + '</div>' +
      '</div>'
    );
  }

  function attachTopicsEvents() {
    qs('[data-action="back-levels"]').addEventListener("click", function () { navigate("levels"); });
    qsa('[data-action="start-quiz"]').forEach(function (btn) {
      btn.addEventListener("click", function () {
        navigate("quiz", { level: state.currentLevel, topic: btn.getAttribute("data-topic"), startNew: true });
      });
    });
  }

  /* ------------------------------------------------------------------
     View: Quiz
     ------------------------------------------------------------------ */
  function renderQuiz() {
    return '<div class="quiz-shell container" id="quizShell"></div>';
  }

  function renderQuizView() {
    const shell = qs("#quizShell");
    if (!shell) return;

    const topic = getTopic(state.currentLevel, state.currentTopicKey);
    const total = topic.questions.length;
    const index = state.currentQuestionIndex;
    const q = topic.questions[index];
    const selected = state.selectedAnswers[index];
    const isLast = index === total - 1;
    const progressPercent = Math.round(((index + (state.answerLocked ? 1 : 0)) / total) * 100);

    const order = state.optionOrders[index] || q.options.map(function (_, optionIndex) { return optionIndex; });
    const optionsHtml = order.map(function (originalIndex, displayIndex) {
      const opt = q.options[originalIndex];
      let cls = "option-btn";
      if (state.answerLocked) {
        if (originalIndex === q.correctAnswer) cls += " correct";
        else if (originalIndex === selected) cls += " incorrect";
      } else if (originalIndex === selected) {
        cls += " selected";
      }
      return (
        '<button class="' + cls + '" data-option="' + displayIndex + '" ' + (state.answerLocked ? "disabled" : "") + ' aria-pressed="' + (originalIndex === selected) + '">' +
          '<span class="option-letter">' + OPTION_LETTERS[displayIndex] + '</span>' +
          '<span>' + escapeHtml(opt) + '</span>' +
        '</button>'
      );
    }).join("");

    const codeHtml = q.code ? '<div class="code-block"><pre>' + escapeHtml(q.code) + '</pre></div>' : "";

    shell.innerHTML =
      '<div class="quiz-topbar">' +
        '<span class="quiz-brand">JavaLab — ' + escapeHtml(topic.title) + '</span>' +
        '<div class="quiz-topbar-actions">' +
          '<button class="quiz-focus-btn" id="quizFocusBtn" type="button"><i class="fa-solid fa-expand" aria-hidden="true"></i> وضع التركيز</button>' +
          '<span class="quiz-progress-text">السؤال ' + (index + 1) + ' / ' + total + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="quiz-progress-track"><div class="quiz-progress-fill" style="width:' + progressPercent + '%"></div></div>' +
      '<div class="question-card">' +
        '<div class="question-label">سؤال</div>' +
        '<div class="question-text">' + escapeHtml(q.question) + '</div>' +
        codeHtml +
        '<div class="options-list">' + optionsHtml + '</div>' +
        (state.answerLocked ? ('<div class="answer-feedback ' + (selected === q.correctAnswer ? 'is-correct' : 'is-wrong') + '">' +
          '<div class="feedback-title"><i class="fa-solid ' + (selected === q.correctAnswer ? 'fa-circle-check' : 'fa-circle-xmark') + '" aria-hidden="true"></i> ' +
          (selected === q.correctAnswer ? 'إجابة صحيحة — أحسنت!' : 'إجابة غير صحيحة — تعلّم منها') + '</div>' +
          '<div class="feedback-text">' + escapeHtml(q.explanation || 'راجع الفكرة الأساسية وحاول تطبيقها على مثال مشابه.') + '</div>' +
        '</div>') : '') +
        '<div class="quiz-actions">' +
          '<button class="btn btn-primary" id="quizNextBtn">' + (isLast ? "إنهاء الاختبار" : "التالي") + '</button>' +
        '</div>' +
      '</div>';

    qsa(".option-btn", shell).forEach(function (btn) {
      btn.addEventListener("click", function () {
        selectAnswer(parseInt(btn.getAttribute("data-option"), 10));
      });
    });
    qs("#quizNextBtn", shell).addEventListener("click", goToNextQuestion);
    const focusBtn = qs("#quizFocusBtn", shell);
    if (focusBtn) {
      focusBtn.addEventListener("click", function () {
        document.body.classList.toggle("focus-mode");
        focusBtn.innerHTML = document.body.classList.contains("focus-mode")
          ? '<i class="fa-solid fa-compress" aria-hidden="true"></i> إنهاء التركيز'
          : '<i class="fa-solid fa-expand" aria-hidden="true"></i> وضع التركيز';
      });
    }
  }

  function attachQuizEvents() {
    renderQuizView();
  }

  /* ------------------------------------------------------------------
     View: Result
     ------------------------------------------------------------------ */
  function renderResult() {
    const result = computeResult();
    const message = performanceMessage(result.percent);
    const progress = getProgressData();
    const lastReward = progress.lastReward || ((result.correct * 10) + 20);

    return (
      '<div class="result-shell container">' +
        '<div class="result-icon"><i class="fa-solid fa-trophy" aria-hidden="true"></i></div>' +
        '<div class="result-title">أحسنت!</div>' +
        '<div class="result-sub">نتيجتك في اختبار ' + escapeHtml(getTopic(state.currentLevel, state.currentTopicKey).title) + '</div>' +
        '<div class="score-ring-wrap">' +
          '<div>' +
            '<div class="score-fraction">' + result.correct + ' / ' + result.total + '</div>' +
            '<div class="score-percent">' + result.percent + '%</div>' +
          '</div>' +
        '</div>' +
        '<div class="result-stats">' +
          '<div class="result-stat ok"><div class="stat-num">' + result.correct + '</div><div class="stat-label">الإجابات الصحيحة</div></div>' +
          '<div class="result-stat bad"><div class="stat-num">' + result.incorrect + '</div><div class="stat-label">الإجابات الخاطئة</div></div>' +
        '</div>' +
        '<div class="performance-message">' + message + '</div>' +
        '<div class="reward-strip">' +
          '<div><i class="fa-solid fa-bolt" aria-hidden="true"></i><strong>+' + lastReward + ' XP</strong><span>نقاط مكتسبة</span></div>' +
          '<div><i class="fa-solid fa-fire" aria-hidden="true"></i><strong>' + progress.streak + ' يوم</strong><span>Streak الحالي</span></div>' +
        '</div>' +
        '<div class="result-actions">' +
          '<div class="row">' +
            '<button class="btn btn-secondary" id="btnRetake">إعادة الاختبار</button>' +
            '<button class="btn btn-secondary" id="btnReview">مراجعة الإجابات</button>' +
          '</div>' +
          '<button class="btn btn-primary" id="btnBackTopics">العودة للمواضيع</button>' +
        '</div>' +
      '</div>'
    );
  }

  function attachResultEvents() {
    qs("#btnRetake").addEventListener("click", function () {
      navigate("quiz", { level: state.currentLevel, topic: state.currentTopicKey, startNew: true });
    });
    qs("#btnReview").addEventListener("click", function () { navigate("review"); });
    qs("#btnBackTopics").addEventListener("click", function () { navigate("topics", { level: state.currentLevel }); });
  }

  /* ------------------------------------------------------------------
     View: Review
     ------------------------------------------------------------------ */
  function renderReview() {
    const topic = getTopic(state.currentLevel, state.currentTopicKey);
    const items = topic.questions.map(function (q, i) {
      const yourIndex = state.selectedAnswers[i];
      const isCorrect = yourIndex === q.correctAnswer;
      const yourAnswerText = (yourIndex === null || yourIndex === undefined) ? "لم تتم الإجابة" : q.options[yourIndex];
      const codeHtml = q.code ? '<div class="code-block"><pre>' + escapeHtml(q.code) + '</pre></div>' : "";

      return (
        '<div class="review-item">' +
          '<div class="review-item-head">' +
            '<span class="review-badge ' + (isCorrect ? "correct" : "incorrect") + '">' + (isCorrect ? "✔ إجابة صحيحة" : "✘ إجابة خاطئة") + '</span>' +
            '<span class="review-badge" style="background:rgba(255,255,255,0.05);color:var(--text-muted)">سؤال ' + (i + 1) + '</span>' +
          '</div>' +
          '<div class="review-q">' + escapeHtml(q.question) + '</div>' +
          codeHtml +
          '<div class="review-row your-answer ' + (isCorrect ? "right" : "wrong") + '">إجابتك: <strong>' + escapeHtml(yourAnswerText) + '</strong></div>' +
          '<div class="review-row correct-answer">الإجابة الصحيحة: <strong>' + escapeHtml(q.options[q.correctAnswer]) + '</strong></div>' +
          '<div class="review-explain">' + escapeHtml(q.explanation) + '</div>' +
        '</div>'
      );
    }).join("");

    return (
      '<div class="view-header container">' +
        '<h1>مراجعة الإجابات</h1>' +
        '<p>' + escapeHtml(topic.title) + '</p>' +
      '</div>' +
      '<div class="review-shell container">' +
        items +
        '<div class="result-actions">' +
          '<div class="row">' +
            '<button class="btn btn-secondary" id="btnRetakeReview">إعادة الاختبار</button>' +
            '<button class="btn btn-primary" id="btnBackTopicsReview">العودة للمواضيع</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function attachReviewEvents() {
    qs("#btnRetakeReview").addEventListener("click", function () {
      navigate("quiz", { level: state.currentLevel, topic: state.currentTopicKey, startNew: true });
    });
    qs("#btnBackTopicsReview").addEventListener("click", function () { navigate("topics", { level: state.currentLevel }); });
  }

  /* ------------------------------------------------------------------
     View: Dashboard
     ------------------------------------------------------------------ */
  function renderDashboard() {
    const overall = getOverallStats();
    const p1 = getLevelProgress("level1");
    const p2 = getLevelProgress("level2");
    const progress = getProgressData();
    const xpLevel = getXpLevel(progress.xp);
    const xpIntoLevel = progress.xp % 100;
    const nextLearning = getContinueLearning();
    const achievements = getAchievements();

    const recentHtml = overall.recent.length
      ? overall.recent.map(function (a) {
          return (
            '<div class="recent-row">' +
              '<span class="recent-topic"><i class="fa-solid fa-code" aria-hidden="true"></i> ' + escapeHtml(a.topicTitle) + '</span>' +
              '<span class="recent-score' + (a.score < 60 ? " low" : "") + '">' + a.score + '%</span>' +
            '</div>'
          );
        }).join("")
      : '<div class="empty-state"><i class="fa-solid fa-chart-line" aria-hidden="true"></i><p>لا توجد محاولات بعد. ابدأ أول اختبار لك الآن!</p></div>';

    const achievementsHtml = achievements.map(function (a) {
      return '<div class="achievement-card ' + (a.unlocked ? 'unlocked' : 'locked') + '">' +
        '<div class="achievement-icon"><i class="' + a.icon + '" aria-hidden="true"></i></div>' +
        '<div><h4>' + a.title + '</h4><p>' + a.desc + '</p></div>' +
        '<span class="achievement-state"><i class="fa-solid ' + (a.unlocked ? 'fa-check' : 'fa-lock') + '" aria-hidden="true"></i></span>' +
      '</div>';
    }).join("");

    const continueHtml = nextLearning ?
      '<div class="continue-card">' +
        '<div class="continue-icon"><i class="fa-solid fa-forward-step" aria-hidden="true"></i></div>' +
        '<div class="continue-copy"><span>أكمل من حيث توقفت</span><h3>' + escapeHtml(nextLearning.topicTitle) + '</h3><p>' + (nextLearning.score ? 'آخر نتيجة: ' + nextLearning.score + '%' : 'لم تبدأ هذا الموضوع بعد') + '</p></div>' +
        '<button class="btn btn-primary" id="btnContinue">متابعة <i class="fa-solid fa-arrow-left" aria-hidden="true"></i></button>' +
      '</div>' : '';

    return (
      '<div class="view-header container">' +
        '<h1>مرحبًا بك في JavaLab 👋</h1>' +
        '<p>تابع تقدّمك، طوّر مستواك، واجمع إنجازاتك في تعلّم Java</p>' +
      '</div>' +
      '<div class="section container">' +
        '<div class="dash-identity">' +
          '<div><span class="dash-level-label">مستواك الحالي</span><strong>Level ' + xpLevel + '</strong></div>' +
          '<div class="dash-xp"><span>' + progress.xp + ' XP</span><div class="progress-track"><div class="progress-fill" style="width:' + xpIntoLevel + '%"></div></div><small>' + xpIntoLevel + '% نحو المستوى التالي</small></div>' +
          '<div class="streak-badge"><i class="fa-solid fa-fire" aria-hidden="true"></i><strong>' + progress.streak + '</strong><span>يوم Streak</span></div>' +
        '</div>' +
        continueHtml +
        '<div class="dash-grid">' +
          '<div class="dash-card"><div class="dash-num">' + overall.completedQuizzes + '</div><div class="dash-label">اختبارات مكتملة</div></div>' +
          '<div class="dash-card"><div class="dash-num">' + overall.avgScore + '%</div><div class="dash-label">متوسط النتائج</div></div>' +
          '<div class="dash-card"><div class="dash-num">' + overall.bestScore + '%</div><div class="dash-label">أفضل نتيجة</div></div>' +
          '<div class="dash-card"><div class="dash-num">' + (p1.completed + p2.completed) + '</div><div class="dash-label">مواضيع منجزة</div></div>' +
        '</div>' +
        '<div class="dash-progress-grid">' +
          '<div class="dash-progress-card"><h4>Java Level 1</h4><div class="progress-track"><div class="progress-fill" style="width:' + p1.percent + '%"></div></div><div class="progress-label">' + p1.percent + '% — ' + p1.completed + ' من ' + p1.total + ' مواضيع</div></div>' +
          '<div class="dash-progress-card"><h4>Java Level 2</h4><div class="progress-track"><div class="progress-fill" style="width:' + p2.percent + '%"></div></div><div class="progress-label">' + p2.percent + '% — ' + p2.completed + ' من ' + p2.total + ' مواضيع</div></div>' +
        '</div>' +
        '<div class="dashboard-section-head"><div><h2 class="section-title">الإنجازات</h2><p class="section-sub">افتح الشارات مع تقدّمك في المنصة.</p></div><span class="achievement-count">' + achievements.filter(function(a){return a.unlocked;}).length + ' / ' + achievements.length + '</span></div>' +
        '<div class="achievement-grid">' + achievementsHtml + '</div>' +
        '<h2 class="section-title">آخر المحاولات</h2>' +
        '<div class="recent-list">' + recentHtml + '</div>' +
      '</div>'
    );
  }

  function attachDashboardEvents() {
    const btn = qs("#btnContinue");
    const next = getContinueLearning();
    if (btn && next) btn.addEventListener("click", function () {
      navigate("quiz", { level: next.levelKey, topic: next.topicKey, startNew: true });
    });
  }

  /* ------------------------------------------------------------------
     View: About
     ------------------------------------------------------------------ */
  function renderAbout() {
    return (
      '<div class="view-header container">' +
        '<h1>عن المنصة</h1>' +
        '<p>JavaLab هي منصة تدريب واختبار متخصصة في لغة Java، تابعة لأكاديمية SAIOS</p>' +
      '</div>' +
      '<div class="about-content container">' +
        '<p>صُممت JavaLab لمساعدتك على اختبار وتعزيز فهمك للغة Java من خلال أسئلة اختيار من متعدد واقعية تغطي الأساسيات والمفاهيم المتقدمة في البرمجة الكائنية.</p>' +
        '<p>يتم حفظ تقدّمك تلقائيًا على جهازك، بحيث يمكنك متابعة نتائجك وأفضل الدرجات دون الحاجة لإنشاء حساب.</p>' +
        '<div class="about-features">' +
          '<div class="about-feature"><i class="fa-solid fa-layer-group" aria-hidden="true"></i><div><h5>مستويان متدرّجان</h5><p>من الأساسيات حتى المفاهيم المتقدمة في OOP</p></div></div>' +
          '<div class="about-feature"><i class="fa-solid fa-code" aria-hidden="true"></i><div><h5>أسئلة برمجية حقيقية</h5><p>قراءة كود، توقّع نتائج، واكتشاف الأخطاء</p></div></div>' +
          '<div class="about-feature"><i class="fa-solid fa-chart-simple" aria-hidden="true"></i><div><h5>تتبّع تقدّم فوري</h5><p>لوحة تحكم توضح أداءك في كل موضوع</p></div></div>' +
          '<div class="about-feature"><i class="fa-solid fa-mobile-screen" aria-hidden="true"></i><div><h5>متوافقة مع الجوال</h5><p>تجربة سلسة على كل الأجهزة</p></div></div>' +
        '</div>' +
      '</div>'
    );
  }

  function attachAboutEvents() {}

  /* ------------------------------------------------------------------
     Global navigation wiring (header, footer, mobile menu)
     ------------------------------------------------------------------ */
  function wireGlobalNav() {
    qsa('[data-nav]').forEach(function (link) {
      link.addEventListener("click", function () {
        const target = link.getAttribute("data-nav");
        if (target === "home") navigate("home");
        else if (target === "levels") navigate("levels");
        else if (target === "dashboard") navigate("dashboard");
        else if (target === "about") navigate("about");
      });
    });

    const brandBtn = qs("#brandLogo");
    if (brandBtn) brandBtn.addEventListener("click", function () { navigate("home"); });

    const hamburger = qs("#hamburgerBtn");
    const mobileNav = qs("#mobileNav");
    if (hamburger && mobileNav) {
      hamburger.addEventListener("click", function () {
        mobileNav.classList.toggle("open");
      });
    }
  }

  /* ------------------------------------------------------------------
     Init
     ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    wireGlobalNav();
    render();
  });
})();
