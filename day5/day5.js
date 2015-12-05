//http://adventofcode.com/day/5

var fs = require('fs');
var input = fs.readFileSync('input.txt','utf8').split('\n').slice(0,-1);

//Part 1
console.log(input.filter(isNiceFirst).length);

//Part 2
console.log(input.filter(isNiceSecond).length);

function isNiceFirst(str){
  var vowels = str.match(/[aeiou]/gi);
  var hasDouble = /(.)\1/.test(str);
  var avoidsBad = !/(ab)|(cd)|(pq)|(xy)/.test(str);

  return vowels && vowels.length >= 3 && hasDouble && avoidsBad;
}

function isNiceSecond(str){
  var hasPairs = /(.{2}).*\1/.test(str);
  var hasTween = /(.).{1}\1/.test(str);

  return hasPairs && hasTween;
}
