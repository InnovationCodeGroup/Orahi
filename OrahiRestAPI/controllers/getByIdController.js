var getByIdController = function ( Value )
{
    var get = function ( req, res )
    {
        Value.findById( req.params._Id, function ( err, value )
        {
            if ( err )
            {
                res.status( 500 );
                send( err );
            }
            else
                res.json( value );
        })


    }

    return {
        get: get
    }
}

module.exports = getByIdController;