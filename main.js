(function() {
  let output = document.querySelector('.output');
  let worker = new Worker('worker.js');
  // Module.printCallback = function(text) {
  //   // let div = document.createElement('div');
  //   // div.innerText = text;
  //   // setTimeout(() => output.appendChild(div), 0);

  // }
  worker.onmessage = function(message) {
    let div = document.createElement('div');
    div.innerText = text;
    output.appendChild(div);
  }
  document.querySelector('button').addEventListener('click', e => {
    document.querySelector('.output').innerHTML = '';
    let code = document.querySelector('textarea').value;
    console.log('sending to c', code);
    worker.postMessage(code);
    // runCode(document.querySelector('textarea').value);
  });
})();