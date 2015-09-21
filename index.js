var offense = require("./offense"),
    offenseEnum = require('./utils/enum').offense
    stats = require('./stats')
    faceoff = require('./faceoff');
var awayTeam = [
    [98,91,91,76,77,78,91,94,73,68,76,84,93,77,82],//off
    [82,76,74,72,76,93,70,71,74,75,59,69,77,80,75],//off
    [95,75,76,77,78,93,90,91,76,67,78,78,82,82,81],//off
    [89,99,98,79,76,80,88,99,64,74,78,75,95,78,83],//def
    [72,77,75,76,77,66,78,78,85,48,64,69,74,73,73],//def
    [79,78,79,79,79,78,79,73,81,79,65,79,78,78,78]//keeper
],
homeTeam = [
    [94,75,81,81,81,77,77,97,86,81,87,69,83,79,82],//off
    [99,84,87,73,97,75,86,77,74,69,68,71,90,81,79],//off
    [90,78,79,79,74,80,79,69,72,82,74,73,82,77,78],//off
    [80,81,90,85,84,99,85,93,78,89,71,68,83,89,85],//def
    [78,75,78,78,76,73,78,69,72,48,64,71,77,75,74],//def
    [81,81,81,81,81,81,80,72,80,79,87,79,81,81,81]//keeper
],
homeTeamInOff = true;

var loop = 0;
while (loop <= 200) {
    var offenseResult;
    if(homeTeamInOff) {
        offenseResult = offense.playOffense(homeTeam, awayTeam);
    } else {
        offenseResult = offense.playOffense(awayTeam, homeTeam);
    }

    switch (offenseResult) {
        case offenseEnum.COUNTER:
            homeTeamInOff != homeTeamInOff;
            break;
        case offenseEnum.GOAL:
            stats.addGoal(homeTeamInOff);
        default:
            homeTeamInOff = faceoff.process(homeTeam[2], awayTeam[0]);
    }

    loop++;
}

console.log(stats.print());
