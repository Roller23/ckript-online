(async function() {
  var Module = {
    preRun: [],
    postRun: [],
    printCallback: null,
    print: (function() {
      return function(text) {
        if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
        // text = text.replace(/&/g, "&amp;");
        // text = text.replace(/</g, "&lt;");
        // text = text.replace(/>/g, "&gt;");
        // text = text.replace('\n', '<br>', 'g');
        console.log('worker got', text);
        postMessage(text);
      };
    })(),
    printErr: function(text) {
      if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
      console.error('worker got', text);
    },
    canvas: (function() {
      return null;
    })(),
    setStatus: function(text) {
  
    },
    totalDependencies: 0,
    monitorRunDependencies: function(left) {
      
    }
  };
  
  let inputResponse = null;
  
  function getInput() {
    while (inputResponse == null);
    let res = inputResponse;
    inputResponse = null;
    return res;
  }
  
  function runCode(code) {
    Module.ccall('runCode', null, ['string'], [code]);
  }
  
  importScripts('ckript.js');
  
  onmessage = function(message) {
    runCode(message.data);
    if (inputResolve && message.data.type === 'input') {
      inputResponse = message.data.content;
    }
  }
})();