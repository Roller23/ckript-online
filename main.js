(function() {
  let output = document.querySelector('.output');
  Module.printCallback = function(text) {
    let div = document.createElement('div');
    div.innerText = text;
    setTimeout(() => output.appendChild(div), 0);
  }
  document.querySelector('button').addEventListener('click', e => {
    document.querySelector('.output').innerHTML = '';
    console.log('sending to c', document.querySelector('textarea').value);
    runCode(document.querySelector('textarea').value);
  });
})();