//http://adventofcode.com/day/23

'use strict';
var _ = require('lodash');
var fs = require('fs');
var input = fs.readFileSync('input.txt','utf8').split('\n').slice(0,-1);

//Part 1
console.log(parseInstructions({a:0,b:0},input));

//Part 2
console.log(parseInstructions({a:1,b:0},input));

function parseInstructions(start,data){
  var computer = start;
  for(var i = 0; i < data.length; ++i){
    var parsed = data[i].match(/(.{3}) (?=(?=(.), (?=(.)(.*)))|(?=(.)(.*))|(.{1}))/).slice(1).filter(x => x);
    var command = parsed[0];

    switch(command){
      case 'hlf':
        computer[parsed[1]] /= 2;
        break;
      case 'tpl':
        computer[parsed[1]] *= 3;
        break;
      case 'inc':
        computer[parsed[1]] += 1;
        break;
      case 'jmp':
        i += jumpSize(parsed[1],parsed[2]) - 1;
        break;
      case 'jie':
        if(computer[parsed[1]] % 2 === 0) i += jumpSize(parsed[2],parsed[3]) - 1;
        break;
      case 'jio':
        if(computer[parsed[1]] === 1) i += jumpSize(parsed[2],parsed[3]) - 1;
        break;
    }
  }
  return computer;

  function jumpSize(sign,magnitude){
    var mag = parseInt(magnitude);
    return (sign === '+') ? mag : -mag;
  }
}
