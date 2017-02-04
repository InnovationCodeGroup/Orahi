var express = require( 'express' );

/**
 * Start database models variables
 */
var Admin = require( '../../models/userModel' );

/**
 *End database models variables
 */

var jwt = require('jsonwebtoken');
var responses = require("../../controllers/responses")();


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
            adminReg: true,
            admin: true
        }, function ( err, admin )
            {
                if ( err )
                    throw err;
                if ( !admin )
                {
                    responses.authenticationFailed(req, res, "Not an administrator in this system");
                } else if ( admin )
                {

                    //check whether the passwords matches

                    admin.comparePassword( req.body.password, function ( err, isMatch )
                    {
                        if ( err ) throw err;

                        console.log( 'Password:', isMatch );
                        if (!isMatch) {
                            responses.authenticationFailed(req, res, "Incorrect password");
                        } else {
                            //if the user is found and the password is right 
                            //create token
                            var token = jwt.sign(admin, app.get('adminSecret'), {
                                expiresIn: 10000 //expires in 24 hours
                            });

                            //return the information including token as json
                            responses.authenticationApproved(req, res, "Authentication approved", token);
                        }
                    });
                }
            });
    });

    /**
      * End routes
      */

    return router;
}

module.exports = adminLogin;



