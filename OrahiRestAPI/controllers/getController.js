var getController = function (Value)
{
    var get = function ( req, res )
    {
        Value.find(function ( err, values )
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