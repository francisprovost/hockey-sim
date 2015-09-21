var homeGoal = 0,
    awayGoal = 0,
    shots = 0;

exports.addGoal = function(isHomeGoal) {
    if (isHomeGoal) {
        homeGoal++;
    } else {
        awayGoal++;
    }
}

exports.addShot = function () {
    shots++;
}

exports.print = function() {
    return "HOME GOAL = " + homeGoal +
            "\nAWAY GOAL = " + awayGoal +
            "\nTotal shots = " + shots;
}
