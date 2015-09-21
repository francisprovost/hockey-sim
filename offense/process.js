var utils = require('../utils'),
    self = require('./process'),
    stats = require('../stats'),
    offenseEnum = require('../enum').offense,
    shotEnum = require('../enum').shot;


var getShotResult = function(player, keeper) {
    var shotLocation = utils.randInt(0, 2);

    if(player[0] * utils.randDec(1,1.3) > keeper[shotLocation] * utils.randDec(1.3,2.2)) {
        return shotEnum.GOAL;
    } else {

        if(utils.randInt(0,100) > keeper[9]) {
            return shotEnum.REBOUND;
        } else {
            return shotEnum.SAVE;
        }

    }
}

exports.getEvent = function (player) {

    var max = player[0] * utils.randDec(1,1.6);
    var maxIndex = 0;

    for (var i = 1; i < 3; i++) {
        var currentValue = player[i] * utils.randDec(1,3/i);
        if (currentValue > max) {
            maxIndex = i;
            max = currentValue;
        }
    }

    return maxIndex;
}

exports.processShot = function(player, keeper) {
    stats.addShot();
    return getShotResult(player, keeper)
}

exports.processPass = function(player, defTeam) {
    var posAvg,
        posSum = 0;

    for (var i = 0; i < defTeam.length - 1; i++) {
        var defender = defTeam[i];
        posSum += defender[5];
    }

    posAvg = posSum / (defTeam.length - 1);

    return (player[5] * utils.randDec(1,2) > posAvg * utils.randDec(1,1.4));
}

exports.processMove = function(player, defTeam) {
    var sum = 0,
        avg,
        playerSum = player[2] + player[6];

    for (var i = 0; i < defTeam.length - 1; i++) {
        var defender = defTeam[i];
        sum += (defender[5] + defender[6]);
    }
    avg = sum / (defTeam.length - 1);

    return (playerSum * utils.randDec(1,2) > avg * utils.randDec(1,1.7));
}

exports.getNewPuckCarrier = function(team, currentIdx) {

    var playerIdx = utils.randInt(0,4);
    if(currentIdx && playerIdx === currentIdx) {
        return self.getNewPuckCarrier(team, currentIdx);
    }
    return {
        "index": playerIdx,
        "player": team[playerIdx]
    };
}
