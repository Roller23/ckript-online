# Online Ckript interpreter

An online version of Ckript interpreter

Check it out here: https://ckript.netlify.app

## How to embed

The online version of Ckript listens for `message` events.
It can be embedded in an iframe and controlled with `Window.postMessage`.

Example usage:

Change the editor's code
```js
ckriptIframe.contentWindow.postMessage(JSON.stringify({
  event: 'code',
  code: 'println("Hello");'
}), '*');
```

Execute code
```js
ckriptIframe.contentWindow.postMessage(JSON.stringify({event: 'run'}), '*');
```

Check out other repositories
- Node.js version: https://github.com/Roller23/ckript-js
- Browser version: https://github.com/Roller23/ckript-browser (used here)
- C++ version: https://github.com/Roller23/ckript-lang
