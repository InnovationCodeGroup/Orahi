var responses = require("../controllers/responses")();

var findUserByEmail = function (Value)
{
    var userExists = false;
    var use = function ( req, res, next )
    {
        Value.findOne( {email: req.body.email}, function ( err, value )
        {
            if ( err )
            {
                responses.failureOutput(req, res, err);
            }
            else if ( value )
            {
                userExists = true;
                req.value = value;
                next();
            }
            else
            {
                responses.dataConflict(req, res, "No user with the email " + req.body.email + "found");
            }
        })
    }

    return {
        use: use,
        userExists: userExists
    }
}

module.exports = findUserByEmail;