var responses = require("../controllers/responses")();
var findUsingIdMiddleWare = function (Value)
{
    var use = function ( req, res, next )
    {

        Value.findById( req.decoded._doc._id, function ( err, value )
        {
            if ( err )
            {
                responses.failureOutput(req, res, err);
            }
            else if ( value )
            {
                req.value = value;
                next();
            }
            else
            {
                responses.dataConflict(req, res, "No value found");
            }
        })
    }

    return {
        use: use
    }
}

module.exports = findUsingIdMiddleWare;