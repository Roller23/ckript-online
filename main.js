(function() {
  let output = document.querySelector('.output');
  Module.printCallback = function(text) {
    console.log('WASM output:\n', text);
    let div = document.createElement('div');
    div.innerText = text;
    output.appendChild(div);
  }
  // document.querySelector('button').addEventListener('click', e => {
  //   document.querySelector('.output').innerHTML = '';
  //   let code = editor.getValue();
  //   runCode(code);
  // });

  let initialCode = `
    // Write code here...
  `;

  const editor = CodeMirror(document.querySelector('.code-wrap'), {
    lineNumbers: true,
    mode: 'text/x-c',
    theme: 'monokai',
    value: initialCode.trim(),
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