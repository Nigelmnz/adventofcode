//http://adventofcode.com/day/22

'use strict';
var _ = require('lodash');
var fs = require('fs');
var enemyInput = fs.readFileSync('input.txt','utf8').split('\n').slice(0,-1);
var player = {'Hit Points':50, mana:500, baseArmor:0, armorMod:0, effects:[]};
var enemy  = parseEnemy(enemyInput);
var spellCosts = [53,73,113,173,229];

//Part 1
console.log(minManaToWin(player,enemy,false));

//Part 2
console.log(minManaToWin(player,enemy,true));


function minManaToWin(p1,p2,hard){
  var hero = _.cloneDeep(p1);
  var boss = _.cloneDeep(p2);

  var results = [];
  var legalMoves = [0,1,2,3,4];

  //Start turn
  manageTurnStart(hero,boss,hard,true);

  //Check for a win or loss
  if(checkDeath(hero,boss)) return (hero['Hit Points'] <= 0) ? null : 0;

  //Determine legal moves
  _.remove(legalMoves, x => {
    return _.contains(hero.effects.map(x => x.type),x) || spellCosts[x] > hero.mana
  });

  //Select a move
  for(let move of legalMoves){
    var moveHero = _.cloneDeep(hero);
    var moveBoss = _.cloneDeep(boss);

    //Try move
    castSpell(move,moveHero,moveBoss);
    var cost = spellCosts[move];
    if(moveBoss['Hit Points'] <= 0){
      //Note mana used
      results.push(cost);
      continue;
    }

    //Start boss turn
    manageTurnStart(moveHero,moveBoss,hard,false);
    if(moveBoss['Hit Points'] <= 0){
      //Note mana used
      results.push(cost);
      continue;
    }

    //Let boss hit you
    attack(moveBoss,moveHero);

    //If still alive
    if(moveHero['Hit Points'] > 0){
      //Move to next iteration
      var minManaFromHere = minManaToWin(moveHero,moveBoss,hard);
      if(minManaFromHere) results.push(cost + minManaFromHere);
      continue;
    }

  }

  return (results.length > 0) ? _.min(results) : null;
}

function checkDeath(atk,def){
  return atk['Hit Points'] <= 0 || def['Hit Points'] <= 0;
}


function castSpell(spell,atk,def){
  //Use mana
  atk.mana -= spellCosts[spell];

  if(spell === 0){ //Magic Missile
    def['Hit Points'] -= 4;
  }else if(spell === 1){ //Drain
    def['Hit Points'] -= 2;
    atk['Hit Points'] += 2;
  }else if(spell === 2){ //Shield
    castEffect(spell,6,atk);
  }else if(spell === 3){ //Poison
    castEffect(spell,6,atk);
  }else if(spell === 4){ //Recharge
    castEffect(spell,5,atk);
  }
}

function castEffect(effect,duration,caster){
  caster.effects.push({type:effect,timer:duration});
}

function manageTurnStart(atk,def,hard,isPlayer){
  //Hard mode
  if(hard && isPlayer) atk['Hit Points'] -= 1;

  //Stop mods
  atk.armorMod = 0;

  //Perform effects on player
  for(let effect of atk.effects){
    handleEffect(effect.type,atk,def);
    effect.timer -= 1;
  }
  //Prune effects
  _.remove(atk.effects, x => x.timer <= 0);
}

function handleEffect(effect,atk,def){
  if(effect === 2){ //Shield Effect
    atk.armorMod += 7;
  }else if(effect === 3){//Poison Effect
    def['Hit Points'] -= 3;
  }else if(effect === 4){//Recharge Effect
    atk.mana += 101;
  }
}

function attack(atk,def){
  def['Hit Points'] -= Math.max(1,atk.Damage-(def.baseArmor+def.armorMod));
}

function parseEnemy(data){
  var result = {};

  for(let stat of data){
    var parsed = stat.match(/(.*): (\d*)/);
    result[parsed[1]] = parseInt(parsed[2]);
  }

  return result;
}
