var responses = require("../responses")();

var postController = function (Value)
{
    var post = function ( req, res )
    {
        Value.findOne( { email: req.body.email }, function ( err, value )
        {
            if ( err )
            {
                res.status( 500 );
                send( err );
            }
            else if ( value )
            {
                responses.dataConflict(req, res, "Service Provider already exists");
            }
            else if ( !value )
            {
                var value = new Value( req.body );

                value.save( function ( err )
                {
                    if ( err )
                    {
                        responses.failureInput(req, res, err);
                    }
                    else
                    {
                        responses.successfulInput(req, res, "Service Provider saved");
                    }
                })
            }
        });
    }

    return {
        post: post
    }
}

module.exports = postController;