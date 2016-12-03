var industrialRatingController = function ( Value )
{
    var post = function ( req, res )
    {
        Value.find( { serviceProviderId: req.body.serviceProviderId }, function ( err, result )
        {
            if ( err )
            {
                res.status( 500 );
                res.send( err );
            }
            var resultLength = Object.keys( result ).length;
            if ( resultLength != 0 )
            {
                res.json( { success: false, message: 'Service Provider rating already exists' });
            }
            else if ( resultLength === 0 )
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
        })

    }

    return {
        post: post
    }
}

module.exports = industrialRatingController;