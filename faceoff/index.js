var utils = require('../utils');

exports.process = function (homeCenter, awayCenter) {
    return (homeCenter[9] * utils.randDec(1,3) > awayCenter[9] * utils.randDec(1,3));
}
