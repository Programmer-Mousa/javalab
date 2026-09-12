/* ==========================================================================
   JavaLab by SAIOS — Quiz Data
   Every topic contains exactly 10 questions.
   To add a question: push a new object { question, code, options, correctAnswer, explanation }
   into the relevant topic's `questions` array. correctAnswer is the zero-based
   index into `options`. `code` is optional — omit it for non-code questions.
   ========================================================================== */

const quizData = {
  level1: {
    title: "Java Level 1",
    subtitle: "أساسيات Java",
    description: "For beginners",
    topics: {
      intro: {
        title: "Introduction to Java",
        icon: "fa-solid fa-lightbulb",
        questions: [
          { question: "Which company originally developed Java?", options: ["Sun Microsystems", "Microsoft", "Apple", "IBM"], correctAnswer: 0, explanation: "Java was created at Sun Microsystems by James Gosling and his team in 1995." },
          { question: "Java source code files have which extension?", options: [".java", ".js", ".class", ".jav"], correctAnswer: 0, explanation: "Java source files always end with the .java extension." },
          { question: "What is bytecode in Java?", options: ["Compiled code run by the JVM", "Raw machine code", "The original source code", "A type of comment"], correctAnswer: 0, explanation: "The compiler turns .java files into .class bytecode, which the JVM executes." },
          { question: "Which of these is TRUE about Java?", options: ["It is platform independent", "It only runs on Windows", "It compiles directly to machine code", "It is a scripting language"], correctAnswer: 0, explanation: "Java bytecode runs on any device with a JVM, making it platform independent." },
          { question: "What does JVM stand for?", options: ["Java Virtual Machine", "Java Verified Method", "Java Variable Manager", "Java Visual Model"], correctAnswer: 0, explanation: "The JVM is the engine that loads and executes Java bytecode." },
          { question: "Which method is the entry point of a Java application?", code: "public static void main(String[] args) {\n    // program starts here\n}", options: ["main()", "start()", "init()", "run()"], correctAnswer: 0, explanation: "The JVM always looks for a main method to begin execution." },
          { question: "Which is the correct signature for the main method?", options: ["public static void main(String[] args)", "static void main()", "public void main(String args)", "void main(String[] args)"], correctAnswer: 0, explanation: "This exact signature is required so the JVM can locate and call it." },
          { question: "Which tool compiles Java source code into bytecode?", options: ["javac", "java", "jvm", "javadoc"], correctAnswer: 0, explanation: "javac is the Java compiler; the java command later runs the compiled class." },
          { question: "What is the JDK?", options: ["Java Development Kit, a full toolkit to build Java programs", "Only the JVM", "A text editor", "A database engine"], correctAnswer: 0, explanation: "The JDK bundles the compiler, JVM, and libraries needed to develop Java software." },
          { question: "Which statement about Java comments is correct?", code: "// this is a single-line comment", options: ["// starts a single-line comment", "// starts a multi-line comment", "# starts a comment", "Comments are not allowed in Java"], correctAnswer: 0, explanation: "Two slashes begin a single-line comment; /* */ is used for multi-line comments." }
        ]
      },
      variables: {
        title: "Variables",
        icon: "fa-solid fa-box",
        questions: [
          { question: "Which keyword declares a variable that cannot be reassigned?", options: ["final", "static", "const", "var"], correctAnswer: 0, explanation: "The final keyword makes a variable's value fixed after its first assignment." },
          { question: "What is the output of the following code?", code: "int x = 10;\nx = 20;\nSystem.out.println(x);", options: ["10", "20", "Error", "0"], correctAnswer: 1, explanation: "The variable x is reassigned to 20 before being printed." },
          { question: "Which is a valid variable name in Java?", options: ["_count", "1count", "class", "int"], correctAnswer: 0, explanation: "Identifiers can start with a letter or underscore, but not a digit, and can't be reserved words." },
          { question: "What is the default value of an int instance variable?", options: ["0", "null", "1", "undefined"], correctAnswer: 0, explanation: "Uninitialized numeric instance fields default to 0 in Java." },
          { question: "Which keyword lets Java infer a local variable's type automatically (Java 10+)?", options: ["var", "let", "def", "auto"], correctAnswer: 0, explanation: "The var keyword tells the compiler to infer the type from the assigned value." },
          { question: "What is the output of the following code?", code: "int a = 5;\nint b = a;\nb = 10;\nSystem.out.println(a);", options: ["5", "10", "Error", "0"], correctAnswer: 0, explanation: "b receives a copy of a's value, so changing b doesn't affect a." },
          { question: "Which naming convention is standard for Java variables?", options: ["camelCase", "PascalCase", "snake_case", "kebab-case"], correctAnswer: 0, explanation: "Java convention names variables and methods using camelCase, e.g. totalScore." },
          { question: "What happens if you use a local variable before initializing it?", options: ["A compile-time error occurs", "It defaults to 0", "It defaults to null", "It throws a runtime exception only"], correctAnswer: 0, explanation: "Unlike instance fields, local variables have no default value and must be initialized before use." },
          { question: "Which of these is a valid declaration?", options: ["int number = 10;", "int 10number;", "int number = \"10\";", "integer number = 10;"], correctAnswer: 0, explanation: "Identifiers can't start with a digit, and int can't hold a String literal." },
          { question: "What is variable scope?", options: ["The region of code where a variable can be accessed", "The value stored in a variable", "The data type of a variable", "The memory address of a variable"], correctAnswer: 0, explanation: "Scope defines the block of code within which a variable is visible and usable." }
        ]
      },
      dataTypes: {
        title: "Data Types",
        icon: "fa-solid fa-shapes",
        questions: [
          { question: "Which is a primitive data type in Java?", options: ["int", "String", "ArrayList", "Object"], correctAnswer: 0, explanation: "int is one of Java's eight primitive types; String and ArrayList are reference types." },
          { question: "What is the size of an int in Java?", options: ["32 bits", "16 bits", "64 bits", "8 bits"], correctAnswer: 0, explanation: "An int always occupies 32 bits, regardless of platform." },
          { question: "What is the output of the following code?", code: "double d = 5 / 2;\nSystem.out.println(d);", options: ["2.5", "2.0", "2", "Error"], correctAnswer: 1, explanation: "5/2 performs integer division first (result 2), which is then widened to the double 2.0." },
          { question: "Which data type would you use to store true or false?", options: ["boolean", "char", "byte", "int"], correctAnswer: 0, explanation: "boolean is the primitive type dedicated to true/false values." },
          { question: "What is the default value of a boolean variable?", options: ["false", "true", "0", "null"], correctAnswer: 0, explanation: "Uninitialized boolean instance fields default to false." },
          { question: "Which type can hold a single 16-bit Unicode character?", options: ["char", "String", "byte", "int"], correctAnswer: 0, explanation: "char stores one Unicode character using 16 bits." },
          { question: "What happens with this code?", code: "byte b = 130;", options: ["Compile-time error, value out of byte's range", "Compiles fine", "b becomes -126", "b becomes 130"], correctAnswer: 0, explanation: "byte ranges from -128 to 127, so the literal 130 cannot fit and fails to compile." },
          { question: "Which is a correct way to declare a long literal?", options: ["long l = 100000L;", "long l = 100000;", "long l = 100000l;", "Both A and C"], correctAnswer: 3, explanation: "A long literal can be suffixed with either an uppercase L or lowercase l, though L is preferred for readability." },
          { question: "What is autoboxing?", options: ["Automatic conversion between a primitive and its wrapper class", "Converting an int to a String", "Casting a double to an int", "None of the above"], correctAnswer: 0, explanation: "Autoboxing lets Java automatically wrap primitives like int into objects like Integer." },
          { question: "What happens with this code?", code: "float f = 3.14;", options: ["Compile-time error, needs the f suffix (3.14f)", "Compiles fine", "f becomes 3", "Runtime error"], correctAnswer: 0, explanation: "Decimal literals default to double, so assigning to float requires an explicit f suffix or cast." }
        ]
      },
      operators: {
        title: "Operators",
        icon: "fa-solid fa-calculator",
        questions: [
          { question: "What is the output?", code: "int x = 5;\nSystem.out.println(x++);", options: ["5", "6", "4", "Error"], correctAnswer: 0, explanation: "Post-increment (x++) returns the original value first, then increments x afterward." },
          { question: "What is the output?", code: "int x = 5;\nSystem.out.println(++x);", options: ["5", "6", "4", "Error"], correctAnswer: 1, explanation: "Pre-increment (++x) increments the value first, then returns the new value." },
          { question: "What does the % operator do?", options: ["Returns the remainder of a division", "Calculates a percentage", "Performs multiplication", "Raises to a power"], correctAnswer: 0, explanation: "The modulus operator % returns what's left over after integer division." },
          { question: "What is the output?", code: "System.out.println(10 % 3);", options: ["3", "1", "0", "3.33"], correctAnswer: 1, explanation: "10 divided by 3 is 3 remainder 1, so 10 % 3 equals 1." },
          { question: "Which operator checks reference equality for objects?", options: ["==", "equals()", "===", "!="], correctAnswer: 0, explanation: "== compares references for objects (whether they point to the same instance)." },
          { question: "What is the output?", code: "int a = 5, b = 10;\nSystem.out.println(a > b ? \"yes\" : \"no\");", options: ["yes", "no", "Error", "true"], correctAnswer: 1, explanation: "Since a (5) is not greater than b (10), the ternary expression evaluates to \"no\"." },
          { question: "What is the result of 7 & 3 (bitwise AND)?", options: ["3", "7", "4", "10"], correctAnswer: 0, explanation: "In binary, 7 is 0111 and 3 is 0011; AND-ing them gives 0011, which is 3." },
          { question: "What is the output?", code: "boolean result = (5 > 3) && (10 < 2);\nSystem.out.println(result);", options: ["true", "false", "Error", "10"], correctAnswer: 1, explanation: "The second condition (10 < 2) is false, so the && expression overall is false." },
          { question: "Which operator has the lowest precedence?", options: ["Assignment (=)", "Multiplication", "Addition", "Comparison"], correctAnswer: 0, explanation: "Assignment operators are evaluated last, after all arithmetic and comparison operators." },
          { question: "What is the output?", code: "int x = 10;\nx += 5;\nSystem.out.println(x);", options: ["15", "10", "5", "Error"], correctAnswer: 0, explanation: "x += 5 is shorthand for x = x + 5, giving 15." }
        ]
      },
      io: {
        title: "Input and Output",
        icon: "fa-solid fa-keyboard",
        questions: [
          { question: "Which class is commonly used to read user input from the console?", options: ["Scanner", "BufferedReader only", "System.out", "Reader"], correctAnswer: 0, explanation: "Scanner is the standard class for reading console input in beginner Java programs." },
          { question: "Which package contains the Scanner class?", options: ["java.util", "java.io", "java.lang", "java.net"], correctAnswer: 0, explanation: "Scanner lives in java.util and must be imported from there." },
          { question: "What does nextInt() do?", code: "Scanner sc = new Scanner(System.in);\nint x = sc.nextInt();", options: ["Reads an integer from input", "Reads a String", "Reads a double", "Prints an integer"], correctAnswer: 0, explanation: "nextInt() parses and returns the next whole number typed by the user." },
          { question: "Which method prints text without moving to a new line?", options: ["System.out.print()", "System.out.println()", "System.out.write()", "System.in.print()"], correctAnswer: 0, explanation: "print() outputs text and leaves the cursor on the same line, unlike println()." },
          { question: "What is System.out?", options: ["A PrintStream object for standard output", "A class definition", "An input stream", "A variable holding integers"], correctAnswer: 0, explanation: "System.out is a pre-configured PrintStream used to write to the console." },
          { question: "Which method reads a full line of text, including spaces?", options: ["nextLine()", "next()", "nextInt()", "read()"], correctAnswer: 0, explanation: "nextLine() reads everything up to the newline character, spaces included." },
          { question: "What common bug occurs in this code?", code: "Scanner sc = new Scanner(System.in);\nint age = sc.nextInt();\nString name = sc.nextLine();", options: ["nextLine() reads the leftover newline, giving an empty string", "There is no issue", "age becomes a String", "This causes a compile error"], correctAnswer: 0, explanation: "nextInt() doesn't consume the trailing newline, so the following nextLine() immediately returns an empty line." },
          { question: "Which is TRUE about System.err?", options: ["It is used to print error messages, typically to the console", "It closes the program", "It reads input", "It is always identical to System.out"], correctAnswer: 0, explanation: "System.err is a separate output stream conventionally used for error output." },
          { question: "Which exception can Scanner throw if the input doesn't match the expected type?", options: ["InputMismatchException", "IOException always", "NullPointerException", "ArithmeticException"], correctAnswer: 0, explanation: "Calling nextInt() on non-numeric input throws an InputMismatchException." },
          { question: "Which of these correctly imports Scanner?", options: ["import java.util.Scanner;", "import java.io.Scanner;", "include java.util.Scanner;", "using java.util.Scanner;"], correctAnswer: 0, explanation: "Java uses the import keyword, and Scanner belongs to the java.util package." }
        ]
      },
      conditionals: {
        title: "Conditional Statements",
        icon: "fa-solid fa-code-branch",
        questions: [
          { question: "What is the output?", code: "int x = 10;\nif (x > 5) {\n    System.out.println(\"big\");\n} else {\n    System.out.println(\"small\");\n}", options: ["big", "small", "Error", "nothing"], correctAnswer: 0, explanation: "Since x (10) is greater than 5, the if branch runs and prints \"big\"." },
          { question: "Which keyword is used for multi-way branching besides if-else?", options: ["switch", "loop", "for", "while"], correctAnswer: 0, explanation: "switch lets you branch on a single value across many possible cases." },
          { question: "What is the output?", code: "int x = 2;\nswitch (x) {\n    case 1: System.out.println(\"one\"); break;\n    case 2: System.out.println(\"two\"); break;\n    default: System.out.println(\"other\");\n}", options: ["one", "two", "other", "Error"], correctAnswer: 1, explanation: "x matches case 2, so \"two\" is printed and break exits the switch." },
          { question: "What happens if 'break' is missing in a switch case?", options: ["Execution falls through to the next case", "A compile error occurs", "Nothing happens", "The switch exits immediately"], correctAnswer: 0, explanation: "Without break, control continues into the next case's statements regardless of its label." },
          { question: "What is the output?", code: "int a = 5;\nif (a > 10) System.out.println(\"A\");\nelse if (a > 3) System.out.println(\"B\");\nelse System.out.println(\"C\");", options: ["A", "B", "C", "Error"], correctAnswer: 1, explanation: "a is not greater than 10, but it is greater than 3, so \"B\" is printed." },
          { question: "Which is a valid ternary expression?", options: ["(x > 5) ? \"big\" : \"small\"", "if (x > 5) \"big\" else \"small\"", "x > 5 ? \"big\" : else \"small\"", "ternary(x>5,\"big\",\"small\")"], correctAnswer: 0, explanation: "The ternary operator uses the form condition ? valueIfTrue : valueIfFalse." },
          { question: "What is the output, and why?", code: "boolean flag = false;\nif (flag = true) {\n    System.out.println(\"yes\");\n} else {\n    System.out.println(\"no\");\n}", options: ["\"yes\", because = assigns true, making the condition true", "\"no\"", "Compile-time error", "\"yes\" because flag started as false"], correctAnswer: 0, explanation: "A single = is assignment, not comparison; it sets flag to true and that value is used as the condition." },
          { question: "Since Java 7, which of these CAN a switch statement operate on?", options: ["double", "int", "String", "char"], correctAnswer: 0, explanation: "switch supports int, char, String and enums, but not floating-point types like double." },
          { question: "What happens with this code?", code: "int x = 0;\nif (x) {\n    System.out.println(\"hi\");\n}", options: ["Prints \"hi\"", "Prints nothing", "Compile-time error", "Prints \"false\""], correctAnswer: 2, explanation: "Unlike some languages, Java requires an actual boolean expression in an if condition — an int cannot be used directly." },
          { question: "What does the default case in a switch statement do?", options: ["Executes when no other case matches", "Always executes first", "Is required in every switch", "Terminates the program"], correctAnswer: 0, explanation: "default acts as a fallback branch when the switch value matches none of the explicit cases." }
        ]
      },
      loops: {
        title: "Loops",
        icon: "fa-solid fa-rotate",
        questions: [
          { question: "What is the output?", code: "for (int i = 0; i < 3; i++) {\n    System.out.print(i);\n}", options: ["012", "123", "0123", "Error"], correctAnswer: 0, explanation: "The loop runs for i = 0, 1, 2, printing each value before stopping when i reaches 3." },
          { question: "Which loop guarantees at least one execution?", options: ["do-while", "while", "for", "for-each"], correctAnswer: 0, explanation: "A do-while loop checks its condition after running the body once, so it always executes at least once." },
          { question: "What is the output?", code: "int i = 0;\nwhile (i < 3) {\n    System.out.print(i);\n    i++;\n}", options: ["012", "123", "an infinite loop", "Error"], correctAnswer: 0, explanation: "The loop prints i and increments it until i reaches 3, giving \"012\"." },
          { question: "What does 'break' do inside a loop?", options: ["Exits the loop immediately", "Skips the current iteration only", "Restarts the loop from the beginning", "Pauses the loop"], correctAnswer: 0, explanation: "break terminates the nearest enclosing loop entirely." },
          { question: "What does 'continue' do inside a loop?", options: ["Skips to the next iteration", "Exits the loop entirely", "Restarts the loop counter at 0", "Throws an exception"], correctAnswer: 0, explanation: "continue stops the current iteration early and moves on to the next one." },
          { question: "What is the output?", code: "for (int i = 0; i < 5; i++) {\n    if (i == 3) break;\n    System.out.print(i);\n}", options: ["012", "0123", "01234", "012break"], correctAnswer: 0, explanation: "The loop prints 0, 1, 2, then breaks out entirely as soon as i equals 3." },
          { question: "What is the output?", code: "int[] arr = {1, 2, 3};\nfor (int n : arr) {\n    System.out.print(n);\n}", options: ["123", "arr", "Error", "321"], correctAnswer: 0, explanation: "The for-each loop visits each array element in order and prints it." },
          { question: "What is an infinite loop?", options: ["A loop whose condition never becomes false", "A loop that runs exactly once", "A syntax error", "A loop containing a break statement"], correctAnswer: 0, explanation: "If the loop's exit condition is never satisfied, the loop keeps running forever." },
          { question: "What is the output?", code: "for (int i = 5; i > 0; i--) {\n    System.out.print(i);\n}", options: ["54321", "12345", "543210", "Error"], correctAnswer: 0, explanation: "The loop counts down from 5 to 1, printing each value as it decrements." },
          { question: "Which loop is best when the number of iterations is unknown beforehand?", options: ["while", "for", "for-each", "None of these"], correctAnswer: 0, explanation: "A while loop is ideal when you only know a stopping condition, not a fixed count." }
        ]
      },
      arrays: {
        title: "Arrays",
        icon: "fa-solid fa-table-cells",
        questions: [
          { question: "What is the output?", code: "int[] arr = new int[5];\nSystem.out.println(arr[0]);", options: ["0", "null", "Error", "5"], correctAnswer: 0, explanation: "A newly created int array initializes every element to 0 by default." },
          { question: "How do you get the length of an array named arr?", options: ["arr.length", "arr.length()", "arr.size()", "length(arr)"], correctAnswer: 0, explanation: "Arrays expose length as a field, not a method, unlike collections which use size()." },
          { question: "What is the output?", code: "int[] arr = {1, 2, 3};\nSystem.out.println(arr[3]);", options: ["3", "0", "ArrayIndexOutOfBoundsException", "null"], correctAnswer: 2, explanation: "Valid indices for this array are 0 to 2, so accessing index 3 throws an exception." },
          { question: "What is the index of the first element in a Java array?", options: ["0", "1", "-1", "It depends on the array"], correctAnswer: 0, explanation: "Java arrays are zero-indexed, so the first element is always at index 0." },
          { question: "What does this code create?", code: "int[][] grid = new int[2][3];", options: ["A 2D array with 2 rows and 3 columns", "A 1D array of size 6", "A compile-time error", "A 3-row, 2-column array"], correctAnswer: 0, explanation: "The first bracket sets the number of rows, and the second sets the number of columns." },
          { question: "Which method sorts an array of ints?", options: ["Arrays.sort(arr)", "arr.sort()", "Collections.sort(arr)", "sort(arr)"], correctAnswer: 0, explanation: "The utility class Arrays provides a static sort() method for primitive arrays." },
          { question: "What is the output?", code: "int[] a = {1, 2, 3};\nint[] b = a;\nb[0] = 99;\nSystem.out.println(a[0]);", options: ["1", "99", "Error", "0"], correctAnswer: 1, explanation: "Arrays are reference types, so b and a point to the same array — modifying one affects the other." },
          { question: "What is the default value of elements in a new int array?", options: ["0", "null", "undefined", "-1"], correctAnswer: 0, explanation: "Numeric array elements are automatically initialized to 0." },
          { question: "Which import is needed to use Arrays.sort()?", options: ["java.util.Arrays", "java.lang.Arrays", "java.io.Arrays", "None needed"], correctAnswer: 0, explanation: "The Arrays utility class resides in the java.util package." },
          { question: "What is the output?", code: "String[] names = {\"Ana\", \"Bob\"};\nSystem.out.println(names.length);", options: ["2", "3", "Error", "0"], correctAnswer: 0, explanation: "The array holds two elements, so its length field equals 2." }
        ]
      },
      methods: {
        title: "Methods",
        icon: "fa-solid fa-cube",
        questions: [
          { question: "What is a method in Java?", options: ["A block of code that performs a specific task", "A variable that stores data", "A blueprint for objects", "A type of loop"], correctAnswer: 0, explanation: "Methods group reusable logic together so it can be called wherever needed." },
          { question: "What is the output?", code: "static int add(int a, int b) {\n    return a + b;\n}\n\nSystem.out.println(add(2, 3));", options: ["5", "23", "Error", "0"], correctAnswer: 0, explanation: "add(2, 3) computes 2 + 3, returning 5." },
          { question: "What does 'void' mean in a method signature?", options: ["The method returns nothing", "The method always returns 0", "The method body is empty", "The method is private"], correctAnswer: 0, explanation: "void indicates the method performs an action but does not send back a value." },
          { question: "What is method overloading?", options: ["Multiple methods with the same name but different parameters", "A method calling itself repeatedly", "Redefining a parent class's method", "Making a method static"], correctAnswer: 0, explanation: "Overloaded methods share a name but differ in the number or type of their parameters." },
          { question: "What is the output?", code: "static void greet() {\n    System.out.println(\"Hi\");\n}\nstatic void greet(String name) {\n    System.out.println(\"Hi \" + name);\n}\n\ngreet(\"Sam\");", options: ["Hi", "Hi Sam", "Error", "Hi Sam Hi"], correctAnswer: 1, explanation: "Passing an argument selects the overloaded version that accepts a String parameter." },
          { question: "Can a Java method return multiple values directly?", options: ["No, but it can return an array or an object holding several values", "Yes, always", "Only inside main", "Only if the method is void"], correctAnswer: 0, explanation: "A method can only return one value, though that value can be a container like an array or object." },
          { question: "What is a parameter?", options: ["A variable passed into a method", "The method's return type", "The method's name", "A class definition"], correctAnswer: 0, explanation: "Parameters are the inputs a method declares and receives when it is called." },
          { question: "What is the output?", code: "static int square(int n) {\n    return n * n;\n}\n\nSystem.out.println(square(4));", options: ["16", "8", "4", "Error"], correctAnswer: 0, explanation: "square(4) returns 4 * 4, which equals 16." },
          { question: "How do you call a static method from the same class without creating an object?", options: ["Just call it by its name", "Use this.", "Use super.", "Use new"], correctAnswer: 0, explanation: "Static methods belong to the class, so they can be invoked directly by name within the class." },
          { question: "What happens if a non-void method doesn't return a value on all code paths?", options: ["A compile-time error occurs", "A runtime exception is thrown", "It returns null", "It returns 0"], correctAnswer: 0, explanation: "Java requires every possible path through a non-void method to end with a return statement." }
        ]
      },
      strings: {
        title: "Strings",
        icon: "fa-solid fa-quote-right",
        questions: [
          { question: "What is the output?", code: "String s = \"Hello\";\nSystem.out.println(s.length());", options: ["5", "6", "Error", "4"], correctAnswer: 0, explanation: "\"Hello\" contains five characters, so length() returns 5." },
          { question: "Are Strings mutable in Java?", options: ["No, they are immutable", "Yes, they can be changed in place", "Only when using StringBuilder", "It depends on the JVM"], correctAnswer: 0, explanation: "Once created, a String's contents can never change; operations like concat() return a new String." },
          { question: "What is the output?", code: "String a = \"Hi\";\nString b = \"Hi\";\nSystem.out.println(a == b);", options: ["true", "false", "Error", "null"], correctAnswer: 0, explanation: "String literals are interned in a shared pool, so identical literals reference the same object." },
          { question: "What is the output?", code: "String s = \"hello\";\nSystem.out.println(s.toUpperCase());", options: ["HELLO", "hello", "Hello", "Error"], correctAnswer: 0, explanation: "toUpperCase() returns a new String with every character converted to uppercase." },
          { question: "Which method checks if two strings have the same content?", options: ["equals()", "==", "compareTo() only", "same()"], correctAnswer: 0, explanation: "equals() compares the actual characters, while == compares object references." },
          { question: "What is the output?", code: "String s1 = new String(\"Hi\");\nString s2 = new String(\"Hi\");\nSystem.out.println(s1 == s2);", options: ["true", "false", "Error", "null"], correctAnswer: 1, explanation: "Using 'new' forces creation of two separate objects, so their references differ even with equal content." },
          { question: "What is the output?", code: "String s = \"Java\";\nSystem.out.println(s.charAt(1));", options: ["a", "J", "v", "1"], correctAnswer: 0, explanation: "charAt(1) returns the character at index 1, which is 'a' in \"Java\"." },
          { question: "Which class should you use for efficient string concatenation inside a loop?", options: ["StringBuilder", "String", "Array", "Integer"], correctAnswer: 0, explanation: "StringBuilder builds text mutably, avoiding the overhead of creating many new String objects." },
          { question: "What is the output?", code: "String s = \"  hello  \";\nSystem.out.println(s.trim());", options: ["\"hello\"", "\"  hello  \"", "\"hello \"", "Error"], correctAnswer: 0, explanation: "trim() removes leading and trailing whitespace, leaving just \"hello\"." },
          { question: "What is the output?", code: "String s = \"abcdef\";\nSystem.out.println(s.substring(2, 4));", options: ["cd", "cde", "bc", "abcd"], correctAnswer: 0, explanation: "substring(2, 4) returns characters from index 2 up to (but not including) index 4." }
        ]
      },
      basicOOP: {
        title: "Basic OOP",
        icon: "fa-solid fa-diagram-project",
        questions: [
          { question: "What are the four main pillars of OOP?", options: ["Encapsulation, Inheritance, Polymorphism, Abstraction", "Class, Object, Method, Variable", "Public, Private, Protected, Default", "Loop, Array, String, Method"], correctAnswer: 0, explanation: "These four principles form the foundation of object-oriented design." },
          { question: "What is a class in Java?", options: ["A blueprint for creating objects", "An instance of an object", "A method inside a program", "A variable declaration"], correctAnswer: 0, explanation: "A class defines the structure and behavior that its objects will have." },
          { question: "What is an object?", options: ["An instance of a class", "A blueprint for classes", "A primitive data type", "A type of loop"], correctAnswer: 0, explanation: "An object is a concrete instance created from a class blueprint." },
          { question: "Which keyword is used to create an object?", options: ["new", "create", "object", "instance"], correctAnswer: 0, explanation: "The new keyword allocates memory and returns a reference to a fresh object." },
          { question: "What is encapsulation?", options: ["Bundling data and methods together while restricting direct access", "Creating multiple classes at once", "Inheriting from a parent class", "Overloading methods"], correctAnswer: 0, explanation: "Encapsulation protects an object's internal state by controlling how it is accessed and modified." },
          { question: "What is the value of d.name after this code runs?", code: "class Dog {\n    String name;\n}\n\nDog d = new Dog();\nd.name = \"Rex\";", options: ["Rex", "null", "Compile error", "\"\" (empty string)"], correctAnswer: 0, explanation: "The field name is directly assigned the value \"Rex\" after the object is created." },
          { question: "What is the purpose of the 'this' keyword?", options: ["It refers to the current object instance", "It creates a new object", "It refers to a static method", "It refers to the parent class"], correctAnswer: 0, explanation: "'this' distinguishes the current object's fields from parameters or local variables of the same name." },
          { question: "Which access modifier restricts a member to be accessed only within its own class?", options: ["private", "public", "protected", "default"], correctAnswer: 0, explanation: "private members are hidden from all code outside the declaring class." },
          { question: "What is method overriding?", options: ["Redefining a parent class's method in a child class", "Having two methods with the same name in one class", "Creating a static method", "Declaring a method as final"], correctAnswer: 0, explanation: "Overriding lets a subclass provide its own implementation of an inherited method." },
          { question: "What is a constructor?", options: ["A special method used to initialize new objects", "A method that destroys objects", "A regular method with a return type", "A static utility method"], correctAnswer: 0, explanation: "A constructor runs automatically when an object is created, setting up its initial state." }
        ]
      },
      classesObjects: {
        title: "Classes and Objects",
        icon: "fa-solid fa-layer-group",
        questions: [
          { question: "What is the output?", code: "class Car {\n    String color;\n    void drive() {\n        System.out.println(\"Driving \" + color + \" car\");\n    }\n}\n\nCar c = new Car();\nc.color = \"red\";\nc.drive();", options: ["Driving red car", "Driving null car", "Compile error", "Driving car"], correctAnswer: 0, explanation: "color is set to \"red\" before drive() runs, so it's included in the printed message." },
          { question: "What is instantiation?", options: ["Creating an object from a class", "Declaring a variable", "Calling a static method", "Compiling the source code"], correctAnswer: 0, explanation: "Instantiation is the process of using 'new' to produce an object from a class." },
          { question: "Can a class have multiple constructors?", options: ["Yes, through constructor overloading", "No, only one constructor is allowed", "Only if the class is abstract", "Only for static classes"], correctAnswer: 0, explanation: "Like methods, constructors can be overloaded with different parameter lists." },
          { question: "Are c1 and c2 the same object here?", code: "Car c1 = new Car();\nCar c2 = new Car();", options: ["No, they are two different objects", "Yes, the same object", "It causes a compile error", "It depends on the JVM"], correctAnswer: 0, explanation: "Each call to 'new' allocates a distinct object in memory." },
          { question: "What does 'static' mean when applied to a class member?", options: ["It belongs to the class itself, not to any one instance", "It cannot be changed", "It is automatically private", "It must be marked final"], correctAnswer: 0, explanation: "Static members are shared across all instances and can be accessed via the class name." },
          { question: "What is the output?", code: "class Counter {\n    static int count = 0;\n    Counter() { count++; }\n}\n\nnew Counter();\nnew Counter();\nSystem.out.println(Counter.count);", options: ["2", "1", "0", "Error"], correctAnswer: 0, explanation: "Each constructor call increments the shared static field, so count reaches 2 after two objects." },
          { question: "What is a getter method used for?", options: ["Retrieving the value of a private field", "Setting the value of a field", "Deleting an object", "Creating a new object"], correctAnswer: 0, explanation: "Getters provide controlled read access to fields that are otherwise private." },
          { question: "What is the difference between an instance variable and a local variable?", options: ["Instance variables belong to the object; local variables exist only within a method", "They are exactly the same", "Local variables are always static", "Instance variables never get default values"], correctAnswer: 0, explanation: "Instance variables persist for the life of the object, while local variables disappear after their method finishes." },
          { question: "What does 'this.name' refer to in this constructor?", code: "public class Person {\n    private String name;\n    public Person(String name) {\n        this.name = name;\n    }\n}", options: ["The instance field, distinguishing it from the parameter", "The parameter itself", "A static field", "It causes a compile error"], correctAnswer: 0, explanation: "'this.name' explicitly refers to the object's field, resolving the naming conflict with the parameter." },
          { question: "Which of these correctly defines a no-argument constructor for class Box?", options: ["public Box() {}", "public void Box() {}", "public Box(void) {}", "Box new() {}"], correctAnswer: 0, explanation: "A constructor shares its class's name and has no return type — not even void." }
        ]
      }
    }
  },
  level2: {
    title: "Java Level 2",
    subtitle: "المستوى المتقدم",
    description: "Object-Oriented Programming & More",
    topics: {
      constructors: {
        title: "Constructors",
        icon: "fa-solid fa-hammer",
        questions: [
          { question: "What is the purpose of a constructor?", options: ["To initialize a new object's state", "To destroy objects", "To override a method", "To declare a class"], correctAnswer: 0, explanation: "A constructor sets up an object's initial field values when it is created." },
          { question: "What is the output?", code: "class Point {\n    int x, y;\n    Point(int x, int y) {\n        this.x = x;\n        this.y = y;\n    }\n}\n\nPoint p = new Point(3, 4);\nSystem.out.println(p.x + \",\" + p.y);", options: ["3,4", "0,0", "Error", "4,3"], correctAnswer: 0, explanation: "The constructor assigns the passed-in arguments 3 and 4 to x and y respectively." },
          { question: "What is a default constructor?", options: ["A no-argument constructor automatically provided if none is defined", "A constructor with all parameters filled in", "A static method", "A private constructor"], correctAnswer: 0, explanation: "If a class defines no constructors at all, Java supplies an empty no-arg one automatically." },
          { question: "Can constructors be overloaded?", options: ["Yes", "No", "Only in abstract classes", "Only when static"], correctAnswer: 0, explanation: "A class can have several constructors as long as their parameter lists differ." },
          { question: "What is the output?", code: "class Box {\n    Box() { System.out.println(\"no-arg\"); }\n    Box(int size) { System.out.println(\"size:\" + size); }\n}\n\nnew Box(5);", options: ["size:5", "no-arg", "Compile error", "size:0"], correctAnswer: 0, explanation: "Passing an argument selects the overloaded constructor that accepts an int." },
          { question: "Which keyword calls another constructor in the same class?", options: ["this()", "super()", "new()", "self()"], correctAnswer: 0, explanation: "this() lets one constructor delegate initialization work to another constructor in the same class." },
          { question: "Which keyword calls the parent class's constructor?", options: ["super()", "this()", "parent()", "base()"], correctAnswer: 0, explanation: "super() invokes the constructor of the immediate superclass." },
          { question: "Does a constructor have a return type?", options: ["No, not even void", "Yes, void", "Yes, matching the class type", "It depends on the class"], correctAnswer: 0, explanation: "Constructors never declare a return type; including one would make it a regular method instead." },
          { question: "What is the output?", code: "class A {\n    A() { System.out.println(\"A\"); }\n}\nclass B extends A {\n    B() { System.out.println(\"B\"); }\n}\n\nnew B();", options: ["\"A\" then \"B\"", "\"B\" only", "\"B\" then \"A\"", "Compile error"], correctAnswer: 0, explanation: "Java implicitly calls the superclass's no-arg constructor first, before running B's own constructor body." },
          { question: "If you define a constructor with parameters and no no-arg constructor, what happens?", options: ["You lose the default no-arg constructor, so 'new ClassName()' fails to compile", "Java still generates a default one anyway", "It always causes a compile error regardless", "Nothing changes"], correctAnswer: 0, explanation: "Java only auto-generates a no-arg constructor when the class defines none at all." }
        ]
      },
      encapsulation: {
        title: "Encapsulation",
        icon: "fa-solid fa-lock",
        questions: [
          { question: "What is encapsulation primarily used for?", options: ["Protecting data by restricting direct access to fields", "Making methods run faster", "Creating multiple objects at once", "Inheriting behavior from a parent"], correctAnswer: 0, explanation: "Encapsulation hides internal state behind controlled access points like getters and setters." },
          { question: "Why is 'balance' private in this class?", code: "class Account {\n    private double balance;\n    public double getBalance() { return balance; }\n    public void deposit(double amt) {\n        if (amt > 0) balance += amt;\n    }\n}", options: ["To prevent uncontrolled or invalid modification from outside the class", "To make the field run faster", "To allow easier inheritance", "Because Java syntax requires it"], correctAnswer: 0, explanation: "Keeping balance private forces all changes to go through deposit(), which validates the amount." },
          { question: "Which access modifier is the most restrictive?", options: ["private", "protected", "public", "default"], correctAnswer: 0, explanation: "private members are visible only inside their own class." },
          { question: "What is a 'getter' method also known as?", options: ["Accessor", "Mutator", "Constructor", "Destructor"], correctAnswer: 0, explanation: "Getters are commonly called accessor methods because they provide read access to a field." },
          { question: "What is a 'setter' method also known as?", options: ["Mutator", "Accessor", "Constructor", "Static method"], correctAnswer: 0, explanation: "Setters are called mutators because they modify an object's internal state." },
          { question: "What does this setter prevent?", code: "private int age;\npublic void setAge(int age) {\n    if (age >= 0) this.age = age;\n}", options: ["Setting a negative age", "Setting any age at all", "Reading the age field", "Creating new objects"], correctAnswer: 0, explanation: "The validation check blocks assignment of any negative value to age." },
          { question: "Why is encapsulation considered good practice?", options: ["It hides implementation details and protects data integrity", "It makes code run slower", "It removes the need for classes", "It prevents inheritance entirely"], correctAnswer: 0, explanation: "By controlling access to fields, encapsulation reduces bugs caused by invalid external changes." },
          { question: "What happens with this code?", code: "public class Person {\n    private String name;\n}\n\n// outside the class:\nPerson p = new Person();\np.name = \"Sam\";", options: ["Compile-time error, since name is private", "It works fine", "A runtime exception is thrown", "name silently becomes \"Sam\""], correctAnswer: 0, explanation: "Private fields cannot be accessed directly from outside their declaring class." },
          { question: "What is the term for exposing only necessary details while hiding internal complexity?", options: ["Encapsulation / information hiding", "Polymorphism", "Inheritance", "Only abstraction, never encapsulation"], correctAnswer: 0, explanation: "This is a core purpose of encapsulation — it hides how something works internally." },
          { question: "Which is true about default (package-private) access in Java?", options: ["It is accessible only within the same package", "It is accessible everywhere", "It is accessible only within the same class", "It is never accessible"], correctAnswer: 0, explanation: "When no modifier is written, members are visible to any class in the same package." }
        ]
      },
      inheritance: {
        title: "Inheritance",
        icon: "fa-solid fa-sitemap",
        questions: [
          { question: "Which keyword is used for inheritance in Java?", options: ["extends", "implements", "inherits", "super"], correctAnswer: 0, explanation: "A class uses extends to inherit fields and methods from another class." },
          { question: "What is the output?", code: "class Animal {\n    void sound() { System.out.println(\"Some sound\"); }\n}\nclass Dog extends Animal {\n    void sound() { System.out.println(\"Bark\"); }\n}\n\nAnimal a = new Dog();\na.sound();", options: ["Bark", "Some sound", "Compile error", "Both are printed"], correctAnswer: 0, explanation: "Java uses the actual object's type (Dog) at runtime, so the overridden sound() runs." },
          { question: "Does Java support multiple inheritance with classes?", options: ["No, a class can extend only one class", "Yes, without limit", "Yes, up to two classes", "Only for abstract classes"], correctAnswer: 0, explanation: "Java restricts class inheritance to a single parent to avoid ambiguity; interfaces are used for multiple inheritance instead." },
          { question: "What is a superclass?", options: ["The parent class being inherited from", "The child class", "An interface", "A static class"], correctAnswer: 0, explanation: "The superclass is the existing class that a subclass extends." },
          { question: "What is a subclass?", options: ["A class that inherits from another class", "A parent class", "An abstract method", "A private class"], correctAnswer: 0, explanation: "A subclass extends a superclass and can inherit and extend its behavior." },
          { question: "What is the output?", code: "class A {\n    int x = 10;\n}\nclass B extends A {\n    int y = 20;\n}\n\nB b = new B();\nSystem.out.println(b.x + b.y);", options: ["30", "10", "20", "Error"], correctAnswer: 0, explanation: "B inherits field x from A, so b.x + b.y equals 10 + 20 = 30." },
          { question: "Which keyword refers to the parent class's members?", options: ["super", "this", "extends", "parent"], correctAnswer: 0, explanation: "super lets a subclass access the superclass's fields, methods, or constructor." },
          { question: "What is the output?", code: "class Vehicle {\n    void start() { System.out.println(\"Vehicle starts\"); }\n}\nclass Car extends Vehicle {\n    void start() {\n        super.start();\n        System.out.println(\"Car starts\");\n    }\n}\n\nnew Car().start();", options: ["\"Vehicle starts\" then \"Car starts\"", "\"Car starts\" only", "Compile error", "\"Car starts\" then \"Vehicle starts\""], correctAnswer: 0, explanation: "super.start() explicitly calls the parent's version first, before Car's own println runs." },
          { question: "What does 'final' mean when applied to a class?", options: ["The class cannot be extended (inherited from)", "The class cannot be instantiated", "The class can have no methods", "The class is automatically abstract"], correctAnswer: 0, explanation: "A final class blocks any other class from using extends on it." },
          { question: "What is the topmost class in the Java class hierarchy?", options: ["Object", "Class", "Main", "System"], correctAnswer: 0, explanation: "Every class in Java implicitly extends Object if no other superclass is specified." }
        ]
      },
      polymorphism: {
        title: "Polymorphism",
        icon: "fa-solid fa-shapes",
        questions: [
          { question: "What is polymorphism?", options: ["The ability of an object to take many forms, e.g. via overriding or overloading", "Having only private fields", "Creating multiple constructors", "Static binding exclusively"], correctAnswer: 0, explanation: "Polymorphism lets the same method call behave differently depending on the actual object type." },
          { question: "What is method overloading an example of?", options: ["Compile-time (static) polymorphism", "Runtime polymorphism", "Encapsulation", "Inheritance only"], correctAnswer: 0, explanation: "The compiler resolves which overloaded method to call based on argument types at compile time." },
          { question: "What is method overriding an example of?", options: ["Runtime (dynamic) polymorphism", "Compile-time polymorphism", "Encapsulation", "Abstraction only"], correctAnswer: 0, explanation: "Which overridden method runs is decided at runtime, based on the object's actual class." },
          { question: "What is the output?", code: "class Shape {\n    double area() { return 0; }\n}\nclass Circle extends Shape {\n    double area() { return 3.14 * 5 * 5; }\n}\n\nShape s = new Circle();\nSystem.out.println(s.area());", options: ["78.5", "0.0", "Compile error", "25.0"], correctAnswer: 0, explanation: "Even though s is typed as Shape, the actual Circle object's overridden area() runs, giving 78.5." },
          { question: "Which is required for method overriding?", options: ["Same method name and parameters, in a subclass relationship", "Different parameter lists", "Only a different return type", "The method must be static"], correctAnswer: 0, explanation: "An override must match the superclass method's signature exactly and occur in a subclass." },
          { question: "Can static methods be overridden in Java?", options: ["No — static methods are hidden, not overridden", "Yes, just like instance methods", "Only if declared final", "Only inside interfaces"], correctAnswer: 0, explanation: "Static methods are resolved at compile time based on reference type, so subclasses only hide, not override, them." },
          { question: "What does this code demonstrate, assuming Dog and Cat override sound() differently?", code: "Animal[] animals = { new Dog(), new Cat() };\nfor (Animal a : animals) a.sound();", options: ["Runtime polymorphism", "Encapsulation", "Overloading", "Constructor chaining"], correctAnswer: 0, explanation: "Each element's actual class determines which sound() implementation is invoked at runtime." },
          { question: "What annotation is commonly used to indicate method overriding?", options: ["@Override", "@Overload", "@Polymorphic", "@Inherit"], correctAnswer: 0, explanation: "@Override tells the compiler to verify the method really does override a superclass method." },
          { question: "Which method is called here?", code: "void print(int a) {}\nvoid print(String a) {}\n\nprint(5);", options: ["print(int a)", "print(String a)", "Compile error", "Both are called"], correctAnswer: 0, explanation: "Since 5 is an int literal, the compiler selects the overload that accepts an int." },
          { question: "What is upcasting?", options: ["Assigning a subclass object to a superclass reference", "Assigning a superclass object to a subclass reference", "Converting an int to a double", "Casting to Object always causes an error"], correctAnswer: 0, explanation: "Upcasting treats a more specific object as its more general superclass type, which is always safe." }
        ]
      },
      abstraction: {
        title: "Abstraction",
        icon: "fa-solid fa-eye-slash",
        questions: [
          { question: "What is abstraction in Java?", options: ["Hiding implementation details and showing only essential features", "Hiding data using private fields", "Creating multiple classes", "Method overloading"], correctAnswer: 0, explanation: "Abstraction focuses on what an object does rather than how it does it internally." },
          { question: "Which keyword declares an abstract class?", options: ["abstract", "interface", "virtual", "hidden"], correctAnswer: 0, explanation: "The abstract keyword marks a class that may contain incomplete (abstract) methods." },
          { question: "Can you instantiate an abstract class directly?", options: ["No", "Yes, always", "Only using the new keyword", "Only if it has no methods"], correctAnswer: 0, explanation: "Abstract classes are incomplete by design and must be subclassed before use." },
          { question: "What is the output?", code: "abstract class Shape {\n    abstract double area();\n}\nclass Square extends Shape {\n    double side;\n    Square(double s) { side = s; }\n    double area() { return side * side; }\n}\n\nShape s = new Square(4);\nSystem.out.println(s.area());", options: ["16.0", "8.0", "Compile error", "4.0"], correctAnswer: 0, explanation: "Square implements area() to return side squared, which is 4 * 4 = 16.0." },
          { question: "Can an abstract class have concrete (non-abstract) methods?", options: ["Yes", "No, all methods must be abstract", "Only static methods are allowed", "Only private methods are allowed"], correctAnswer: 0, explanation: "Abstract classes can mix fully implemented methods alongside abstract ones." },
          { question: "What must a non-abstract subclass of an abstract class do?", options: ["Implement all inherited abstract methods", "Nothing special is required", "Redeclare all inherited fields", "Be declared final"], correctAnswer: 0, explanation: "Any concrete subclass must supply bodies for every abstract method it inherits." },
          { question: "What is the main purpose of abstraction?", options: ["To reduce complexity by hiding unnecessary details from the user", "To increase code duplication", "To prevent inheritance", "To make classes run faster"], correctAnswer: 0, explanation: "Abstraction lets users interact with a simple interface without needing to know internal workings." },
          { question: "What happens when compiling this code?", code: "abstract class Animal {\n    abstract void sound();\n}\nclass Dog extends Animal {\n    // no sound() implementation\n}", options: ["Compile-time error, Dog must implement sound() or be declared abstract", "It compiles fine", "A runtime error occurs", "Dog automatically becomes abstract"], correctAnswer: 0, explanation: "A concrete class that doesn't implement inherited abstract methods fails to compile." },
          { question: "Which is TRUE about abstract methods?", options: ["They have no body and must end with a semicolon", "They must have a body", "They can be marked private", "They can be marked final"], correctAnswer: 0, explanation: "Abstract methods declare only a signature; the implementing subclass supplies the body." },
          { question: "Can an abstract class have constructors?", options: ["Yes, used when a subclass is instantiated", "No", "Only static ones", "Only if it has no fields"], correctAnswer: 0, explanation: "Although you can't instantiate the abstract class itself, its constructor runs via super() when a subclass object is created." }
        ]
      },
      interfaces: {
        title: "Interfaces",
        icon: "fa-solid fa-plug",
        questions: [
          { question: "What is an interface in Java?", options: ["A contract that specifies methods a class must implement", "A concrete class with full method bodies", "A private helper class", "A loop structure"], correctAnswer: 0, explanation: "An interface defines a set of methods that implementing classes agree to provide." },
          { question: "Which keyword is used to implement an interface?", options: ["implements", "extends", "inherits", "interface"], correctAnswer: 0, explanation: "A class uses implements to fulfill the contract defined by an interface." },
          { question: "Can a class implement multiple interfaces?", options: ["Yes", "No, only one is allowed", "Only abstract classes can do this", "Never"], correctAnswer: 0, explanation: "Unlike class inheritance, a class can implement as many interfaces as needed." },
          { question: "What must the Circle class do here?", code: "interface Shape {\n    double area();\n}\nclass Circle implements Shape {\n    double r;\n    Circle(double r) { this.r = r; }\n    public double area() { return Math.PI * r * r; }\n}", options: ["Provide an implementation for area()", "Nothing — implementing it is optional", "Redeclare area() as abstract", "Extend a class instead of implementing"], correctAnswer: 0, explanation: "A class implementing an interface must supply bodies for all of its abstract methods." },
          { question: "Before Java 8, what type of methods could interfaces have?", options: ["Only abstract methods with no body", "Only static methods", "Only private methods", "Only final methods"], correctAnswer: 0, explanation: "Older interfaces could declare method signatures only, leaving the implementation entirely to classes." },
          { question: "What can interfaces have since Java 8?", options: ["Default and static methods with actual bodies", "Constructors", "Mutable instance fields", "Private constructors"], correctAnswer: 0, explanation: "Java 8 introduced default and static interface methods that include working implementations." },
          { question: "What is the access modifier of interface methods by default?", options: ["public", "private", "protected", "package-private (default)"], correctAnswer: 0, explanation: "Interface methods are implicitly public so that implementing classes can access them." },
          { question: "Can an interface extend another interface?", options: ["Yes", "No", "Only classes can extend interfaces", "Never"], correctAnswer: 0, explanation: "Interfaces can extend one or more other interfaces, inheriting their abstract methods." },
          { question: "What type of fields can an interface have?", options: ["public static final constants", "Regular mutable instance fields", "Private fields", "Protected fields"], correctAnswer: 0, explanation: "Any field declared in an interface is implicitly public, static, and final." },
          { question: "Why are interfaces useful for achieving multiple inheritance in Java?", options: ["A class can implement several interfaces to gain multiple behavior contracts", "They completely replace classes", "They cannot declare any methods", "They behave identically to abstract classes"], correctAnswer: 0, explanation: "Since a class can implement many interfaces, Java uses this mechanism instead of allowing multiple class inheritance." }
        ]
      },
      exceptions: {
        title: "Exception Handling",
        icon: "fa-solid fa-triangle-exclamation",
        questions: [
          { question: "What is an exception in Java?", options: ["An event that disrupts the normal flow of a program, signaling an error", "A normal return value", "A type of loop", "A special kind of comment"], correctAnswer: 0, explanation: "Exceptions represent unexpected conditions like invalid input or missing resources." },
          { question: "Which block is used to handle exceptions?", options: ["try-catch", "if-else", "switch-case", "for-loop"], correctAnswer: 0, explanation: "Code that might throw an exception is placed in try, and the handling logic goes in catch." },
          { question: "What is the output?", code: "try {\n    int x = 5 / 0;\n} catch (ArithmeticException e) {\n    System.out.println(\"Caught: \" + e.getMessage());\n}", options: ["Caught: / by zero", "The program crashes", "Nothing is printed", "5"], correctAnswer: 0, explanation: "Dividing by zero throws an ArithmeticException, which is caught and its message is printed." },
          { question: "What is the purpose of the 'finally' block?", options: ["Code that always executes, whether or not an exception occurred", "Code that only runs if an exception occurs", "Code that only runs if no exception occurs", "It replaces the catch block"], correctAnswer: 0, explanation: "finally is guaranteed to run for cleanup work, regardless of the try block's outcome." },
          { question: "Which is a checked exception?", options: ["IOException", "NullPointerException", "ArithmeticException", "ArrayIndexOutOfBoundsException"], correctAnswer: 0, explanation: "IOException must be either caught or declared with throws, unlike the unchecked runtime exceptions listed." },
          { question: "What exception is thrown here?", code: "String s = null;\nSystem.out.println(s.length());", options: ["NullPointerException", "ArithmeticException", "ClassCastException", "IOException"], correctAnswer: 0, explanation: "Calling a method on a null reference throws a NullPointerException." },
          { question: "Which keyword is used to manually throw an exception?", options: ["throw", "throws", "catch", "raise"], correctAnswer: 0, explanation: "The throw statement creates and raises an exception instance at that point in the code." },
          { question: "What does 'throws' in a method signature indicate?", options: ["The method may throw a checked exception that callers must handle", "The method definitely throws an exception every time", "It catches exceptions internally", "It's a syntax error"], correctAnswer: 0, explanation: "throws declares that a method might propagate a checked exception, requiring callers to deal with it." },
          { question: "Can you have multiple catch blocks for a single try block?", options: ["Yes, to handle different exception types separately", "No, only one catch block is allowed", "Only when using finally", "Never"], correctAnswer: 0, explanation: "Multiple catch blocks let you respond differently depending on which exception type occurred." },
          { question: "What is a custom exception?", options: ["A user-defined class that extends Exception or RuntimeException", "A built-in Java exception", "A syntax error", "A runtime warning"], correctAnswer: 0, explanation: "Developers create custom exceptions to represent application-specific error conditions." }
        ]
      },
      collections: {
        title: "Collections",
        icon: "fa-solid fa-boxes-stacked",
        questions: [
          { question: "What is the Java Collections Framework?", options: ["A set of classes and interfaces for storing and manipulating groups of objects", "A single class for arrays", "A primitive data type", "A database system"], correctAnswer: 0, explanation: "The framework provides reusable data structures like lists, sets, and maps." },
          { question: "Which interface is the root of the collection hierarchy?", options: ["Collection", "List", "Map", "Set"], correctAnswer: 0, explanation: "Collection is the top-level interface that List, Set, and Queue all extend (Map is separate)." },
          { question: "Which of these does NOT allow duplicate elements?", options: ["Set", "List", "ArrayList", "LinkedList"], correctAnswer: 0, explanation: "A Set enforces uniqueness, automatically rejecting duplicate values." },
          { question: "Which interface maintains insertion order and allows duplicates?", options: ["List", "Set", "Map", "Queue"], correctAnswer: 0, explanation: "A List preserves the order elements were added and permits duplicate values." },
          { question: "What does a Map store?", options: ["Key-value pairs", "Only values", "Only keys", "Sorted lists of numbers"], correctAnswer: 0, explanation: "Each entry in a Map associates a unique key with a corresponding value." },
          { question: "Which package contains most Java Collections classes?", options: ["java.util", "java.io", "java.lang", "java.net"], correctAnswer: 0, explanation: "Classes like ArrayList, HashMap, and HashSet all live in java.util." },
          { question: "What is the main difference between List and Set?", options: ["List allows duplicates and keeps order; Set does not allow duplicates", "They behave identically", "Set allows duplicates but List doesn't", "List stores key-value pairs"], correctAnswer: 0, explanation: "List is ordered and duplicate-friendly, while Set guarantees uniqueness of its elements." },
          { question: "Which collection would you use to implement a FIFO structure?", options: ["Queue", "Set", "Map", "List only"], correctAnswer: 0, explanation: "Queue is designed for first-in-first-out processing of elements." },
          { question: "What is an iterator used for?", options: ["Traversing elements of a collection one by one", "Sorting a collection automatically", "Deleting an entire collection", "Creating a new collection"], correctAnswer: 0, explanation: "An Iterator provides a standard way to step through a collection's elements sequentially." },
          { question: "What is the output?", code: "List<String> list = new ArrayList<>();\nlist.add(\"a\");\nlist.add(\"b\");\nSystem.out.println(list.size());", options: ["2", "1", "0", "Error"], correctAnswer: 0, explanation: "Two elements were added to the list, so size() returns 2." }
        ]
      },
      arraylist: {
        title: "ArrayList",
        icon: "fa-solid fa-list-ol",
        questions: [
          { question: "What is an ArrayList?", options: ["A resizable array implementation of the List interface", "A fixed-size array", "A Map implementation", "A primitive type"], correctAnswer: 0, explanation: "ArrayList automatically grows and shrinks as elements are added or removed, unlike a plain array." },
          { question: "What is the output?", code: "ArrayList<Integer> list = new ArrayList<>();\nlist.add(10);\nlist.add(20);\nSystem.out.println(list.get(0));", options: ["10", "20", "Error", "0"], correctAnswer: 0, explanation: "get(0) retrieves the first element added, which is 10." },
          { question: "How do you remove the element at index 1 from an ArrayList named list?", options: ["list.remove(1)", "list.delete(1)", "list.pop(1)", "list.removeAt(1)"], correctAnswer: 0, explanation: "remove(int index) deletes the element positioned at that index." },
          { question: "Can an ArrayList store primitive types like int directly?", options: ["No — it stores objects, so wrapper classes like Integer are used instead", "Yes, directly", "Only for double values", "Only when explicitly cast"], correctAnswer: 0, explanation: "Generics work only with reference types, so primitives are autoboxed into their wrapper classes." },
          { question: "What is the output?", code: "ArrayList<String> list = new ArrayList<>();\nlist.add(\"x\");\nlist.add(\"y\");\nlist.add(\"z\");\nSystem.out.println(list.size());", options: ["3", "2", "4", "Error"], correctAnswer: 0, explanation: "Three elements were added, so size() returns 3." },
          { question: "What is the main advantage of ArrayList over a regular array?", options: ["It can dynamically grow and shrink in size", "It is always faster for every operation", "It cannot store objects", "It has no built-in methods"], correctAnswer: 0, explanation: "Unlike fixed-size arrays, ArrayList automatically resizes itself as needed." },
          { question: "Which method checks if an ArrayList contains a specific element?", options: ["contains()", "has()", "exists()", "find()"], correctAnswer: 0, explanation: "contains() returns true if the specified element is present in the list." },
          { question: "What is the output?", code: "ArrayList<Integer> list = new ArrayList<>();\nlist.add(5);\nlist.set(0, 10);\nSystem.out.println(list.get(0));", options: ["10", "5", "Error", "0"], correctAnswer: 0, explanation: "set(0, 10) replaces the value at index 0 with 10." },
          { question: "What does list.isEmpty() return for a newly created empty ArrayList?", options: ["true", "false", "0", "null"], correctAnswer: 0, explanation: "An ArrayList with no elements yet reports isEmpty() as true." },
          { question: "Which import statement is needed to use ArrayList?", options: ["import java.util.ArrayList;", "import java.io.ArrayList;", "import java.lang.ArrayList;", "None needed"], correctAnswer: 0, explanation: "ArrayList is part of the java.util package and must be imported explicitly." }
        ]
      },
      hashmap: {
        title: "HashMap",
        icon: "fa-solid fa-hashtag",
        questions: [
          { question: "What is a HashMap?", options: ["A collection that stores key-value pairs with no guaranteed order", "A sorted list", "A type of array", "A single-value container"], correctAnswer: 0, explanation: "HashMap organizes data as key-value pairs using a hash table internally." },
          { question: "What is the output?", code: "HashMap<String, Integer> map = new HashMap<>();\nmap.put(\"a\", 1);\nmap.put(\"b\", 2);\nSystem.out.println(map.get(\"a\"));", options: ["1", "2", "Error", "null"], correctAnswer: 0, explanation: "get(\"a\") retrieves the value associated with the key \"a\", which is 1." },
          { question: "What happens if you put a key that already exists in a HashMap?", options: ["The old value is replaced with the new value", "It throws an exception", "The new value is ignored", "It creates a duplicate key entry"], correctAnswer: 0, explanation: "Each key maps to exactly one value, so re-putting a key overwrites its previous value." },
          { question: "Can HashMap keys be null?", options: ["Yes, one null key is allowed", "No, never", "Only in TreeMap", "Only values can be null, not keys"], correctAnswer: 0, explanation: "HashMap permits a single null key, unlike some other Map implementations." },
          { question: "Which method checks if a HashMap contains a specific key?", options: ["containsKey()", "hasKey()", "containsValue() only", "exists()"], correctAnswer: 0, explanation: "containsKey() returns true if the map has an entry with the given key." },
          { question: "What is the output?", code: "HashMap<String, Integer> map = new HashMap<>();\nSystem.out.println(map.get(\"missing\"));", options: ["null", "Compile error", "0", "an empty string"], correctAnswer: 0, explanation: "Requesting a key that isn't present returns null rather than throwing an exception." },
          { question: "Does HashMap maintain insertion order?", options: ["No, iteration order is not guaranteed", "Yes, always", "Only for String keys", "Only when explicitly sorted"], correctAnswer: 0, explanation: "HashMap's internal hashing means the order entries are stored in isn't predictable." },
          { question: "Which method removes a key-value pair from a HashMap?", options: ["remove(key)", "delete(key)", "removeKey(key)", "drop(key)"], correctAnswer: 0, explanation: "remove(key) deletes the entry associated with the given key." },
          { question: "Which data structure would you use instead of HashMap if you need sorted keys?", options: ["TreeMap", "ArrayList", "LinkedList", "HashSet"], correctAnswer: 0, explanation: "TreeMap keeps its keys in sorted order, unlike the unordered HashMap." },
          { question: "What is the output?", code: "HashMap<String, Integer> map = new HashMap<>();\nmap.put(\"x\", 1);\nmap.put(\"x\", 2);\nSystem.out.println(map.size());", options: ["1", "2", "Error", "0"], correctAnswer: 0, explanation: "Putting the same key twice updates its value but doesn't add a second entry, so size stays 1." }
        ]
      },
      generics: {
        title: "Generics",
        icon: "fa-solid fa-code",
        questions: [
          { question: "What is the purpose of generics in Java?", options: ["To provide type safety and enable code reuse across different data types", "To make code run faster", "To replace all classes", "To remove type checking entirely"], correctAnswer: 0, explanation: "Generics let classes and methods work with any type while catching type errors at compile time." },
          { question: "What happens with this code?", code: "List<String> list = new ArrayList<>();\nlist.add(\"hello\");\nlist.add(5);", options: ["Compile-time error, only Strings are allowed", "It compiles fine, adding 5 as a String", "It throws a runtime exception", "5 is automatically converted to \"5\""], correctAnswer: 0, explanation: "The generic type parameter <String> restricts the list to String elements, so adding an int fails to compile." },
          { question: "What does the diamond operator <> do?", options: ["Allows the compiler to infer the generic type", "Declares an array", "Creates an interface", "Marks a method as generic"], correctAnswer: 0, explanation: "The empty diamond lets Java infer the type argument from the variable's declared type." },
          { question: "What is the output?", code: "class Box<T> {\n    T value;\n    void set(T v) { value = v; }\n    T get() { return value; }\n}\n\nBox<Integer> b = new Box<>();\nb.set(5);\nSystem.out.println(b.get());", options: ["5", "Compile error", "null", "0"], correctAnswer: 0, explanation: "Box is instantiated with Integer, so set(5) stores 5 and get() returns it." },
          { question: "What is a generic method?", options: ["A method that can operate on objects of various types specified by type parameters", "A method with no parameters", "A static method only", "A method that always returns void"], correctAnswer: 0, explanation: "Generic methods declare their own type parameters, independent of the class they belong to." },
          { question: "What is type erasure in Java generics?", options: ["The compiler removes generic type info at compile time, replacing it with casts/bounds", "Types are erased at runtime, causing crashes", "Generic types are stored as plain strings", "None of the above"], correctAnswer: 0, explanation: "Type erasure means generic type parameters exist only at compile time, not in the compiled bytecode." },
          { question: "Which is a bounded type parameter?", options: ["<T extends Number>", "<T>", "<?>", "<T implements Object>"], correctAnswer: 0, explanation: "extends restricts T to Number or one of its subclasses, forming a bounded type parameter." },
          { question: "What does the wildcard '?' represent in generics?", options: ["An unknown type", "A specific class", "A syntax error", "A null value"], correctAnswer: 0, explanation: "The wildcard is used when the exact generic type doesn't matter or isn't known." },
          { question: "Why can't you create generic arrays directly, like 'new T[10]', in Java?", options: ["Because of type erasure, the JVM has no runtime knowledge of T", "It is actually allowed without restriction", "Arrays fundamentally don't support any element types", "There is no such syntax attempt possible"], correctAnswer: 0, explanation: "Since generic type information is erased at runtime, the JVM can't safely create an array of an unknown type." },
          { question: "What is the output?", code: "public static <T> void printItem(T item) {\n    System.out.println(item);\n}\n\nprintItem(\"Hello\");", options: ["Hello", "Compile error", "null", "A warning only, nothing printed"], correctAnswer: 0, explanation: "The generic method accepts any type, so passing \"Hello\" simply prints it." }
        ]
      },
      advancedOOP: {
        title: "Advanced OOP",
        icon: "fa-solid fa-brain",
        questions: [
          { question: "What is composition in OOP?", options: ["Building complex objects by combining simpler objects (a \"has-a\" relationship)", "Inheriting from a parent class", "Hiding data behind private fields", "Overloading constructors"], correctAnswer: 0, explanation: "Composition assembles functionality by having one class contain instances of other classes." },
          { question: "What is the difference between an 'is-a' and a 'has-a' relationship?", options: ["\"is-a\" is inheritance; \"has-a\" is composition", "They mean the same thing", "\"has-a\" is a form of inheritance", "Neither concept applies to Java"], correctAnswer: 0, explanation: "Inheritance models an 'is-a' relationship, while composition models a 'has-a' relationship." },
          { question: "What is an inner (nested) class?", options: ["A class defined within another class", "A class with no methods", "A static main class", "An interface"], correctAnswer: 0, explanation: "Inner classes are declared inside another class, often to logically group related code." },
          { question: "What is a static nested class?", options: ["A nested class declared static, not tied to an instance of the outer class", "A class that can never be instantiated", "An abstract class", "An anonymous class"], correctAnswer: 0, explanation: "Unlike a regular inner class, a static nested class doesn't need an enclosing instance to exist." },
          { question: "What is an anonymous class?", options: ["A class without a name, defined and instantiated in a single expression", "A private class", "A class with only static methods", "An interface with no methods"], correctAnswer: 0, explanation: "Anonymous classes are useful for quick, one-off implementations, often of an interface or abstract class." },
          { question: "What is the purpose of the 'final' keyword on a method?", options: ["It prevents the method from being overridden by subclasses", "It makes the method static", "It makes the method abstract", "It deletes the method"], correctAnswer: 0, explanation: "A final method locks in its implementation, forbidding subclasses from overriding it." },
          { question: "What Java feature does this code demonstrate?", code: "interface Greet {\n    void sayHi();\n}\n\nGreet g = () -> System.out.println(\"Hi!\");\ng.sayHi();", options: ["A lambda expression implementing a functional interface", "An anonymous class only", "Generics", "Reflection"], correctAnswer: 0, explanation: "The arrow syntax () -> ... is a lambda expression providing the implementation for Greet's single method." },
          { question: "What is a functional interface?", options: ["An interface with exactly one abstract method, usable with lambda expressions", "An interface with many abstract methods", "A class with only static methods", "An abstract class"], correctAnswer: 0, explanation: "Having a single abstract method lets a functional interface be implemented concisely with a lambda." },
          { question: "What is method chaining?", options: ["Calling multiple methods sequentially on the same object in one statement", "Calling a method inside another method's parameter", "Overloading a method multiple times", "Inheriting methods from a superclass"], correctAnswer: 0, explanation: "Method chaining links calls together (e.g. obj.method1().method2()) when each method returns the object itself." },
          { question: "What does the 'instanceof' operator check?", options: ["Whether an object is an instance of a specific class or subclass", "Whether two objects are equal in value", "Whether a variable is static", "Whether a method has been overridden"], correctAnswer: 0, explanation: "instanceof tests an object's runtime type against a given class or interface." }
        ]
      }
    }
  }
};
