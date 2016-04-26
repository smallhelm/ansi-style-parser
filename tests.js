var test = require('tape');
var chalk = require('chalk');
var parser = require('./');

var tst = function(t, src, expected){
  t.deepEquals(parser(src), expected);
};

test('basics', function(t){

  tst(t, 'hello world', [
      {style: 'reset', text: 'hello world'}
  ]);

  tst(t, chalk.green('hello'), [
      {style: 'green', text: 'hello'}
  ]);

  tst(t, 'hello ' + chalk.green('world') + chalk.red('!'), [
      {style: 'reset', text: 'hello '},
      {style: 'green', text: 'world'},
      {style: 'red', text: '!'}
  ]);

  tst(t, 'wat?\033[33m is\033[34m[34m\033[31m? \033[mend', [
      {style: 'reset', text: 'wat?'},
      {style: 'yellow', text: ' is'},
      {style: 'blue', text: '[34m'},
      {style: 'red', text: '? '},
      {style: 'reset', text: 'end'}
  ]);

  t.end();
});

/*
test('nested_styles', function(t){
  tst(t, chalk.green.bgRed.underline('world'), [
      {style: '?', text: 'world '}
  ]);
  t.end();
});
*/
