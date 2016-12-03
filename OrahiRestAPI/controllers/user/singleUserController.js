var getController = function (Value)
{
    var get = function ( req, res )
    {
        var query = {};
        if ( req.query.email )
        {
            query.email = req.query.email;
        }
        if ( req.query.userName )
        {
            query.userName = req.query.userName;
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