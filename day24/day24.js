//http://adventofcode.com/day/24

'use strict';
var _ = require('lodash');
var cmb = require('js-combinatorics');
var fs = require('fs');
var input = fs.readFileSync('input.txt','utf8').split('\n').slice(0,-1).map(x => parseInt(x));

//Part 1
console.log(bestGrouping(input,3));

//Part 2
console.log(bestGrouping(input,4));

function bestGrouping(lst,parts){
  for(var i = 0; i < lst.length; i++){
    //Gather all combos that have sums equal to the max each pile can have
    var candidates = cmb.combination(lst,i).toArray().filter(c => _.sum(c) === _.sum(lst)/parts);
    for(let combo of candidates){
      //Look for equal splits. If we don't have two piles, check if every other gift can be split into n-1 even piles
      if(parts === 2 || bestGrouping(_.difference(lst,combo),parts-1)){
        return _.min(candidates.map(entanglement));
      }
    }
  }
  return false;
}

function entanglement(group){
  return group.reduce((acc,x) => acc*x);
}
