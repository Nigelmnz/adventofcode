//http://adventofcode.com/day/6

var fs = require('fs');
var input = fs.readFileSync('input.txt','utf8').split('\n').slice(0,-1);

//Part 1
var litData = computeData(input,firstHandler);
console.log(Object.keys(litData).filter(x => litData[x]).length + ' lights are lit.');

//Part 2
var brightnessData = computeData(input,secondHandler);
console.log(Object.keys(brightnessData).reduce((acc,x) => {
  return acc + brightnessData[x];
},0) + ' total brightness.');

function computeData(cmds,handler){
  return cmds.reduce((acc,x) => {
    var info = parse(x);

    for(var x = info.from[0]; x <= info.to[0]; x++){
      for(var y = info.from[1]; y <= info.to[1]; y++){
        acc = handler(info.type,x,y,acc);
      }
    }

    return acc;
  },{});
}

function firstHandler(type,x,y,lights){
  var key = x + "-" + y;
  if(type === 0 || type === 2){ //turn on or off
    lights[key] = (type === 0);
  }else{ //toggle
    lights[key] = !lights[key];
  }
  return lights;
}

function secondHandler(type,x,y,lights){
  var key = x + "-" + y;
  if(lights[key] === undefined) lights[key] = 0;

  if(type === 0 || type === 2){ //bring brightness up or down on on/off
    lights[key] += (type === 0) ? 1 : -1;
    lights[key] = Math.max(lights[key],0);
  }else{ //toggle means add 2
    lights[key] += 2;
  }
  return lights;
}

function parse(phrase){
  var type = 0; //turn on
  if(phrase.includes('toggle')){
    type = 1;
  }else if(phrase.includes('turn off')){
    type = 2;
  }
  var fromCoord = phrase.match(/(\d+)/g).slice(0,2).map(x => parseInt(x,10));
  var toCoord = phrase.match(/(\d+)/g).slice(2).map(x => parseInt(x,10));
  return {type:type,from:fromCoord,to:toCoord};
}
