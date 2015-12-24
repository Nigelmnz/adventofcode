//http://adventofcode.com/day/18
//Experimenting with lodash!

'use strict';
var _ = require('lodash');
var fs = require('fs');
var input = fs.readFileSync('input.txt','utf8').split('\n').slice(0,-1);

//Part 1
console.log(lightsCount(nthState(input,100,false)));

//Part 2
console.log(lightsCount(nthState(input,100,true)));

function nthState(start,n,broken){
  var state = start.slice();
  if(broken) state = breakCorners(state);
  for(var i = 0; i < n; i++){
    state = nextState(state);
    if(broken) state = breakCorners(state);
  }
  return state;
}

function nextState(state){
  var result = state.map(x => x.split(''));
  for(var y = 0; y < state.length; y++){
    for(var x = 0; x < state[y].length; x++){
      var elem = state[y][x];
      var neighbors = neighborCount(y,x);
      if(neighbors === 3 || (neighbors === 2 && elem === '#')){
        result[y][x] = '#';
      }else{
        result[y][x] = '.';
      }
    }
  }

  return result.map(x => x.join(''));

  function neighborCount(cy,cx){
    var total = 0;
    for(var y = -1; y <= 1; y++){
      for(var x = -1; x <= 1; x++){
        var newx = cx + x,
            newy = cy + y;
        if ((x !== 0 || y !== 0) && state[newy] && state[newy][newx] && state[newy][newx] === "#") total++;
      }
    }
    return total;
  }
}

function breakCorners(state){
  var newstate = state.map(x => x.split(''));
  newstate[0][0] = '#';
  newstate[0][state[0].length - 1] = '#';
  newstate[state.length - 1][0] = '#';
  newstate[state.length - 1][state[0].length - 1] = '#';
  return newstate.map(x => x.join(''));
}

function lightsCount(state){
  return state.reduce((acc,x) => {
    return acc + _.filter(x,c => c === '#').length;
  },0);
}
