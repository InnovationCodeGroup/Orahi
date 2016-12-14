var responses = require("../controllers/responses")();

var findByIdMiddleWare = function (Value)
{
    var use = function ( req, res, next )
    {
        Value.findById( req.params._Id, function ( err, value )
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

module.exports = findByIdMiddleWare;