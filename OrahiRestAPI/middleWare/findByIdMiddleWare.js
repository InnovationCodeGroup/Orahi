var findByIdMiddleWare = function (Value)
{
    var use = function ( req, res, next )
    {
        Value.findById( req.params._Id, function ( err, value )
        {
            if ( err )
            {
                res.status( 500 );
                send( err );
            }
            else if ( value )
            {
                req.value = value;
                next();
            }
            else
            {
                res.status( 500 );
                send( 'No value found' );
            }
        })
    }

    return {
        use: use
    }
}

module.exports = findByIdMiddleWare;