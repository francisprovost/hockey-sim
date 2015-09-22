var utils = require('../utils');

exports.setMotivation = function(team) {
    if (utils.randInt(0,100) < 30) {
        console.log('yep');
        for (var i = 0; i < team.length; i++) {
            var player = team[i];
            for (var i = 0; i < player.length; i++) {
                player[i] += utils.randInt(0,10);
            }
        }
    } else {
        console.log('nope');
    }

    return team;
}
