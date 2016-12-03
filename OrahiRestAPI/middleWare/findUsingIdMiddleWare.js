var findUsingIdMiddleWare = function (Value)
{
    var use = function ( req, res, next )
    {

        Value.findById( req.decoded._doc._id, function ( err, value )
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
                res.send( 'No value found' );
            }
        })
    }

    return {
        use: use
    }
}

module.exports = findUsingIdMiddleWare;