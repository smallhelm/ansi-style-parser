var ansiRegEx = require('ansi-regex');
var styles_to_codes = require('ansi-styles');

var code_to_style = {};

var key, o;
for(key in styles_to_codes){
  if(styles_to_codes.hasOwnProperty(key)){
    o = styles_to_codes[key];
    code_to_style[o.open] = key;
    if(o.close !== o.open){
      code_to_style[o.close] = key + '_close';
    }
  }
  
}
code_to_style['\u001b[m'] = 'reset';

module.exports = function(str){
  var r = [];
  var curr = str;
  var curr_style = 'reset';
  var code;
  var e;
  while(e = ansiRegEx().exec(curr)){
    if(e.index > 0){
      r.push({
        style: curr_style,
        text: curr.substr(0, e.index)
      });
    }
    code = e[0];
    curr_style = code_to_style[code] || code;
    curr = curr.substr(e.index + e[0].length);
  }
  if(curr.length > 0){
    r.push({
      style: curr_style,
      text: curr
    });
  }
  return r;
};
