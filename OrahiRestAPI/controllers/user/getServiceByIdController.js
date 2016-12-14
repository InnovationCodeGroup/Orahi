var responses = require("../responses")();

var getByIdController = function ()
{
    var get = function ( req, res )
    {
        responses.successfulOutput(req.value);
    }

    return {
        get: get
    }
}

module.exports = getByIdController;