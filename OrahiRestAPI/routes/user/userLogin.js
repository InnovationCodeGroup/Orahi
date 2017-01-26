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
                    responses.authenticationFailed(req, res, 'User ' + req.body.email + ' doesnot exist');
                } else if ( user )
                {

                    //check whether the passwords matches

                    user.comparePassword( req.body.password, function ( err, isMatch )
                    {
                        if (err) {
                            console.log(err);
                            responses.authenticationFailed(req, res, "Error accessing the token");
                        } else {
                            console.log('Password:', isMatch);
                            if (!isMatch) {
                                responses.authenticationFailed(req, res, 'Incorrect password');
                            }

                            user = user.toObject();
                            delete user.password;
                            delete user._id;
                            delete user.admin;
                            delete user.adminReg;
                            delete user.__v;

                            console.log(user);
                            //if the user is found and the password is right 
                            //create token
                            var token = jwt.sign(user, app.get('userSecret'), {
                                expiresIn: 10000
                                //expiresIn: 25  //expires in 24 hours
                            });


                            //return the information including token as json
                            responses.successfulLogin(req, res, "Authentication approved", user, token);
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

module.exports = userLogin;



