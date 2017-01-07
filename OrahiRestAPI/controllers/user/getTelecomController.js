var responses = require("../responses")();
var getController = function (Value)
{
    var get = function ( req, res )
    {

        var query = {};
        
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

    return {
        get: get
    }
}

module.exports = getController;