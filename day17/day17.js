//http://adventofcode.com/day/17
//Experimenting with lodash!

'use strict';
var _ = require('lodash');
var cmb = require('js-combinatorics');
var fs = require('fs');
var input = fs.readFileSync('input.txt','utf8').split('\n').slice(0,-1).map(x => parseInt(x));

//Part 1
console.log(exactFits(150,input));

//Part 2
console.log(minFits(150,input,0));

function exactFits(liters,containers){
  if(liters === 0){
    return 1;
  }else if(containers.length === 0 || liters < 0){
    return 0;
  }else{
    return exactFits(liters - containers[0],containers.slice(1)) + exactFits(liters,containers.slice(1));
  }
}

function minFits(liters,containers,used){
  if(liters === 0){
    return used;
  }else if(containers.length === 0 || liters < 0){
    return input.length;
  }else{
    return Math.min(
      minFits(liters - containers[0],containers.slice(1),used + 1),
      minFits(liters,containers.slice(1),used)
    );
  }
}
