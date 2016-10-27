var express = require( 'express' );

/**
 * Start database models variables
 */
var Admin = require( '../../models/userModel' );

/**
 *End database models variables
 */

var jwt = require('jsonwebtoken');


var adminLogin = function (app)
{
    /**
    * Start routes
    */
    var router = express.Router();


    router.post( '/authenticate', function ( req, res )
    {
        //find the user
        Admin.findOne( {
            email: req.body.email,
            admin: true
        }, function ( err, admin )
            {
                if ( err )
                    throw err;
                if ( !admin )
                {
                    res.json( { success: false, message: 'Not an administrator in this system' });
                } else if ( admin )
                {

                    //check whether the passwords matches
                    if ( admin.password != req.body.password )
                    {
                        res.json( { success: false, message: 'Incorrect password' });
                    } else
                    {
                        //if the user is found and the password is right 
                        //create token
                        var token = jwt.sign( admin, app.get( 'adminSecret' ), {
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

module.exports = adminLogin;



