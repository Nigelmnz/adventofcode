//http://adventofcode.com/day/25

'use strict';

//Part 1 & 2
console.log(nthCode(getN(2947,3029),20151125));

function getN(r,c){
  var start = 1;
  for(var i = 1; i < r; i++){
    start += i;
  }

  for(var j = 1; j < c; j++){
    start += i + j;
  }
  return start;
}

function nthCode(n,start){
  var result = start;
  for(var i = 1; i < n; i++){
    result = nextCode(result);
  }
  return result;
}

function nextCode(a){
  return (a*252533)%33554393;
}
