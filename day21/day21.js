//http://adventofcode.com/day/21

'use strict';
var _ = require('lodash');
var fs = require('fs');
var cmb = require('js-combinatorics');
var shopInput = fs.readFileSync('shop.txt','utf8').split('\n').slice(0,-1);

var player = {health:100,armor:0,damage:0};
var enemy = {health:100,armor:2,damage:8}; //Boss info from site
var shop = generateShop(shopInput);

//Part 1
console.log(leastGoldToWin(false));

//Part 2
console.log(leastGoldToWin(true));

function leastGoldToWin(mostToLose){
  var minGold = null;
  var maxGold = 0;

  //Pick a weapon
  for(let weapon of shop.Weapons){

    //Pick up to 1 armor
    for(let armorSelection of pickUpTo(1,shop.Armor)){

      //Pick up to 2 Rings
      for(let ringSelection of pickUpTo(2,shop.Rings)){
        var newPlayer = _.clone(player);
        var totalSpent = 0;
        //equip weapons
        totalSpent += weapon.cost;
        newPlayer = equip(newPlayer,weapon);
        //and armor
        if(armorSelection.length > 0){
          totalSpent += armorSelection[0].cost;
          newPlayer = equip(newPlayer,armorSelection[0]);
        }
        //and Rings
        for(let ring of ringSelection){
          totalSpent += ring.cost;
          newPlayer = equip(newPlayer,ring);
        }
        //Try game
        if(isWinningGame(newPlayer,enemy)){
          if(minGold){
            minGold = Math.min(minGold,totalSpent);
          }else{
            minGold = totalSpent;
          }
        }else{
          maxGold = Math.max(maxGold,totalSpent);
        }
      }
    }
  }

  return (mostToLose) ? maxGold : minGold;
}

function pickUpTo(n,arr){
  return cmb.power(arr).filter(x => x.length <= n);
}

function generateShop(data){
  var result = {Weapons:[],Armor:[],Rings:[]};
  var mode = '';
  for(let item of data){
    if(/(.*):/.test(item)){
      mode = item.match(/(.*):/)[1];
    }else if(item.length > 0){
      var parsed = item.match(/(\S*|\S*\s\S*)\s+(\d*)\s+(\d*)\s+(\d*)/).map(x => parseInt(x));
      result[mode].push({cost:parsed[2],damage:parsed[3],armor:parsed[4]});
    }
  }
  return result;
}

function isWinningGame(p1,p2){
  var heroUnit = _.clone(p1);
  var bossUnit = _.clone(p2);
  while(true){
    //Hit enemy
    attack(heroUnit,bossUnit);

    if(bossUnit.health <= 0){
      return true;
    }

    //Enemy hits back
    attack(bossUnit,heroUnit);

    if(heroUnit.health <= 0){
      return false;
    }
  }
}

function equip(unit,item){
  var newUnit = _.clone(unit);
  newUnit.damage += item.damage;
  newUnit.armor += item.armor;
  return newUnit;
}

function attack(atk,def){
  def.health -= Math.max(1,atk.damage-def.armor);
}
