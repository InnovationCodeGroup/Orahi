var responses = require("../responses")();
var getController = function (Value)
{
    var get = function ( req, res )
    {
        var query = {};
        if ( req.query.email )
        {
            query.email = req.query.email;
        }
        if ( req.query.userName )
        {
            query.userName = req.query.userName;
        }
        Value.find(query, function ( err, value )
        {
            if (err) {
                responses.failureOutput(req, res, err);
            }
            else {
                responses.successfulOutput(req, res, value);
            }
        })

    }

    return {
        get: get
    }
}

module.exports = getController;