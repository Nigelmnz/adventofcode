//http://adventofcode.com/day/14
//Experimenting with Ramda!

'use strict';
var R = require('ramda');
var fs = require('fs');
var input = fs.readFileSync('input.txt','utf8').split('\n').slice(0,-1);

var parser = R.match(/(.*) can fly (\d*) km\/s for (\d*) seconds, but then must rest for (\d*) seconds./);

var distanceMoved = function(time,speed,stamina,rest){
  var cycleTime = stamina + rest;
  var cycles = Math.floor(time / cycleTime);
  var currentProgress = R.min(stamina, time % cycleTime) / stamina;
  return speed * stamina * (cycles + currentProgress);
}

var distancesAfterTime = function(time){
  return R.map((str) => {
    var parsed = R.map((x) => parseInt(x),parser(str));
    return distanceMoved(time,parsed[2],parsed[3],parsed[4]);
  },input);
}

var bestAfterTime = function(time){
  return R.reduce(R.max,0,distancesAfterTime(time));
}

var pointsAfterTime = function(time){
  var times = R.addIndex(R.map)((x,i) => i+1, R.repeat(0,time));
  var pointsAtTime = (time) => {
    var best = bestAfterTime(time);
    return R.map((x) => (x === best) ? 1 : 0,distancesAfterTime(time));
  }
  var pointsForAllTimes = R.map(pointsAtTime,times)
  return R.reduce(R.zipWith((x,y) => x + y),R.repeat(0,input.length),pointsForAllTimes);
}

var bestPointsAfterTime = function(time){
  return R.reduce(R.max,0,pointsAfterTime(time));
}

//Part 1
console.log(bestAfterTime(2503));

//Part 2
console.log(bestPointsAfterTime(2503));
