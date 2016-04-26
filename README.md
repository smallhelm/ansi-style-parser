# ansi-style-parser

[![build status](https://secure.travis-ci.org/smallhelm/ansi-style-parser.png)](https://travis-ci.org/smallhelm/ansi-style-parser)
[![dependency status](https://david-dm.org/smallhelm/ansi-style-parser.svg)](https://david-dm.org/smallhelm/ansi-style-parser)

Parse ansi colors and styles

```js
var c = require('chalk');
var parser = require('ansi-style-parser');

var txt = 'Some ';
txt += c.bold.green('styled ' + c.underline.bgBlack('text') + c.red('!'));

console.log(parser(txt));
```
output:
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
