var findUserByEmail = function ( Value )
{
    var userExists = false;
    var use = function ( req, res, next )
    {
        Value.findOne( {email: req.body.email}, function ( err, value )
        {
            if ( err )
            {
                res.status( 500 );
                send( err );
            }
            else if ( value )
            {
                userExists = true;
                req.value = value;
                next();
            }
            else
            {
                res.status( 500 );
                send( 'No book found' );
            }
        })
    }

    return {
        use: use,
        userExists: userExists
    }
}

module.exports = findUserByEmail;