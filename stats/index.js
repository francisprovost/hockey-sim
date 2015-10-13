var events = require('events');
var eventEmitter;


var currentgame,
    homeGoal = 0,
    awayGoal = 0,
    shots = 0;

var addGoalEvent = function (isHomeGoal) {

    if (isHomeGoal) {
        homeGoal++;
    } else {
        awayGoal++;
    }
}

var addShot = function () {
    shots++;
}

var print = function() {
    var str =  "HOME GOAL = " + homeGoal +
            "\nAWAY GOAL = " + awayGoal +
            "\nTotal shots = " + shots;

    console.log(str);
}

var setListener = function () {

    eventEmitter.on('goal', addGoalEvent);
    eventEmitter.on('printGame', print);
    eventEmitter.on('shot', addShot);
}

exports.getEvents = function () {
    if(!eventEmitter) {
        eventEmitter = new events.EventEmitter();
        setListener();
    }

    return eventEmitter;
}

exports.getGame = function() {
    //
    // if (!currentgame)
    // eventEmitter.on('goal', addGoalEvent);
    // eventEmitter.on('printGame', print);
    // eventEmitter.on('shot', addShot);
    //
    // return eventEmitter;
}
