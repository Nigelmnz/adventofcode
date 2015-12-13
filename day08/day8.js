//http://adventofcode.com/day/8

'use strict';
var fs = require('fs');
var input = fs.readFileSync('input.txt','utf8').split('\n').slice(0,-1);

//Part 1
console.log(input.reduce((acc,x) => {
  return acc + x.length - eval(x).length;
},0));

//Part 2
console.log(input.reduce((acc,x) => {
  return acc + JSON.stringify(x).length - x.length;
},0));
