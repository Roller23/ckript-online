(function() {
  let output = document.querySelector('.output');
  let worker = new Worker('worker.js');
  Module.printCallback = function(text) {
    let div = document.createElement('div');
    div.innerText = text;
    setTimeout(() => output.appendChild(div), 0);
  }
  document.querySelector('button').addEventListener('click', e => {
    document.querySelector('.output').innerHTML = '';
    let code = document.querySelector('textarea').value;
    console.log('sending to c', code);
    let data = {Module, code};
    worker.postMessage(data);
    // runCode(document.querySelector('textarea').value);
  });
})();