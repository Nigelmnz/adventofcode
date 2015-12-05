//http://adventofcode.com/day/2

var fs = require('fs');
var input = fs.readFileSync('input.txt','utf8').split('\n').filter((x) => x.length > 0);

var answer = compute(input);
//Part 1
console.log(answer[0] + " square feet of wrapping paper needed.");

//Part 2
console.log(answer[1] + " feet of ribbon needed.");

function compute(data){
  return data.reduce((acc,x) => {
      var parsed = x.split('x');
      var l = parsed[0];
      var w = parsed[1];
      var h = parsed[2];

      var surfaceArea = 2*l*w + 2*w*h + 2*h*l;
      var slack = Math.min(l*w,w*h,h*l);
      var paperNeeded = acc[0] + surfaceArea + slack;

      var volume = l*w*h;
      var smallestParim = 2*l + 2*w + 2*h - Math.max(2*l,2*w,2*h);
      var ribbonNeeded = acc[1] + volume + smallestParim;

      return [paperNeeded,ribbonNeeded];
  },[0,0]);
}
