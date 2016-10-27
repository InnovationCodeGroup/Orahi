var postController = function ( Value )
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
                res.json( { Success: false, message: 'Service Provider already exists' });
            }
            else if ( !value )
            {
                var value = new Value( req.body );

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
        });
    }

    return {
        post: post
    }
}

module.exports = postController;