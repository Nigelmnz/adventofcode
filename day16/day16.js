//http://adventofcode.com/day/16
//Experimenting with lodash!

'use strict';
var _ = require('lodash');
var fs = require('fs');
var input = fs.readFileSync('input.txt','utf8').split('\n').slice(0,-1);
var known = fs.readFileSync('known.txt','utf8');

//Part 1
console.log(findAunt(true));

//Part 2
console.log(findAunt(false));

function findAunt(certain){
  var critera = known.match(/(.*): (.*)/g);
  var aunts = input.slice();

  _.forEach(critera,(c) => {
    var item = c.match(/(.*):/)[1];
    var count = parseInt(c.match(/: (\d*)/)[1]);

    _.remove(aunts, (aunt) => {
      if(certain) return _.contains(aunt,item) && !_.contains(aunt,c);

      if(_.contains(aunt,item)){
        var auntCount = parseInt(aunt.match(new RegExp(item + ': (\\d*)'))[1]);
        if(/cats|trees/.test(item)){
          return auntCount <= count;
        }else if(/pomeranians|goldfish/.test(item)){
          return auntCount >= count;
        }else{
          return !_.contains(aunt,c);
        }
      }else{
        return false;
      }
    });

  });

  return aunts;
}
