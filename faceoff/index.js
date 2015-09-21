var utils = require('../utils');

exports.process = function (homeCenter, awayCenter) {
    return (homeCenter[9] * utils.randDec(1,2) > awayCenter[9] * utils.randDec(1,2));
}
