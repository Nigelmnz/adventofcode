//http://adventofcode.com/day/12
'use strict';
var fs = require('fs');
var input = JSON.parse(fs.readFileSync('input.txt','utf8'));

//Part1
console.log(dataSum(input,true));

//Part2
console.log(dataSum(input,false));

function dataSum(data,ignoreRed){
  var sum = 0;
  if(typeof data === 'object'){
    var hasRed = false;
    var tempSum = 0;
    for(let id of Object.keys(data)){
      if(!Array.isArray(data) && data[id] === 'red') hasRed = true;
      tempSum += dataSum(data[id],ignoreRed);
    }
    if(ignoreRed || !hasRed) sum += tempSum;
  }else if(typeof data === 'number'){
    sum = data;
  }
  return sum;
}
