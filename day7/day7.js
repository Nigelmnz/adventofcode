//http://adventofcode.com/day/7

'use strict';
var fs = require('fs');
var input = fs.readFileSync('input.txt','utf8').split('\n').slice(0,-1);

//Part 1
var firstAnswer = solveWire('a',findWires(input),{});
console.log(firstAnswer);

//Part 2
console.log(solveWire('a',findWires(input),{b: firstAnswer}));


function findWires(instructions){
  var result = {};
  for(let instruction of instructions){
    var parsing = instruction.match(/(.+) -> (.+)/);
    var content = parsing[1];
    var target = parsing[2];
    result[target] = content;
  }
  return result;
}

function solveWire(wire,wireData,parseData){
  return solve(wireData[wire]);

  function solve(instruction){
    if(/OR|AND|LSHIFT|RSHIFT/.test(instruction)){ //Binary operators
      var capture = instruction.match(/(.+) (.+) (.+)/);
      var a = capture[1];
      var operator = capture[2];
      var b = capture[3];

      if(operator === 'OR'){
        return parse(a) | parse(b);
      }else if(operator === 'AND'){
        return parse(a) & parse(b);
      }else if(operator === 'LSHIFT'){
        return parse(a) << parse(b);
      }else if(operator === 'RSHIFT'){
        return parse(a) >> parse(b);
      }
    }else if(/NOT/.test(instruction)){ //Uniary operators
      var capture = instruction.match(/(.+) (.+)/);
      var operator = capture[1];
      var a = capture[2];

      return 65535 - parse(a);
    }else{ //Assignment
      var capture = instruction.match(/(.+)/);
      var a = capture[1];
      return parse(a);
    }
  }

  function parse(val){
    if(!parseData[val]){
      parseData[val] = (isNaN(val)) ? solve(wireData[val]) : parseInt(val);
    }
    return parseData[val];
  }
}
