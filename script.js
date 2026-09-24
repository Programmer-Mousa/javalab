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
    view: "home",          // home | levels | topics | practical | practicalChallenge | quiz | result | review | dashboard | about
    currentLevel: null,    // "level1" | "level2"
    currentTopicKey: null,
    currentQuestionIndex: 0,
    selectedAnswers: [],   // original option index chosen per question, or null
    optionOrders: [],       // display index -> original option index for each question
    answerLocked: false,   // prevents double-click on current question
    quizFinished: false,
    currentPracticalIndex: 0
  };

  const STORAGE_KEY = "javalab_progress_v1";


  /* ------------------------------------------------------------------
     Practical Lab — project-based challenges for each Java level.
     The platform is intentionally static: students write code locally in
     the built-in editor, use hints/reference solutions, then mark a
     challenge complete. Progress and drafts are stored on the device.
     ------------------------------------------------------------------ */
  const practicalLabs = {
    level1: [
      {title:"Student Grade Calculator", difficulty:"Beginner", concepts:"Scanner · Variables · if / else", brief:"اكتب برنامجًا يقرأ درجات ثلاث مواد، يحسب المعدل، ثم يطبع التقدير المناسب.", req:["استخدم Scanner لقراءة الدرجات","احسب المتوسط الحسابي","استخدم if / else لتحديد التقدير"], hint:"ابدأ بتعريف ثلاث متغيرات للدرجات، ثم احسب average قبل كتابة شروط التقدير.", starter:"import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // اكتب الحل هنا\n    }\n}", solution:"import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner input = new Scanner(System.in);\n        double a = input.nextDouble();\n        double b = input.nextDouble();\n        double c = input.nextDouble();\n        double avg = (a + b + c) / 3;\n        if (avg >= 90) System.out.println(\"A\");\n        else if (avg >= 80) System.out.println(\"B\");\n        else if (avg >= 70) System.out.println(\"C\");\n        else System.out.println(\"Needs Improvement\");\n    }\n}"},
      {title:"Even or Odd", difficulty:"Beginner", concepts:"Input · Operators · Conditions", brief:"اقرأ رقمًا صحيحًا وحدد هل هو زوجي أم فردي.", req:["اقرأ الرقم من المستخدم","استخدم معامل %","اطبع النتيجة بوضوح"], hint:"إذا كان باقي قسمة الرقم على 2 يساوي صفرًا فالرقم زوجي.", starter:"import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // الحل\n    }\n}", solution:"Scanner input = new Scanner(System.in);\nint n = input.nextInt();\nSystem.out.println(n % 2 == 0 ? \"Even\" : \"Odd\");"},
      {title:"Simple Calculator", difficulty:"Beginner", concepts:"Scanner · Operators · switch", brief:"أنشئ آلة حاسبة تدعم الجمع والطرح والضرب والقسمة بين رقمين.", req:["اقرأ رقمين","اقرأ العملية","استخدم switch أو if","تعامل مع القسمة على صفر"], hint:"اجعل العملية String أو char ثم نفّذ الفرع المناسب.", starter:"import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // number1, operator, number2\n    }\n}", solution:"Scanner in = new Scanner(System.in);\ndouble a = in.nextDouble();\nchar op = in.next().charAt(0);\ndouble b = in.nextDouble();\nswitch (op) {\n    case '+': System.out.println(a + b); break;\n    case '-': System.out.println(a - b); break;\n    case '*': System.out.println(a * b); break;\n    case '/': System.out.println(b != 0 ? a / b : \"Cannot divide by zero\"); break;\n    default: System.out.println(\"Invalid operator\");\n}"},
      {title:"Multiplication Table", difficulty:"Beginner", concepts:"Loops · Variables · Output", brief:"اطبع جدول ضرب رقم يختاره المستخدم من 1 إلى 10.", req:["استخدم Scanner","استخدم for loop","اطبع الناتج بالشكل n × i = result"], hint:"اجعل i تبدأ من 1 وتنتهي عند 10.", starter:"import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // الحل\n    }\n}", solution:"Scanner in = new Scanner(System.in);\nint n = in.nextInt();\nfor (int i = 1; i <= 10; i++) {\n    System.out.println(n + \" x \" + i + \" = \" + (n * i));\n}"},
      {title:"Number Analyzer", difficulty:"Beginner", concepts:"Conditions · Math", brief:"اقرأ رقمًا وحدد هل هو موجب أو سالب أو صفر، وهل هو زوجي أو فردي.", req:["استخدم if / else","استخدم % لتحديد الزوجي والفردي","اطبع وصفًا واضحًا"], hint:"قسّم المهمة إلى فحص الإشارة ثم فحص الزوجية.", starter:"public class Main {\n    public static void main(String[] args) {\n        int n = 0;\n        // الحل\n    }\n}", solution:"if (n > 0) System.out.println(\"Positive\");\nelse if (n < 0) System.out.println(\"Negative\");\nelse System.out.println(\"Zero\");\nSystem.out.println(n % 2 == 0 ? \"Even\" : \"Odd\");"},
      {title:"Countdown Timer", difficulty:"Beginner", concepts:"for loop · Arithmetic", brief:"اطبع عدًّا تنازليًا من رقم يدخله المستخدم حتى 1 ثم اطبع Start!.", req:["استخدم for","تناقص بمقدار واحد","اطبع رسالة النهاية"], hint:"ابدأ i من الرقم المدخل واجعل شرط الحلقة i >= 1.", starter:"import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // الحل\n    }\n}", solution:"Scanner in = new Scanner(System.in);\nint n = in.nextInt();\nfor (int i = n; i >= 1; i--) System.out.println(i);\nSystem.out.println(\"Start!\");"},
      {title:"Sum from 1 to N", difficulty:"Beginner", concepts:"Loops · Accumulator", brief:"احسب مجموع الأعداد من 1 حتى N.", req:["استخدم متغير sum","استخدم loop","اطبع المجموع النهائي"], hint:"ابدأ sum = 0 ثم أضف i في كل دورة.", starter:"import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // الحل\n    }\n}", solution:"Scanner in = new Scanner(System.in);\nint n = in.nextInt();\nint sum = 0;\nfor (int i = 1; i <= n; i++) sum += i;\nSystem.out.println(sum);"},
      {title:"Find the Largest", difficulty:"Beginner", concepts:"Variables · Conditions", brief:"اقرأ ثلاثة أرقام وحدد أكبر قيمة بينها.", req:["اقرأ 3 أرقام","استخدم if / else أو Math.max","اطبع الأكبر"], hint:"يمكنك الاحتفاظ بأكبر قيمة حاليًا داخل متغير max.", starter:"public class Main {\n    public static void main(String[] args) {\n        int a = 0, b = 0, c = 0;\n        // الحل\n    }\n}", solution:"int max = Math.max(a, Math.max(b, c));\nSystem.out.println(max);"},
      {title:"Array Average", difficulty:"Intermediate", concepts:"Arrays · Loops", brief:"أنشئ مصفوفة درجات واحسب مجموعها ومتوسطها وأعلى درجة.", req:["استخدم int[] أو double[]","مرّ على العناصر بحلقة","احسب average و max"], hint:"استخدم enhanced for loop لتسهيل المرور على المصفوفة.", starter:"public class Main {\n    public static void main(String[] args) {\n        int[] grades = {85, 92, 74, 88, 95};\n        // الحل\n    }\n}", solution:"int sum = 0;\nint max = grades[0];\nfor (int grade : grades) {\n    sum += grade;\n    if (grade > max) max = grade;\n}\ndouble avg = (double) sum / grades.length;\nSystem.out.println(\"Average: \" + avg);\nSystem.out.println(\"Max: \" + max);"},
      {title:"Reverse an Array", difficulty:"Intermediate", concepts:"Arrays · Loops", brief:"اطبع عناصر مصفوفة من آخر عنصر إلى أول عنصر.", req:["استخدم array","استخدم loop عكسي","لا تنشئ مصفوفة ثانية"], hint:"ابدأ من length - 1 وانقص i حتى 0.", starter:"public class Main {\n    public static void main(String[] args) {\n        int[] values = {10, 20, 30, 40, 50};\n        // الحل\n    }\n}", solution:"for (int i = values.length - 1; i >= 0; i--) {\n    System.out.println(values[i]);\n}"},
      {title:"Palindrome String", difficulty:"Intermediate", concepts:"Strings · Loops", brief:"تحقق هل الكلمة Palindrome، أي تقرأ نفسها من اليمين واليسار.", req:["استخدم String","قارن الأحرف من الطرفين","اطبع true أو false"], hint:"قارن charAt(i) مع charAt(length - 1 - i).", starter:"public class Main {\n    public static void main(String[] args) {\n        String word = \"level\";\n        // الحل\n    }\n}", solution:"boolean palindrome = true;\nfor (int i = 0; i < word.length() / 2; i++) {\n    if (word.charAt(i) != word.charAt(word.length() - 1 - i)) {\n        palindrome = false;\n        break;\n    }\n}\nSystem.out.println(palindrome);"},
      {title:"Method-Based Calculator", difficulty:"Intermediate", concepts:"Methods · Parameters · return", brief:"قسّم آلة حاسبة بسيطة إلى methods مستقلة للجمع والطرح والضرب والقسمة.", req:["أنشئ method لكل عملية","استخدم parameters","أعد النتيجة باستخدام return"], hint:"ابدأ بـ static double add(double a, double b).", starter:"public class Main {\n    // أنشئ methods هنا\n\n    public static void main(String[] args) {\n        // جرّب methods\n    }\n}", solution:"static double add(double a, double b) { return a + b; }\nstatic double subtract(double a, double b) { return a - b; }\nstatic double multiply(double a, double b) { return a * b; }\nstatic double divide(double a, double b) { return b == 0 ? 0 : a / b; }"},
      {title:"Student Report", difficulty:"Intermediate", concepts:"Arrays · Methods · Conditions", brief:"أنشئ برنامجًا يطبع تقرير طالب من درجاته ويحدد حالة النجاح.", req:["استخدم array للدرجات","استخدم method لحساب المتوسط","حدد Pass / Fail"], hint:"اجعل calculateAverage مسؤولة عن الحساب فقط، واترك الطباعة لـ main.", starter:"public class Main {\n    static double calculateAverage(int[] grades) {\n        // الحل\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int[] grades = {80, 72, 91, 88};\n    }\n}", solution:"static double calculateAverage(int[] grades) {\n    int sum = 0;\n    for (int g : grades) sum += g;\n    return (double) sum / grades.length;\n}"},
      {title:"Mini Menu Program", difficulty:"Intermediate", concepts:"switch · loops · input", brief:"أنشئ قائمة تتكرر حتى يختار المستخدم Exit، مع خيارات مثل عرض رسالة وحساب مربع رقم.", req:["استخدم while loop","استخدم switch","وفّر خيار Exit"], hint:"ضع قراءة الخيار داخل while ثم اكسر الحلقة عند اختيار 0.", starter:"import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner in = new Scanner(System.in);\n        // ابنِ القائمة هنا\n    }\n}", solution:"int choice;\ndo {\n    System.out.println(\"1. Hello  2. Square  0. Exit\");\n    choice = in.nextInt();\n    switch (choice) {\n        case 1: System.out.println(\"Hello Java\"); break;\n        case 2: int n = in.nextInt(); System.out.println(n * n); break;\n        case 0: System.out.println(\"Goodbye\"); break;\n        default: System.out.println(\"Invalid choice\");\n    }\n} while (choice != 0);"},
      {title:"Final Challenge — Student Manager", difficulty:"Advanced", concepts:"Arrays · Methods · Input · Conditions · Loops", brief:"ابنِ برنامجًا صغيرًا لإدارة طلاب: إضافة اسم ودرجة، عرض الطلاب، البحث عن أعلى درجة، وإنهاء البرنامج.", req:["استخدم arrays أو parallel arrays","قسّم الحل إلى methods","استخدم loop + switch/conditions","وفّر قائمة تفاعلية"], hint:"قسّم المشروع إلى addStudent وshowStudents وfindTopStudent بدل كتابة كل شيء داخل main.", starter:"import java.util.Scanner;\n\npublic class Main {\n    // صمّم برنامجك هنا\n}", solution:"مرجع الحل: قسّم البرنامج إلى قائمة Menu، ومصفوفات names/grades، وmethods مستقلة لكل عملية. ركّز على وضوح الكود قبل تقليل عدد الأسطر."}
    ],
    level2: [
      {title:"BankAccount Class", difficulty:"Beginner", concepts:"Class · Object · Constructor", brief:"أنشئ BankAccount يحتوي accountNumber وbalance وعمليات deposit وwithdraw ثم اختبره من main.", req:["أنشئ class مستقل","استخدم constructor","أنشئ object في main","نفّذ deposit وwithdraw"], hint:"ابدأ بالحقول ثم constructor، وبعدها اجعل العمليات methods داخل الكلاس.", starter:"class BankAccount {\n    // fields + constructor + methods\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // create object\n    }\n}", solution:"class BankAccount {\n    private String accountNumber;\n    private double balance;\n    BankAccount(String number, double balance) { this.accountNumber = number; this.balance = balance; }\n    void deposit(double amount) { if (amount > 0) balance += amount; }\n    boolean withdraw(double amount) { if (amount <= balance) { balance -= amount; return true; } return false; }\n    double getBalance() { return balance; }\n}"},
      {title:"Constructor Practice", difficulty:"Beginner", concepts:"Constructors · this", brief:"أنشئ Student class بثلاثة constructors مختلفة واستخدم this لتهيئة الخصائص.", req:["Default constructor","Parameterized constructor","Constructor overloading","استخدم this"], hint:"اجعل constructor بدون parameters يستدعي constructor آخر بقيم افتراضية.", starter:"class Student {\n    String name;\n    int age;\n\n    // constructors\n}", solution:"Student() { this(\"Unknown\", 0); }\nStudent(String name, int age) { this.name = name; this.age = age; }\nStudent(String name) { this(name, 18); }"},
      {title:"Encapsulated Product", difficulty:"Beginner", concepts:"Encapsulation · getters · setters", brief:"أنشئ Product بخصائص private وسعر لا يسمح بقيمة سالبة.", req:["اجعل fields private","أنشئ getter/setter","تحقق من السعر داخل setter"], hint:"لا تعدّل price مباشرة من خارج الكلاس.", starter:"class Product {\n    private String name;\n    private double price;\n    // getters/setters\n}", solution:"public double getPrice() { return price; }\npublic void setPrice(double price) { if (price >= 0) this.price = price; }"},
      {title:"Library Inheritance", difficulty:"Intermediate", concepts:"Inheritance · extends · super", brief:"أنشئ Item ثم Book وMagazine يرثان منه، مع خصائص مشتركة وسلوك خاص.", req:["أنشئ superclass","استخدم extends","استخدم super في constructor","أضف field خاص بالابن"], hint:"ضع id/title في Item، وpageCount داخل Book.", starter:"class Item {\n    // common fields\n}\nclass Book extends Item {\n    // book-specific fields\n}", solution:"class Item { String title; Item(String title){ this.title = title; } }\nclass Book extends Item { int pages; Book(String title, int pages){ super(title); this.pages = pages; } }"},
      {title:"Employee Hierarchy", difficulty:"Intermediate", concepts:"Inheritance · overriding", brief:"أنشئ Employee ثم Developer وDesigner مع method calculateSalary تختلف حسب النوع.", req:["استخدم inheritance","Override method","اختبر أكثر من subclass"], hint:"اجعل Employee يحتوي salary أساسيًا، والـsubclasses تضيف bonus مختلفًا.", starter:"class Employee {\n    double calculateSalary() { return 0; }\n}\n// subclasses", solution:"class Employee { double base; Employee(double base){this.base=base;} double calculateSalary(){return base;} }\nclass Developer extends Employee { Developer(double b){super(b);} @Override double calculateSalary(){return base+500;} }"},
      {title:"Shape Polymorphism", difficulty:"Intermediate", concepts:"Polymorphism · overriding", brief:"أنشئ Shape ثم Circle وRectangle، واستخدم مرجع Shape لحساب المساحة لكل شكل.", req:["أنشئ method area","Override في subclasses","استخدم Shape[] أو List<Shape>"], hint:"تعدد الأشكال يظهر عندما تستدعي area عبر مرجع من النوع Shape.", starter:"abstract class Shape {\n    abstract double area();\n}\n// Circle + Rectangle", solution:"Shape[] shapes = { new Circle(3), new Rectangle(4, 5) };\nfor (Shape s : shapes) System.out.println(s.area());"},
      {title:"Abstract Payment System", difficulty:"Intermediate", concepts:"Abstraction · abstract class", brief:"صمّم Payment abstract class وطرق دفع CardPayment وCashPayment مع processPayment.", req:["abstract class","abstract method","subclasses","اختبر polymorphism"], hint:"اجعل processPayment abstract ثم نفّذه في كل نوع دفع.", starter:"abstract class Payment {\n    abstract void processPayment(double amount);\n}\n// implementations", solution:"class CardPayment extends Payment { void processPayment(double amount){ System.out.println(\"Card: \"+amount); } }\nclass CashPayment extends Payment { void processPayment(double amount){ System.out.println(\"Cash: \"+amount); } }"},
      {title:"Notification Interface", difficulty:"Intermediate", concepts:"Interfaces · implementation", brief:"أنشئ Notification interface ثم EmailNotification وSMSNotification لتطبيق send().", req:["interface","implements","method implementation","استخدم مرجع interface"], hint:"يمكن لمتغير من نوع Notification أن يشير إلى Email أو SMS.", starter:"interface Notification {\n    void send(String message);\n}\n// implementations", solution:"class EmailNotification implements Notification { public void send(String m){ System.out.println(\"Email: \"+m); } }\nclass SMSNotification implements Notification { public void send(String m){ System.out.println(\"SMS: \"+m); } }"},
      {title:"Safe Division", difficulty:"Intermediate", concepts:"Exceptions · try/catch", brief:"أنشئ برنامج قسمة يتعامل مع ArithmeticException وInputMismatchException بطريقة مناسبة.", req:["try/catch","رسالة خطأ مفهومة","استمر في البرنامج إن أمكن"], hint:"ضع العمليات التي قد تفشل داخل try، وكل Exception مناسب في catch منفصل.", starter:"import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        // safe input + division\n    }\n}", solution:"try {\n    Scanner in = new Scanner(System.in);\n    int a = in.nextInt();\n    int b = in.nextInt();\n    System.out.println(a / b);\n} catch (ArithmeticException e) {\n    System.out.println(\"Cannot divide by zero\");\n} catch (InputMismatchException e) {\n    System.out.println(\"Please enter integers\");\n}"},
      {title:"List Manager", difficulty:"Intermediate", concepts:"Collections · List · iteration", brief:"استخدم ArrayList لإضافة أسماء طلاب، حذف اسم، ثم عرض القائمة مرتبة.", req:["ArrayList","add/remove","for-each","sort"], hint:"استورد java.util.ArrayList وjava.util.Collections.", starter:"import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> students = new ArrayList<>();\n        // الحل\n    }\n}", solution:"students.add(\"Mousa\");\nstudents.add(\"Sara\");\nstudents.remove(\"Sara\");\nCollections.sort(students);\nfor (String s : students) System.out.println(s);"},
      {title:"ArrayList Grade Tracker", difficulty:"Intermediate", concepts:"ArrayList · loops · statistics", brief:"خزّن درجات متغيرة العدد داخل ArrayList واحسب المتوسط وأعلى وأدنى درجة.", req:["ArrayList<Integer>","loop","average/max/min"], hint:"استخدم get(i) أو enhanced for loop للمرور على العناصر.", starter:"import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> grades = new ArrayList<>();\n        // أضف درجات واكتب الحسابات\n    }\n}", solution:"int sum = 0, max = grades.get(0), min = grades.get(0);\nfor (int g : grades) { sum += g; max = Math.max(max, g); min = Math.min(min, g); }\ndouble avg = (double) sum / grades.size();"},
      {title:"HashMap Contact Book", difficulty:"Advanced", concepts:"HashMap · key/value · lookup", brief:"أنشئ دفتر جهات اتصال باستخدام HashMap يربط الاسم برقم الهاتف.", req:["HashMap<String,String>","put/get/remove","تحقق من وجود key"], hint:"استخدم containsKey قبل الوصول إذا أردت رسالة مختلفة عند عدم وجود الاسم.", starter:"import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        HashMap<String,String> contacts = new HashMap<>();\n        // الحل\n    }\n}", solution:"contacts.put(\"Mousa\", \"0590000000\");\nString phone = contacts.get(\"Mousa\");\nif (contacts.containsKey(\"Mousa\")) System.out.println(phone);"},
      {title:"Generic Box", difficulty:"Advanced", concepts:"Generics · type safety", brief:"أنشئ Generic class Box<T> تخزن قيمة وتعيدها، ثم استخدمها مع String وInteger.", req:["class Box<T>","private field","set/get","اختبر نوعين مختلفين"], hint:"اجعل نوع القيمة T بدل Object لتحتفظ بالـtype safety.", starter:"class Box<T> {\n    private T value;\n    // constructor + set/get\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // test String + Integer\n    }\n}", solution:"class Box<T> {\n    private T value;\n    Box(T value){ this.value = value; }\n    T get(){ return value; }\n    void set(T value){ this.value = value; }\n}\nBox<String> text = new Box<>(\"Java\");\nBox<Integer> number = new Box<>(42);"},
      {title:"Generic Utility Method", difficulty:"Advanced", concepts:"Generic methods · arrays", brief:"أنشئ method generic تعيد أول عنصر من Array أو List مع الحفاظ على النوع.", req:["Generic method <T>","parameter من النوع T[] أو List<T>","return T"], hint:"الصيغة الأساسية: static <T> T first(T[] values).", starter:"public class Main {\n    static <T> T first(T[] values) {\n        // الحل\n        return null;\n    }\n}", solution:"static <T> T first(T[] values) { return values[0]; }\nString[] names = {\"A\", \"B\"};\nInteger[] nums = {1, 2};"},
      {title:"Mini OOP Store", difficulty:"Advanced", concepts:"Encapsulation · inheritance · polymorphism", brief:"ابنِ نظام متجر صغير فيه Product أساسي وBookProduct وDigitalProduct، مع حساب السعر النهائي بشكل polymorphic.", req:["base class + subclasses","private fields","override method","استخدم List<Product>"], hint:"اجعل finalPrice() method في Product ثم غيّر سلوكها في الأنواع الفرعية.", starter:"class Product {\n    // design your model\n}\n// BookProduct + DigitalProduct\n\npublic class Main {\n    public static void main(String[] args) {\n        // test products\n    }\n}", solution:"صمّم Product بخصائص private وmethod finalPrice(). اجعل BookProduct يضيف shipping، وDigitalProduct يضيف download fee أو discount، ثم خزّن الجميع في List<Product> واستدعِ finalPrice() عبر polymorphism."},
      {title:"Final Challenge — Library Management", difficulty:"Advanced", concepts:"OOP · Collections · Interfaces · Exceptions", brief:"ابنِ نظام مكتبة مصغر يدير الكتب والأعضاء وعمليات الاستعارة والإرجاع باستخدام OOP وCollections.", req:["Book + Member classes","Encapsulation","ArrayList أو HashMap","Interface أو abstraction لعملية الإعارة","تعامل مع حالات الخطأ"], hint:"ابدأ بتصميم الـclasses والعلاقات قبل كتابة menu. لا تضع كل المنطق داخل main.", starter:"import java.util.*;\n\npublic class Main {\n    // صمّم نظام المكتبة هنا\n}", solution:"مرجع الحل: أنشئ Book وMember وLibrary، استخدم Collections للتخزين، افصل عمليات borrow/return داخل Library، وعرّف استثناءات أو رسائل واضحة للحالات غير الصالحة. الهدف هو بناء تصميم OOP منظم وليس تقليل عدد الأسطر."}
    ]
  };

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
      { icon: "fa-solid fa-crown", title: "Master Level", desc: "أكمل جميع المواضيع", unlocked: completedTopics >= allTopics },
      { icon: "fa-solid fa-flask-vial", title: "أول تحدي عملي", desc: "أكمل أول Practical Challenge", unlocked: getAllPracticalCompleted() >= 1 },
      { icon: "fa-solid fa-laptop-code", title: "Practical Builder", desc: "أكمل 10 تحديات عملية", unlocked: getAllPracticalCompleted() >= 10 },
      { icon: "fa-solid fa-rocket", title: "Lab Master", desc: "أكمل جميع التحديات العملية", unlocked: getAllPracticalCompleted() >= (getPracticalLab("level1").length + getPracticalLab("level2").length) }
    ];
  }


  function getPracticalLab(levelKey) { return practicalLabs[levelKey] || []; }

  function getPracticalProgress(levelKey) {
    const progress = loadProgress();
    const lab = getPracticalLab(levelKey);
    const done = lab.filter(function (_, i) { return progress.practical && progress.practical[levelKey + ":" + i] && progress.practical[levelKey + ":" + i].completed; }).length;
    return { completed: done, total: lab.length, percent: lab.length ? Math.round((done / lab.length) * 100) : 0 };
  }

  function getAllPracticalCompleted() {
    return getPracticalProgress("level1").completed + getPracticalProgress("level2").completed;
  }

  function savePracticalDraft(levelKey, index, code) {
    const progress = loadProgress();
    progress.practicalDrafts = progress.practicalDrafts || {};
    progress.practicalDrafts[levelKey + ":" + index] = code;
    saveProgress(progress);
  }

  function getPracticalDraft(levelKey, index, fallback) {
    const progress = loadProgress();
    return (progress.practicalDrafts && progress.practicalDrafts[levelKey + ":" + index]) || fallback;
  }

  function completePractical(levelKey, index) {
    const progress = getProgressData();
    progress.practical = progress.practical || {};
    const id = levelKey + ":" + index;
    if (progress.practical[id] && progress.practical[id].completed) {
      showToast("هذا التحدي مكتمل بالفعل ✓");
      return;
    }
    progress.practical[id] = { completed: true, date: new Date().toISOString() };
    progress.xp += 50;
    updateStreak(progress);
    progress.lastPractical = id;
    saveProgress(progress);
    showToast("أحسنت! +50 XP — تم إكمال التحدي 🏆");
    renderPracticalLab();
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
    return Object.keys(topics).reduce(function (sum, key) {
      return sum + topics[key].questions.length;
    }, 0);
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
      case "practical": app.innerHTML = renderPracticalLab(); attachPracticalLabEvents(); break;
      case "practicalChallenge": app.innerHTML = renderPracticalChallenge(); attachPracticalChallengeEvents(); break;
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
        (target === "levels" && (state.view === "levels" || state.view === "topics" || state.view === "practical" || state.view === "practicalChallenge" || state.view === "quiz" || state.view === "result" || state.view === "review")) ||
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
    const questionCount = Object.keys(quizData[levelKey].topics).reduce(function (sum, key) {
      return sum + quizData[levelKey].topics[key].questions.length;
    }, 0);
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
            '<span><i class="fa-solid fa-circle-question" aria-hidden="true"></i> 20 سؤال</span>' +
            '<span><i class="fa-solid fa-trophy" aria-hidden="true"></i> أفضل نتيجة: ' + bestLabel + '</span>' +
          '</div>' +
          '<button class="btn btn-primary btn-block" data-action="start-quiz" data-topic="' + key + '">ابدأ الاختبار</button>' +
        '</article>'
      );
    }).join("");

    const labProgress = getPracticalProgress(levelKey);
    const practicalCard = '<article class="topic-card practical-lab-card">' +
      '<div class="topic-icon practical-icon"><i class="fa-solid fa-flask-vial" aria-hidden="true"></i></div>' +
      '<div class="topic-heading-row"><h4>Practical Lab</h4><span class="difficulty-badge lab-badge"><i class="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i> تطبيق عملي</span></div>' +
      '<p class="practical-card-copy">تحديات ومشاريع عملية تحوّل ما تعلمته إلى كود حقيقي.</p>' +
      '<div class="topic-meta"><span><i class="fa-solid fa-laptop-code" aria-hidden="true"></i> ' + labProgress.total + ' تحديًا</span><span><i class="fa-solid fa-check-circle" aria-hidden="true"></i> ' + labProgress.completed + ' مكتمل</span></div>' +
      '<div class="progress-track"><div class="progress-fill" style="width:' + labProgress.percent + '%"></div></div>' +
      '<button class="btn btn-primary btn-block" data-action="open-practical">افتح المختبر</button>' +
      '</article>';

    return (
      '<div class="view-header container">' +
        '<h1>' + escapeHtml(level.title) + '</h1>' +
        '<p>' + escapeHtml(level.subtitle) + ' — اختر موضوعًا لبدء اختبار من 20 سؤالًا</p>' +
      '</div>' +
      '<div class="section container">' +
        '<div class="topics-toolbar">' +
          '<button class="btn btn-ghost" data-action="back-levels"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i> العودة للمستويات</button>' +
        '</div>' +
        '<div class="topic-grid">' + cards + practicalCard + '</div>' +
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
    const labBtn = qs('[data-action="open-practical"]');
    if (labBtn) labBtn.addEventListener("click", function () { navigate("practical", { level: state.currentLevel }); });
  }


  /* ------------------------------------------------------------------
     View: Practical Lab
     ------------------------------------------------------------------ */
  function renderPracticalLab() {
    const levelKey = state.currentLevel || "level1";
    const lab = getPracticalLab(levelKey);
    const progress = getPracticalProgress(levelKey);
    const cards = lab.map(function (c, i) {
      const p = loadProgress();
      const done = !!(p.practical && p.practical[levelKey + ":" + i] && p.practical[levelKey + ":" + i].completed);
      const difficultyClass = c.difficulty.toLowerCase();
      return '<article class="challenge-card ' + (done ? 'is-complete' : '') + '">' +
        '<div class="challenge-top"><span class="challenge-number">Challenge ' + String(i + 1).padStart(2, "0") + '</span><span class="challenge-difficulty ' + difficultyClass + '">' + escapeHtml(c.difficulty) + '</span></div>' +
        '<div class="challenge-icon"><i class="fa-solid ' + (done ? 'fa-circle-check' : 'fa-laptop-code') + '" aria-hidden="true"></i></div>' +
        '<h3>' + escapeHtml(c.title) + '</h3><p>' + escapeHtml(c.brief) + '</p>' +
        '<div class="challenge-concepts">' + escapeHtml(c.concepts) + '</div>' +
        '<button class="btn ' + (done ? 'btn-ghost' : 'btn-primary') + ' btn-block" data-practical-index="' + i + '">' + (done ? 'مراجعة التحدي ✓' : 'ابدأ التحدي') + '</button>' +
      '</article>';
    }).join("");
    return '<div class="view-header container"><h1>🛠️ Practical Lab</h1><p>طبّق ما تعلمته من ' + escapeHtml(quizData[levelKey].title) + ' في تحديات ومشاريع عملية.</p></div>' +
      '<div class="section container"><div class="practical-hero"><div><span class="eyebrow">LEARN → PRACTICE → MASTER</span><h2>حوّل المعرفة إلى كود حقيقي.</h2><p>اكتب الحل بنفسك، استخدم الـHints عند الحاجة، ثم راجع Reference Solution وسجّل إنجازك.</p></div><div class="practical-progress"><strong>' + progress.completed + ' / ' + progress.total + '</strong><span>تحديات مكتملة</span><div class="progress-track"><div class="progress-fill" style="width:' + progress.percent + '%"></div></div><small>' + progress.percent + '% من المختبر</small></div></div>' +
      '<div class="topics-toolbar"><button class="btn btn-ghost" data-action="back-topics"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i> العودة للمواضيع</button><span class="lab-note"><i class="fa-solid fa-circle-info"></i> التحديات تعتمد على التطبيق الذاتي</span></div>' +
      '<div class="challenge-grid">' + cards + '</div></div>';
  }
  function attachPracticalLabEvents() {
    const back = qs('[data-action="back-topics"]');
    if (back) back.addEventListener("click", function(){ navigate("topics", {level: state.currentLevel}); });
    qsa('[data-practical-index]').forEach(function(btn){ btn.addEventListener("click", function(){ state.currentPracticalIndex = Number(btn.getAttribute("data-practical-index")); navigate("practicalChallenge", {level: state.currentLevel}); }); });
  }

  function renderPracticalChallenge() {
    const levelKey = state.currentLevel || "level1";
    const i = state.currentPracticalIndex || 0;
    const c = getPracticalLab(levelKey)[i];
    if (!c) return renderPracticalLab();
    const progress = loadProgress();
    const done = !!(progress.practical && progress.practical[levelKey + ":" + i] && progress.practical[levelKey + ":" + i].completed);
    const draft = getPracticalDraft(levelKey, i, c.starter);
    return '<div class="section container practical-detail">' +
      '<div class="practical-detail-top"><button class="btn btn-ghost" id="btnBackLab"><i class="fa-solid fa-arrow-right"></i> Practical Lab</button><span>Challenge ' + String(i+1).padStart(2,"0") + ' / ' + getPracticalLab(levelKey).length + '</span></div>' +
      '<div class="challenge-detail-head"><div><span class="challenge-difficulty ' + c.difficulty.toLowerCase() + '">' + escapeHtml(c.difficulty) + '</span><h1>' + escapeHtml(c.title) + '</h1><p>' + escapeHtml(c.brief) + '</p></div><div class="challenge-xp"><i class="fa-solid fa-bolt"></i><strong>+50 XP</strong><span>عند الإكمال</span></div></div>' +
      '<div class="detail-grid"><div>' +
        '<div class="detail-card"><h3>🎯 المطلوب</h3><ul>' + c.req.map(function(x){return '<li>'+escapeHtml(x)+'</li>';}).join('') + '</ul></div>' +
        '<div class="detail-card"><h3>🧠 المفاهيم المستخدمة</h3><p>' + escapeHtml(c.concepts) + '</p></div>' +
        '<div class="detail-card hint-card"><h3>💡 Hint</h3><p>' + escapeHtml(c.hint) + '</p></div>' +
      '</div><div>' +
        '<div class="editor-card"><div class="editor-head"><span><i class="fa-solid fa-code"></i> Java Editor</span><button class="btn btn-ghost btn-sm" id="btnResetDraft">إعادة القالب</button></div><textarea id="practicalEditor" spellcheck="false">' + escapeHtml(draft) + '</textarea><div class="editor-foot"><span><i class="fa-solid fa-floppy-disk"></i> يتم حفظ المسودة تلقائيًا على جهازك</span><button class="btn btn-ghost btn-sm" id="btnSaveDraft">حفظ المسودة</button></div></div>' +
        '<div class="reference-card"><div><h3>📖 Reference Solution</h3><p>استخدم الحل المرجعي بعد المحاولة، للمقارنة والتعلم وليس للحفظ.</p></div><button class="btn btn-ghost btn-sm" id="btnToggleSolution">عرض الحل</button><pre id="solutionBlock" hidden><code>' + escapeHtml(c.solution) + '</code></pre></div>' +
        '<div class="completion-card ' + (done ? 'completed' : '') + '"><div><strong>' + (done ? 'تم إكمال هذا التحدي ✓' : 'أنهيت الحل؟') + '</strong><p>' + (done ? 'تم تسجيل التحدي ضمن تقدمك وحصلت على XP.' : 'راجع المتطلبات والحل المرجعي، ثم سجّل التحدي كمكتمل.') + '</p></div><button class="btn btn-primary" id="btnCompletePractical" ' + (done ? 'disabled' : '') + '>' + (done ? 'مكتمل ✓' : 'إكمال التحدي +50 XP') + '</button></div>' +
      '</div></div></div>';
  }
  function attachPracticalChallengeEvents() {
    const levelKey = state.currentLevel || "level1", i = state.currentPracticalIndex || 0;
    const editor = qs('#practicalEditor');
    const save = function(){ if(editor) savePracticalDraft(levelKey, i, editor.value); };
    if(editor) editor.addEventListener('input', save);
    const back = qs('#btnBackLab'); if(back) back.addEventListener('click', function(){ navigate('practical', {level:levelKey}); });
    const saveBtn = qs('#btnSaveDraft'); if(saveBtn) saveBtn.addEventListener('click', function(){ save(); showToast('تم حفظ المسودة ✓'); });
    const reset = qs('#btnResetDraft'); if(reset) reset.addEventListener('click', function(){ const c=getPracticalLab(levelKey)[i]; editor.value=c.starter; save(); });
    const toggle = qs('#btnToggleSolution'); if(toggle) toggle.addEventListener('click', function(){ const block=qs('#solutionBlock'); const shown=!block.hidden; block.hidden=shown; toggle.textContent=shown?'عرض الحل':'إخفاء الحل'; });
    const complete = qs('#btnCompletePractical'); if(complete) complete.addEventListener('click', function(){ save(); completePractical(levelKey, i); });
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
          '<div class="dash-card"><div class="dash-num">' + getAllPracticalCompleted() + '</div><div class="dash-label">تحديات عملية</div></div>' +
        '</div>' +
        '<div class="dash-progress-grid">' +
          '<div class="dash-progress-card"><h4>Java Level 1</h4><div class="progress-track"><div class="progress-fill" style="width:' + p1.percent + '%"></div></div><div class="progress-label">' + p1.percent + '% — ' + p1.completed + ' من ' + p1.total + ' مواضيع</div></div>' +
          '<div class="dash-progress-card"><h4>Java Level 2</h4><div class="progress-track"><div class="progress-fill" style="width:' + p2.percent + '%"></div></div><div class="progress-label">' + p2.percent + '% — ' + p2.completed + ' من ' + p2.total + ' مواضيع</div></div>' +
        '</div>' +
        '<div class="practical-dash-grid"><div class="dash-progress-card"><h4>🛠️ Practical Lab — Level 1</h4><div class="progress-track"><div class="progress-fill" style="width:' + getPracticalProgress("level1").percent + '%"></div></div><div class="progress-label">' + getPracticalProgress("level1").completed + ' من ' + getPracticalProgress("level1").total + ' تحديات</div></div><div class="dash-progress-card"><h4>🛠️ Practical Lab — Level 2</h4><div class="progress-track"><div class="progress-fill" style="width:' + getPracticalProgress("level2").percent + '%"></div></div><div class="progress-label">' + getPracticalProgress("level2").completed + ' من ' + getPracticalProgress("level2").total + ' تحديات</div></div></div>' +
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
          '<div class="about-feature"><i class="fa-solid fa-flask-vial" aria-hidden="true"></i><div><h5>Practical Lab</h5><p>تحديات ومشاريع عملية لتطبيق المفاهيم في كود حقيقي</p></div></div><div class="about-feature"><i class="fa-solid fa-mobile-screen" aria-hidden="true"></i><div><h5>متوافقة مع الجوال</h5><p>تجربة سلسة على كل الأجهزة</p></div></div>' +
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
