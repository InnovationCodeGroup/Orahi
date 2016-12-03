var express = require( 'express' );

/**
 * Start database models variables
 */
var serviceProvider = require( '../../models/serviceProviderModel' );

/**
 *End database models variables
 */

var jwt = require( 'jsonwebtoken' );


var spLogin = function ( app )
{
    /**
    * Start routes
    */
    var router = express.Router();


    router.post( '/authenticate', function ( req, res )
    {
        //find the user
        serviceProvider.findOne( {
            email: req.body.email
        }, function ( err, sp )
            {
                if ( err )
                    throw err;
                if ( !sp )
                {
                    res.json( { success: false, message: 'Service Provider doesnot exist' });
                } else if ( sp )
                {

                    //check whether the passwords matches
                    sp.comparePassword( req.body.password, function ( err, isMatch )
                    {
                        if ( err ) throw err;

                        console.log( 'Password:', isMatch );
                        if ( !isMatch )
                        {
                            res.json( { success: false, message: 'Incorrect password' });
                        }
                        //if the user is found and the password is right 
                        //create token
                        var token = jwt.sign( sp, app.get( 'serviceProviderSecret' ), {
                            expiresIn: 10000 //expires in 24 hours
                        });

                        //return the information including token as json
                        res.json( {
                            success: true,
                            message: 'Authentication approved',
                            token: token,
                        });

                    });
                }
            });
    });

    /**
      * End routes
      */

    return router;
}

module.exports = spLogin;



