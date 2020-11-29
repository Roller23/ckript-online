(function() {
  let output = document.querySelector('.output');
  Module.printCallback = function(text) {
    console.log('WASM output:\n', text);
    let div = document.createElement('div');
    div.classList.add('line');
    div.innerText = text;
    output.appendChild(div);
  }
  document.querySelector('button').addEventListener('click', e => {
    output.innerHTML = '';
    let code = editor.getValue();
    runCode(code);
  });

  let initialCode = `
// Welcome to Ckript online interpreter
// Read the language documentation here

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
  `.trim();

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