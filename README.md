# ansi-style-parser

Parse ANSI colors and styles

## Install
`npm install ansi-style-parser`

## Usage

```js
var c = require('chalk');
var parser = require('ansi-style-parser');

var txt = 'Some ';
txt += c.bold.green('styled ' + c.underline.bgBlack('text') + c.red('!'));

console.log(parser(txt));
```
Output:
```js
[ { styles: [],
    text: 'Some ' },

  { styles: [ 'bold', 'green' ],
    text: 'styled ' },

  { styles: [ 'bold', 'green', 'underline', 'bgBlack' ],
    text: 'text' },

  { styles: [ 'bold', 'red' ],
    text: '!' } ]
```

## License
MIT
