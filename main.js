(function() {
  let output = document.querySelector('.output');
  Module.printCallback = function(text) {
    let div = document.createElement('div');
    div.innerText = text;
    output.appendChild(div);
  }
  document.querySelector('button').addEventListener('click', e => {
    document.querySelector('.output').innerHTML = '';
    let code = document.querySelector('textarea').value;
    runCode(code);
  });
})();