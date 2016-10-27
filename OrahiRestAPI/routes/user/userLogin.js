﻿var express = require( 'express' );

/**
 * Start database models variables
 */
var User = require( '../../models/userModel' );

/**
 *End database models variables
 */

var jwt = require('jsonwebtoken');


var userLogin = function (app)
{
    /**
    * Start routes
    */
    var router = express.Router();


    router.post( '/authenticate', function ( req, res )
    {
        //find the user
        User.findOne( {
            email: req.body.email
        }, function ( err, user )
            {
                if ( err )
                    throw err;
                if ( !user )
                {
                    res.json( { success: false, message: 'User doesnot exist' });
                } else if ( user )
                {

                    //check whether the passwords matches
                    if ( user.password != req.body.password )
                    {
                        res.json( { success: false, message: 'Incorrect password' });
                    } else
                    {
                        //if the user is found and the password is right 
                        //create token
                        var token = jwt.sign( user, app.get( 'userSecret' ), {
                            expiresIn: 1440 //expires in 24 hours
                        });

                        //return the information including token as json
                        res.json( {
                            success: true,
                            message: 'Authentication approved',
                            token: token,
                        });
                    }
                }
            });
    });

    /**
      * End routes
      */

    return router;
}

module.exports = userLogin;



