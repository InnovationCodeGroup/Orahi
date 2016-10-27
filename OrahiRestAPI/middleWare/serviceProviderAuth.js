﻿var jwt = require( 'jsonwebtoken' );

var serviceProviderAuth = function ( app )
{

    var use = function ( req, res, next )
    {
        //check header or url parameters or post parameters foe token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        //decode token
        if ( token )
        {
            //verifies secret and checks exp
            jwt.verify( token, app.get( 'serviceProviderSecret' ), function ( err, decoded )
            {
                if ( err ) { return res.json( { success: false, message: 'Failed to authenticate token' }) }
                else
                {
                    //save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }

            })
        } else
        {
            //if there is no token
            //return an error
            return res.status( 403 ).send( {
                success: false,
                message: 'No token provided'
            })
        }
    }

    return { use: use }

}

module.exports = serviceProviderAuth;