//http://adventofcode.com/day/3

var fs = require('fs');
var input = fs.readFileSync('input.txt','utf8').split('').slice(0,-1);

//Part 1
console.log(deliveredHomes(input,1) + ' homes delivered to.');

//Part 2
console.log(deliveredHomes(input,2) + ' homes delivered to with robo-santa.');

function deliveredHomes(data,santas){
  //Split the data into N paths, one for each santa
  var splitPaths = data.reduce((paths,dir,i) => {
    (paths[i%santas]) ? paths[i%santas].push(dir) : paths[i%santas] = [dir];
    return paths;
  }, []);

  //Turn each path into a position history
  var splitPositions = splitPaths.map(santaPositions);

  //Condense the histories
  var condensedPositions = splitPositions.reduce((result, xs) => {
    return result.concat(xs);
  }, []);

  //Generate a frequency map from the histories
  var positionFrequencies = condensedPositions.reduce((freq, pos) => {
    var key = pos[0] + "x" + pos[1];
    (freq[pos]) ? freq[pos] += 1 : freq[pos] = 1;
    return freq;
  }, {});

  return Object.keys(positionFrequencies).length;
}

function santaPositions(directions){
  var vectors = santaVectors(directions);
  return vectors.reduce((positions,cur) => {
    var lastPos = positions.slice(-1)[0];
    var nextPos = addVecs(lastPos,cur);
    return positions.concat([nextPos]);
  },[[0,0]]);
}

function santaVectors(directions){
  var dirs = ['^','>','v','<'];
  return directions.map((x) => {
    var dir = dirs.indexOf(x);
    return [[0,1],[1,0],[0,-1],[-1,0]][dir];
  });
}

function addVecs(a,b){
  return [a[0] + b[0], a[1] + b[1]];
}
