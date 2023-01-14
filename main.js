(() => {
  const interpreter = new Interpreter();

  const output = document.querySelector('.output');
  const terminal = document.querySelector('.terminal-wrap');

  function printOutput(text) {
    const div = document.createElement('div');
    div.classList.add('line');
    div.innerHTML = '&#8203;';
    div.innerText += text;
    output.appendChild(div);
    terminal.scrollTop = terminal.scrollHeight * 2;
  }

  interpreter.onOutput(printOutput)
  interpreter.onError(printOutput)

  document.querySelector('.run-code').addEventListener('click', () => {
    output.innerHTML = '';
    interpreter.processCode(editor.getValue());
  });

  document.querySelector('.get-docs').addEventListener('click', () => {
    if (confirm('Would you like to paste example code again? (Will overwrite current code')) {
      editor.setValue(initialCode);
    }
  });

  const initialCode =
`  // Welcome to Ckript online interpreter
  // Read the language documentation here https://github.com/Roller23/ckript-lang
  // Check out related Github repositories
  // https://github.com/Roller23/ckript-online
  // https://github.com/Roller23/ckript-js

  // Quick start:

  // Creating variables

  str greeting = 'Hello world';
  const num PI = 3.1415; // non reassignable
  // printing to the console
  println(greeting, 'PI is', PI);

  // functions

  func square = function(num x) num {
    return x * x;
  };

  println('6 squared is ' + square(6)); // string concatenation

  // to capture outside variables, use the '>' operator after the function keyword

  num outsideVariable = 42;

  func canCapture = function>(void) void {
    println(outsideVariable);
  };

  canCapture();

  // functions can be declared inside other functions

  func outer = function(void) num {
    func inner = function(num arg) num {
      return arg * 2;
    };
    return inner(5);
  };

  println('outer =', outer());

  // arrays

  arr table = array(1, 2, 3) num;

  arr tableSquared = (function(arr tab, func transformator) arr {
    num i = 0;
    arr result = array() num;
    for (; i < sizeof(tab); i += 1) {
      result += transformator(tab[i]); // appending to the array
    }
    return result;
  })(table, square); // immediate function invocation

  println(tableSquared);

  #tableSquared[0] = 123; // reassign an array cell (# is required)

  println(tableSquared);

  // preallocated arrays

  arr preallocated = array() [3] num;

  #preallocated[0] = 1.23;
  #preallocated[1] = 4.56;
  #preallocated[2] = 7.89;

  println(preallocated);

  // memory allocation

  alloc num mem1 = 5; // 5 is allocated on the heap and 'mem1' is a pointer to that location
  ref num mem2 = mem1; // 'mem2' points to the 'mem1' location

  mem2 += 8; // dereferencing is implicit

  println('mem1 is @1, mem2 is @2'(mem1, mem2)); // string interpolation

  // Functions can accept refs, arrays can hold refs

  println('mem1 is @1, mem2 is @2'(mem1, mem2)); // string interpolation

  // Classes and objects

  class Person(str name, num age); // declare a class

  obj Mark = Person("Mark", 25); // create an instance

  println(Mark);
  println(Mark.age);

  $Mark.age = 30; // reassign a member ($ is required)

  println(Mark);

  // 'this' variable

  // Only allocated objects can have function members that make use of 'this'

  class Test(num number, func method);

  alloc obj a = Test(5, function(void) void {
    println('My number is', this.number);
  });

  a.method();

  // while, for, if, else statements and the like work just like in any other C-like language

  // Ckript includes a small native standard library, a short overview can be found there
  // https://github.com/Roller23/ckript-lang#standard-library

  // Click 'Run' to run this example`

  const editor = CodeMirror(document.querySelector('.code-wrap'), {
    lineNumbers: true,
    mode: 'text/x-c',
    theme: 'monokai',
    value: initialCode,
    indentUnit: 2,
    tabSize: 2,
    indentWithTabs: true,
    lineWrapping: true,
    allowDropFileTypes: ['text/plain', 'text/*'],
    spellcheck: false,
    autocorrect: false,
    autocapitalize: false,
    smartIndent: true,
    autofocus: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true}
  });

  if (typeof localStorage.lastCode === 'string') {
    editor.setValue(localStorage.lastCode);
  }

  const saveInterval = setInterval(() => {
    localStorage.lastCode = editor.getValue();
  }, 1000);

  window.addEventListener("message", (event) => {
    let data = {};
    try {
      data = JSON.parse(event.data);
    } catch (e) {
      return;
    }
    clearInterval(saveInterval);
    if (data.event === 'code' && typeof data.code === 'string') {
      editor.setValue(data.code);
    } else if (data.event === 'run') {
      interpreter.processCode(editor.getValue());
    }
  });

})();