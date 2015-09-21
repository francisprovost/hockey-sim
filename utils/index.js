exports.randInt = function (min, max){
    return Math.floor((Math.random() * max) + min);
}

exports.randDec = function (min, max) {
    return (Math.random() * (max - 1)) + min;
}
