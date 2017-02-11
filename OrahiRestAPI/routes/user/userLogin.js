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
        console.log(req.body);
        var query = {};
        if (req.body.email) {
            query.email = req.body.email;
        } else if (req.body.userName) {
            query.userName = req.body.userName;
        } else {
            query.userName = "with no values provided"
        }
        //find the user
        User.findOne(query, function (err, user)
        {
            if (err)
                responses.consoleFailure(err);
            if ( !user )
            {
                if (query.email) {
                    responses.authenticationFailed(req, res, 'User ' + query.email + ' does not exist');
                } else{
                    responses.authenticationFailed(req, res, 'User ' + query.userName + ' does not exist');
                }         
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
                        } else {

                            //if the user is found and the password is right 
                            //create token
                            var token = jwt.sign(user, app.get('userSecret'), {
                                expiresIn: 10000
                                //expiresIn: 25  //expires in 24 hours
                            });

                            var value = user.toObject();
                            delete value.password;
                            delete value.admin;
                            delete value.adminReg;
                            delete value.__v;

                            //return the information including token as json
                            responses.successfulLogin(req, res, "Authentication approved", value, token);
                        }
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



