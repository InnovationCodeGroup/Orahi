var responses = require("../responses")();
var getController = function (Value)
{
    var get = function ( req, res )
    {
        var query = {};
        if ( req.query.email || req.query.userName )
        {
            query.email = req.query.email;
            Value.find( query, function ( err, value )
            {
                if (err) {
                    responses.failureOutput(req, res, err);
                }
                else {
                    responses.successfulOutput(req, res, value);
                }
            })
        }
        

    }

    return {
        get: get
    }
}

module.exports = getController;