var responses = require("../responses")();

var followController = function (Value)
{
    var post = function ( req, res )
    {

        var value = new Value( req.body );
        value.userId = req.decoded._doc._id;

        Value.find( {
            userId: value.userId,
            friendId: value.friendId
        }, function ( err, result )
            {
                if ( err )
                {
                    throw err;
                } else
                {
                    var resultLength = Object.keys( result ).length;
                    if ( resultLength != 0 )
                    {
                        responses.dataConflict(req, res, "Already following user");
                    } else if ( resultLength === 0 )
                    {
                        value.save( function ( err )
                        {
                            if ( err )
                            {
                                responses.failureOutput(req, res, err);
                            }
                            else
                            {
                                response.successfulOutput(req, res, value);
                            }
                        })
                    }
                }
            })
    }

    return {
        post: post
    }
}

module.exports = followController;