var process = require('./process'),
    shotEnum = require('../utils/enum').shot,
    offenseEnum = require('../utils/enum').offense;

exports.playOffense = function (offTeam, defTeam) {
    var offenseRunning = true;
    var puckCarrier = process.getNewPuckCarrier(offTeam);

    while (offenseRunning) {
        var currentEvent = process.getEvent(puckCarrier.player);

        switch (currentEvent) {
            case 0:
                var shotResult = process.processShot(puckCarrier.player, defTeam[5]);
                switch (shotResult) {
                    case shotEnum.GOAL:
                        return offenseEnum.GOAL;
                        break;
                    case shotEnum.REBOUND:
                        offenseRunning = true;
                        puckCarrier = process.processRebound(offTeam, defTeam);
                        if (!puckCarrier) {
                            return offenseEnum.COUNTER;
                        }
                        break;
                    case shotEnum.SAVE:
                        return offenseEnum.FACEOFF;
                        break;
                }
                break;
            case 1:
                offenseRunning = process.processPass(puckCarrier.player, defTeam);
                if(offenseRunning) {
                    puckCarrier = process.getNewPuckCarrier(offTeam, puckCarrier.index);
                } else {
                    return offenseEnum.COUNTER;
                }
                break;
            case 2:
                offenseRunning = process.processMove(puckCarrier.player, defTeam);
                if(!offenseRunning) {
                    return offenseEnum.COUNTER;
                }
                break;
        }
    }
}
