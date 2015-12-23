//http://adventofcode.com/day/15
//Experimenting with lodash!

'use strict';
var _ = require('lodash');
var fs = require('fs');
var input = fs.readFileSync('input.txt','utf8').split('\n').slice(0,-1);
var db = makeIngredientDB(input);

//Part 1
console.log(bestPossibleScore(100));

//Part2
console.log(bestPossibleWithCalories(500,100));

function bestPossibleScore(teaspoons){
  var portions = possiblePortions(input.length,teaspoons);
  return portions.reduce((acc,x) => {
    return Math.max(scoreCookie(x)[0],acc);
  },0);
}

function bestPossibleWithCalories(calories,teaspoons){
  var portions = possiblePortions(input.length,teaspoons);
  return portions.reduce((acc,x) => {
    return (scoreCookie(x)[1] === calories) ? Math.max(scoreCookie(x)[0],acc) : acc;
  },0);
}

function possiblePortions(degree,remaining){
  var result = [];
  if(degree <= 1){
    result = [[remaining]];
  }else{
    for(var i = 0; i <= remaining; i++){
      var rest = possiblePortions(degree-1,remaining-i);
      result = result.concat(rest.map((x) => [i].concat(x)))
    }
  }
  return result;
}

//Returns: [score,calories]
function scoreCookie(portions){
  var totals = _.reduce(db,(acc,props,i) => {
    var subscore = _.map(props,(x) => portions[i]*x);
    return _.zipWith(acc,subscore,_.add);
  },[0,0,0,0,0]).map(x => (x < 0) ? 0 : x);

  return [_.reduce(totals.slice(0,-1),(acc,i) => acc * i),totals[4]];
}

function makeIngredientDB(data){
  var result = [];
  for(var i = 0; i < data.length; i++){
    var matches = data[i].match(/capacity (.*), durability (.*), flavor (.*), texture (.*), calories (.*)/).slice(1);
    result.push( _.map(matches,(x) => isNaN(x) ? x : parseInt(x)));
  }
  return result;
}
