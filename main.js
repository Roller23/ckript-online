(function() {
  let output = document.querySelector('.output');
  Module.printCallback = function(text) {
    console.log('WASM output:\n', text);
    let div = document.createElement('div');
    div.innerText = text;
    output.appendChild(div);
  }
  document.querySelector('button').addEventListener('click', e => {
    document.querySelector('.output').innerHTML = '';
    let code = document.querySelector('textarea').value;
    runCode(code);
  });




  const editor = CodeMirror(document.querySelector('.code-wrap'), {
    lineNumbers: true,
    mode: 'text/x-c',
    theme: 'midnight',
    value: '// Write code here...',
    indentUnit: 2,
    tabSize: 4,
    indentWithTabs: true,
    lineWrapping: true,
    allowDropFileTypes: ['text/plain', 'text/*'],
    spellcheck: false,
    autocorrect: false,
    autocapitalize: false
  });

  if (localStorage.lastCode) {
    editor.setValue(localStorage.lastCode);
  }


})();