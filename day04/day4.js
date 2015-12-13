//http://adventofcode.com/day/4

var crypto = require('crypto');
var input = 'iwrupvqb';

//Part 1
console.log("Part 1: " + findSolution(input,'00000'));

//Part 2
console.log("Part 2: " + findSolution(input,'000000'));

function findSolution(key,target){
  var result = 0;
  var targetHit = false;
  while(!targetHit){
    var attempt = crypto.createHash('md5').update(key + result).digest('hex').slice(0,target.length) + '';
    targetHit = attempt === target;
    result++;
  }
  return result;
}
