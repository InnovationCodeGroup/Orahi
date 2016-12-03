var getController = function (Value)
{
    var get = function ( req, res )
    {
        var query = {};
        if ( req.query.email || req.query.userName )
        {
            query.email = req.query.email;
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
        }
        

    }

    return {
        get: get
    }
}

module.exports = getController;