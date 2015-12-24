//http://adventofcode.com/day/20

'use strict';
var _ = require('lodash');
var fs = require('fs');
var input = fs.readFileSync('input.txt','utf8').split('\n').slice(0,-1);
input = parseInt(input);

//Part 1
console.log(lowestWithPresents(null,10,input));

//Part 2
console.log(lowestWithPresents(50,11,input));


function lowestWithPresents(max,multi,n){
  var answer = 1;
  while(presentsAtHouse(max,multi,answer) < n){
    answer++;
  }
  return answer;
}

// Just need factors
function presentsAtHouse(max,multi,n){
  var total = 0;
  for(var i = 1; i <= Math.sqrt(n); i++){
    if(n % i === 0){
      incTotal(i);
      if((n/i) !== i) incTotal(n/i);
    }
  }

  //Makes sure that delivering to a house is within an elf's range
  function incTotal(x){
    if(!max || n/x <= max) total += multi*x;
  }
  return total;
}
