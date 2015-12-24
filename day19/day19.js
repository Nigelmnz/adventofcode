//http://adventofcode.com/day/19
//Experimenting with lodash!

'use strict';
var _ = require('lodash');
var fs = require('fs');
var input = fs.readFileSync('input.txt','utf8').split('\n').slice(0,-1);

//Part 1
var grammar = genGrammar(input);
var target = _.last(input);
console.log(possibleChanges(target).length);

//Part 2
console.log(reduceMolecule(target));

function reduceMolecule(molecule){
  var progress = molecule.slice();
  var steps = 0;
  while(progress !== 'e'){
    for(let key of _.keys(grammar)){
      for(let val of grammar[key]){
        if(_.contains(progress,val)){
          if(key !== 'e' || progress.replace(val,key) === 'e'){
            progress = progress.replace(val,key);
            steps++;
          }
        }
      }
    }
  }
  return steps;

}

function possibleChanges(start){
  var result = [];
  var startSections = start.match(/([A-Z][a-z]*|e)/g);
  _.forEach(startSections,(section,i) => {
    _.forEach(grammar,(targets,base) => {
      if(base === section){
        _.forEach(targets,(target) => {
          var replacement = startSections.slice();
          replacement[i] = target;
          result.push(replacement.join(''));
        });
      }
    });
  });
  return _.uniq(result);
}

function genGrammar(data){
  var result = {};
  _.forEach(data.slice(0,-2),(g) => {
    var parsed = g.match(/(.*) => (.*)/);
    var base = parsed[1],
        target = parsed[2];

    if(result[base]){
      result[base].push(target)
    }else{
      result[base] = [target];
    }
  });
  return result;
}
