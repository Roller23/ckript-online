(function() {
  let output = document.querySelector('.output');
  let terminal = document.querySelector('.terminal-wrap');
  Module.printCallback = function(text) {
    console.log('WASM output:\n', text);
    let div = document.createElement('div');
    div.classList.add('line');
    div.innerHTML = '&nbsp;';
    div.innerText += text;
    output.appendChild(div);
    terminal.scrollTop = terminal.scrollHeight * 2;
  }
  document.querySelector('.run-code').addEventListener('click', e => {
    output.innerHTML = '';
    let code = editor.getValue();
    runCode(code);
  });

  document.querySelector('.get-docs').addEventListener('click', e => {
    alert("Work in progress! Read https://github.com/Roller23/ckript-lang in the meantime");
    if (confirm('Would you like to paste example code again? (Will overwrite current code')) {
      editor.setValue(initialCode);
    }
  });

  let initialCode =
`  // Welcome to Ckript online interpreter
  // Read the language documentation here (Work in progress)
  // Check out the github repositories
  // https://github.com/Roller23/ckript-lang
  // https://github.com/Roller23/ckript-online

  // Quick start:

  // Creating variables

  str greeting = 'Hello world';
  const double PI = 3.1415; // non reassignable
  // printing to the console
  println(greeting, 'PI is', PI);

  // functions

  func square = function(int x) int {
    return x * x;
  };

  println('6 squared is ' + square(6)); // string concatenation

  // to capture outside variables, use the '>' operator after the function keyword

  int outsideVariable = 42;

  func canCapture = function>(void) void {
    println(outsideVariable);
  };

  canCapture();

  // functions can be declared inside other functions

  func outer = function(void) int {
    func inner = function(int arg) int {
      return arg * 2;
    };
    return inner(5);
  };

  println('outer =', outer());

  // arrays

  arr table = array(1, 2, 3) int;

  arr tableSquared = (function(arr tab, func transformator) arr {
    int i = 0;
    arr result = array() int;
    for (; i < size(tab); i += 1) {
      result += transformator(tab[i]); // appending to the array
    }
    return result;
  })(table, square); // immediate function invocation

  println(tableSquared);

  #tableSquared[0] = 123; // reassign an array cell (# is required)

  println(tableSquared);

  // preallocated arrays

	arr preallocated = array() [3] double;

	#preallocated[0] = 1.23;
	#preallocated[1] = 4.56;
	#preallocated[2] = 7.89;

	println(preallocated);

  // memory allocation

  alloc int mem1 = 5; // 5 is allocated on the heap and 'mem1' is a pointer to that location
  ref int mem2 = mem1; // 'mem2' points to the 'mem1' location

  mem2 += 8; // dereferencing is implicit

  println('mem1 is @1, mem2 is @2'(mem1, mem2)); // string interpolation

  // Functions can accept refs, arrays can hold refs

  del mem1; // free memory from the heap, both mem1 and mem2 should no longer be used

  // Classes and objects

  class Person(str name, int age); // declare a class

  obj Mark = Person("Mark", 25); // create an instance

  println(Mark);
  println(Mark.age);

  $Mark.age = 30; // reassign a member ($ is required)

  println(Mark);

  // 'this' variable

  // Only allocated objects can have function members that make use of 'this'

  class Test(int number, func method);

  alloc obj a = Test(5, function(void) void {
    println('My number is', this.number);
  });

  a.method();

  // while, for, if, else statements and the like work just like in any other C-like language

  // Ckript includes a small native standard library, a short overview can be found there
  // https://github.com/Roller23/ckript-lang#standard-library

  // Click 'Run' to run this example
  // The code is interpreted by your browser thanks to the wonders of WebAssembly

  // Check out the documentation for more in-depth info (Work in progress)`

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

  let saveCodeInterval = setInterval(() => {
    localStorage.lastCode = editor.getValue();
  }, 1000);

  Split(['#one', '#two'], {
    sizes: [25, 75],
  })

})();