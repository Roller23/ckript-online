(function() {
  let output = document.querySelector('.output');
  Module.printCallback = function(text) {
    console.log('WASM output:\n', text);
    let div = document.createElement('div');
    div.classList.add('line');
    div.innerText = text;
    output.appendChild(div);
  }
  document.querySelector('.run-code').addEventListener('click', e => {
    output.innerHTML = '';
    let code = editor.getValue();
    runCode(code);
  });

  document.querySelector('.get-docs').addEventListener('click', e => {
    alert("Work in progress! Read https://github.com/Roller23/ckript-lang in the meantime");
  });

  let initialCode = `// Welcome to Ckript online interpreter
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

// arrays

arr table = array(1, 2, 3) int;

arr tableSquared = (function>(arr tab) arr { // capture outside variables with the '>' operator
  int i = 0;
  arr result = array() int;
  for (; i < size(tab); i += 1) {
    result += square(tab[i]); // appending to the array
  }
  return result;
})(table); // immediate function invocation

println(tableSquared);

#tableSquared[0] = 123; // reassign an array cell (# is required)

println(tableSquared);

// memory allocation

alloc int mem1 = 5; // 5 is allocated on the heap and 'mem1' is a pointer to that location
ref int mem2 = mem1; // 'mem2' points to the 'mem1' location

mem2 += 8;

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

// Check out the documentation for more in-depth info (Work in progress)`;

  const editor = CodeMirror(document.querySelector('.code-wrap'), {
    lineNumbers: true,
    mode: 'text/x-c',
    theme: 'monokai',
    value: initialCode,
    indentUnit: 2,
    tabSize: 4,
    indentWithTabs: true,
    lineWrapping: true,
    allowDropFileTypes: ['text/plain', 'text/*'],
    spellcheck: false,
    autocorrect: false,
    autocapitalize: false
  });

  if (typeof localStorage.lastCode === 'string') {
    editor.setValue(localStorage.lastCode);
  }

  let saveCodeInterval = setInterval(() => {
    localStorage.lastCode = editor.getValue();
  }, 1000);
})();