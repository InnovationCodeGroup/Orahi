var getController = function ( Value )
{
    var get = function ( req, res )
    {

        var query = {};
        if ( req.query.serviceProvider )
        {
            query.serviceProvider = req.query.serviceProvider;
            Value.find( query, function ( err, values )
            {
                if ( err )
                {
                    res.status( 500 );
                    res.send( err );
                }
                else
                    res.json( values );
            })
        } else
        {
            res.json( {"activity":"failure", "message":"No service provider given"} );
        }
        

    }

    return {
        get: get
    }
}

module.exports = getController;