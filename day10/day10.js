//http://adventofcode.com/day/10
var input = '3113322113';

//Part1
console.log(lookAndSay(input,40).length);

//Part1
console.log(lookAndSay(input,50).length);


function lookAndSay(start,n){
  var result = start;
  for(var i = 0; i < n; i++){
    result = stepFoward(result);
  }
  return result;
}

function stepFoward(seq){
  var result = '';
  var temp = '';
  
  for(var i = 0; i < seq.length; i++){
    var char = seq[i];
    if(temp.length > 0 && temp[0] !== char){
      result += (temp.length + temp[0]);
      temp = char;
    }else{
      temp += char;
    }
  }

  if(temp.length > 0){
    result += (temp.length + temp[0]);
  }

  return result;
}
