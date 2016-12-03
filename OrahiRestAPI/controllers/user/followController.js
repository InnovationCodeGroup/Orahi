var followController = function ( Value )
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
                        res.json( { success: false, message: 'Already following user' });
                    } else if ( resultLength === 0 )
                    {
                        value.save( function ( err )
                        {
                            if ( err )
                            {
                                res.status( 500 );
                                res.send( err );
                            }
                            else
                            {
                                res.status( 201 );
                                res.json( value );
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