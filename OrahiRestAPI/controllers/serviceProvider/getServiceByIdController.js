var responses = require("../responses")();

var getByIdController = function ()
{

    var get = function ( req, res )
    {
        responses.successfulInput(req, res, value);
    }

    return {
        get: get
    }
}

module.exports = getByIdController;