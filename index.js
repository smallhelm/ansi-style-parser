var ansiRegEx = require('ansi-regex');

var each = function(obj, fn){
  var key;
  for(key in obj){
    if(obj.hasOwnProperty(key)){
      fn(obj[key], key, obj);
    }
  }
};

//values - first is the code, the reset are escapes
var styles = {
  bold: [1, 21, 22],
  dim: [2, 21, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  hidden: [8, 28],
  strikethrough: [9, 29],
  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39],
  bgBlack: [40, 49],
  bgRed: [41, 49],
  bgGreen: [42, 49],
  bgYellow: [43, 49],
  bgBlue: [44, 49],
  bgMagenta: [45, 49],
  bgCyan: [46, 49],
  bgWhite: [47, 49]
};

var code_to_style = {};
var escape_codes = {};

each(styles, function(style, name){
  var code = '\u001b['+style[0]+'m';
  code_to_style[code] = name;

  var addEscapeCode = function(escape_code){
    if(!escape_codes[escape_code]){
      escape_codes[escape_code] = {};
    }
    escape_codes[escape_code][code] = true;
    escape_codes[escape_code][name] = true;
  };

  each(style.slice(1), function(num){
    addEscapeCode('\u001b['+num+'m');
  });
  addEscapeCode('\u001b[m');
  addEscapeCode('\u001b[0m');
});

module.exports = function(str){
  var r = [];
  var curr = str;
  var curr_style = [];
  var code;
  var e;
  while(e = ansiRegEx().exec(curr)){
    if(e.index > 0){
      r.push({
        styles: curr_style,
        text: curr.substr(0, e.index)
      });
    }
    code = e[0];
    curr_style = [];//TODO handle resets
    if(code_to_style[code]){
      curr_style.push(code_to_style[code]);
    }
    curr = curr.substr(e.index + e[0].length);
  }
  if(curr.length > 0){
    r.push({
      styles: curr_style,
      text: curr
    });
  }
  return r;
};
