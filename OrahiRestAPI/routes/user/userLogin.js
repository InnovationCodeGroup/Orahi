var express = require( 'express' );

/**
 * Start database models variables
 */
var User = require( '../../models/userModel' );

/**
 *End database models variables
 */

var jwt = require('jsonwebtoken');
var responses = require("../../controllers/responses")();


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
                    responses.authenticationFailed(req, res, 'User doesnot exist' );
                } else if ( user )
                {

                    //check whether the passwords matches

                    user.comparePassword( req.body.password, function ( err, isMatch )
                    {
                        if ( err ) throw err;
                        
                        console.log( 'Password:', isMatch );
                        if ( !isMatch )
                        {
                            responses.authenticationFailed(req, res, 'Incorrect password' );
                        }
                        //if the user is found and the password is right 
                        //create token
                        var token = jwt.sign( user, app.get( 'userSecret' ), {
                            expiresIn: 10000 //expires in 24 hours
                        });

                        //return the information including token as json
                        responses.authenticationApproved(req, res, "Authentication approved", token);
                    });
                }                
            });
    });

    /**
      * End routes
      */

    return router;
}

module.exports = userLogin;



