//http://adventofcode.com/day/1

var fs = require('fs');
var input = fs.readFileSync('input.txt','utf8').split('').slice(0,-1);

//Part 1
console.log("Santa's Depth: " + input.reduce((acc,x) => {
  return acc + ((x === '(') ? 1 : -1);
},0));

//Part 2
console.log("Entered -1: " + firstNegative(input));

function firstNegative(data){
  for (var i = 0, depth = 0; i < input.length; i++) {
    if(depth === -1){
      return i;
    }
    depth += ((input[i] === '(') ? 1 : -1);
  }
  return -1;
}
