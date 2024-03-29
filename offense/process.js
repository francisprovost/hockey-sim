var utils = require('../utils'),
    self = require('./process'),
    stats = require('../stats').getEvents(),
    offenseEnum = require('../utils/enum').offense,
    shotEnum = require('../utils/enum').shot;


var getShotResult = function(player, keeper) {
    var shotLocation = utils.randInt(0, 2);

    if(player[0] * utils.randDec(1,1.3) > keeper[shotLocation] * utils.randDec(1.3,2.8)) {
        return shotEnum.GOAL;
    } else {

        if(utils.randInt(0,100) > keeper[9]) {
            return shotEnum.REBOUND;
        } else {
            return shotEnum.SAVE;
        }

    }
}

var getTeamStatAvg = function (team, statsIdx) {

    var sum = 0;

    for (var i = 0; i < team.length - 1; i++) {
        var defender = team[i];
        sum += defender[statsIdx];
    }

    return sum / (team.length - 1);
}

exports.getEvent = function (player) {

    var max = player[0] * utils.randDec(1,1.4);
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
    stats.emit('shot');
    return getShotResult(player, keeper)
}

exports.processPass = function(player, defTeam) {
    var posAvg = getTeamStatAvg(defTeam, 5);

    return (player[5] * utils.randDec(1,5) > posAvg * utils.randDec(1,4));
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

    return (playerSum * utils.randDec(1,6) > avg * utils.randDec(1,4.5));
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

exports.processRebound = function (offTeam, defTeam) {
    var posDefAvg = getTeamStatAvg(defTeam, 5),
        chkOffAvf = getTeamStatAvg(offTeam, 4);

    if (chkOffAvf * utils.randDec(1,1.4) > posDefAvg * utils.randDec(1,1.6)) {
        return self.getNewPuckCarrier(offTeam);
    } else {
        return null;
    }
}
