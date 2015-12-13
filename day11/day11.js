//http://adventofcode.com/day/11
'use strict';
var input = 'hepxcrrq';

//Part1
var first = nextPass(input);
console.log(first);

//Part2
console.log(nextPass(first));


function nextPass(pass){
  var newpass = pass;
  do{
    newpass = incrementPass(newpass);
  }while(!isValid(newpass));

  return newpass;
}

function isValid(pass){
  var hasDouble = /(.)\1.?(.)\2/g.test(pass);
  var avoidsBad = !/[iol]/g.test(pass);
  return hasDouble && avoidsBad && hasStraight(pass);
}

function hasStraight(str){
  if(str.length > 3){
    return hasStraight(str.slice(0,3)) || hasStraight(str.slice(1));
  }else if(str.length === 3){
    return (str[0].charCodeAt() + 1 === str[1].charCodeAt()) && (str[1].charCodeAt() + 1 === str[2].charCodeAt())
  }else{
    return false;
  }
}

function incrementPass(pass){
  var base = pass.slice(0,-1);
  var last = pass[pass.length - 1];
  if(last === 'z'){
    return incrementPass(base) + 'a';
  }else if(pass.length > 0){
    return base + String.fromCharCode(last.charCodeAt() + 1);
  }else{
    return '';
  }
}
