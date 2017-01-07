var responses = require("../responses")();

var getByIdController = function () {
    var get = function (req, res) {
        responses.successfulOutput(req, res, req.value);
    }

    return {
        get: get
    }
}

module.exports = getByIdController;