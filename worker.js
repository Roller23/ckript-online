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
let db = null;
indexedDB.open("SharedData").onsuccess = function(event) {
  db = event.target.result;
};

function getInput() {
  return "";
}

function runCode(code) {
  Module.ccall('runCode', null, ['string'], [code]);
}

importScripts('ckript.js');

onmessage = function(message) {
  if (message.data.type === 'input') {
    // inputResponse = message.data.content;
    return;
  }
  runCode(message.data.content);
}