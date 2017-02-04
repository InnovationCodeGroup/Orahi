var express = require( 'express' );

/**
 * Start database models variables
 */
var User = require( '../../models/userModel' );

/**
 *End database models variables
 */




/**
 * Start module main function
 */
var postRoutes = function ( imageDir )
{

    //Image Upload middleware
    var imageUpload = require( '../../middleWare/imageUpload' )( imageDir )

    /**
     * Start routes
     */
    var router = express.Router();

    router.use( '/registerUser', imageUpload.use );

    router.post( '/registerUser', function ( req, res )
    {
        User.findOne( { email: req.body.email }, function ( err, user )
        {
            if ( err )
            {
                res.status( 500 );
                send( err );
            }
            else if ( user )
            {
                res.json( { Success: false, message: 'User already exists' });
            } else if ( !user )
            {
                User.findOne( { userName: req.body.userName }, function ( err, user )
                {
                    if ( err )
                    {
                        res.status( 500 );
                        send( err );
                    }
                    else if ( user )
                    {
                        res.json( { Success: false, message: 'UserName already exists' });
                    }
                    else if ( !user )
                    {
                        var user = new User( req.body );
                        user.save( function ( err )
                        {
                            if ( err )
                            {
                                res.status( 500 );
                                res.send( err );
                            }
                            else
                            {
                                res.status( 201 );
                                res.json( user );
                            }
                        });
                    }
                });                 
            }
        });
    });
    //router.route( '/registerUser' )
    //    .post( userController.post );

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = postRoutes;