var getController = function (Value)
{
    var get = function ( req, res )
    {
        var query = {};
        if ( req.query.serviceType )
        {
            query.serviceType = req.query.serviceType;
        }
        if ( req.query.serviceProvider )
        {
            query.serviceProvider = req.query.serviceProvider;
        }
        Value.find(query, function ( err, values )
        {
            if ( err )
            {
                res.status( 500 );
                res.send( err );
            }
            else
                res.json( values );
        })

    }

    return {
        get: get
    }
}

module.exports = getController;