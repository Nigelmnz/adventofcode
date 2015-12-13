//http://adventofcode.com/day/13

'use strict';
var fs = require('fs');
var input = fs.readFileSync('input.txt','utf8').split('\n').slice(0,-1);

//Part1
var table = generateHappyTable(input);
console.log(findBestSeating(table));

//Part2
addPerson(table,'Me',0);
console.log(findBestSeating(table));


function findBestSeating(dataTable){
  return findMax([]);

  function findMax(build){
    if(build.length === Object.keys(dataTable).length){
      return processSeating(build);
    }else{
      var max = 0;
      for(let subject of Object.keys(dataTable)){
        if(build.indexOf(subject) === -1){
          max = Math.max(max,findMax(build.concat([subject])))
        }
      }
      return max;
    }
  }

  function processSeating(seating){
    return seating.map((subject,i) => {
      var next = (i < seating.length - 1) ? seating[i+1] : seating[0];
      var behind = (i > 0) ? seating[i-1] : seating[seating.length - 1];
      return dataTable[subject][next] + dataTable[subject][behind];
    }).reduce((acc,x) => {return acc + x},0);
  }
}

function addPerson(dataTable,name,delta){
  dataTable[name] = {};
  for(let subject of Object.keys(dataTable).slice(0,-1)){
    dataTable[subject][name] = 0;
    dataTable[name][subject] = 0;
  }
  return dataTable;
}

function generateHappyTable(data){
  var result = {};

  for(let seating of data){
      var parse = seating.match(/(.*) would (gain|lose) (\d*) happiness units by sitting next to (.*)./);
      var subject = parse[1];
      var unit = parseInt(parse[3]);
      var delta = (parse[2] === 'gain') ? unit : -unit;
      var target = parse[4];

      if(!result[subject]){
        result[subject] = {};
      }
      result[subject][target] = delta;
  }
  return result;
}
