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
      if (Module.printCallback) {
        Module.printCallback(text);
      }
    };
  })(),
  printErr: function(text) {
    if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
    console.error(text);
  },
  canvas: null,
  setStatus: function(text) {

  },
  totalDependencies: 0,
  monitorRunDependencies: function(left) {
    
  }
};
window.onerror = function(event) {
  Module.setStatus = function(text) {
    if (text) console.error(text);
  };
};

function runCode(code) {
  Module.ccall('runCode', null, ['string'], [code]);
}

let promptAsked = true;