(function() {
  Module.printCallback = function(text) {
    let div = document.createElement('div');
    div.innerText = text;
    document.querySelector('.output').appendChild(div);
    void(document.documentElement.offsetHeight); // force reflow
  }
  document.querySelector('button').addEventListener('click', e => {
    document.querySelector('.output').innerHTML = '';
    console.log('sending to c', document.querySelector('textarea').value);
    runCode(document.querySelector('textarea').value);
  });
})();