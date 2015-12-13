//http://adventofcode.com/day/9

'use strict';
var fs = require('fs');
var input = fs.readFileSync('input.txt','utf8').split('\n').slice(0,-1);

var graph = createGraph(input);

//Part 1
console.log(Math.min.apply(null,allRoutes(graph)));

//Part 2
console.log(Math.max.apply(null,allRoutes(graph)));


function allRoutes(graph){
  var result = [];
  for(let origin of Object.keys(graph)){
    result = result.concat(exploreRoutes(origin,[origin]));
  }
  return result;

  function exploreRoutes(origin,visited){
    var routes = [];
    for(let dest of Object.keys(graph[origin])){
      if(visited.indexOf(dest) === -1){
        var dist = parseInt(graph[origin][dest]);
        var rest = exploreRoutes(dest,visited.concat([dest])).map(x => dist + x);
        routes = (rest.length === 0) ? routes.concat([dist]) : routes.concat(rest);
      }
    }
    return routes;
  }
}

function createGraph(distances){
  var result = {};
  for(let distance of distances){
    var parsing = distance.match(/(.*) to (.*) = (.*)/);
    var origin = parsing[1];
    var dest = parsing[2];
    var dist = parseInt(parsing[3]);
    pushData(origin,dest,dist);
    pushData(dest,origin,dist);
  }

  return result;

  function pushData(origin,dest,dist){
    if(!result[origin]){
      result[origin] = {};
    }

    result[origin][dest] = dist;
  }
}
