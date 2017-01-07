var express = require( 'express' );

/**
 * Start database models variables
 */
var UserModel = require( '../../models/userModel' );
/**
 *End database models variables
 */

/**
 * Start delete MiddleWare variables based on the various models in the database
 */
var userMiddleWare = require( '../../middleWare/findUsingIdMiddleWare' )( UserModel );
/**
 * End delete MiddleWare variables
 */

/**
 * Start post Controllers variables based on the various models in the database
 */

var patchUserController = require( '../../controllers/user/patchUserController' )();

/**
 * End post Controllers variables
 */


/**
 * Start module main function
 */
var patchUserRoutes = function ( app, imageDir )
{
    //Image Upload middleware
    var imageUpload = require( '../../middleWare/imageUpload' )( imageDir )

    var userAuth = require( '../../middleWare/userAuth' )( app );
    /**
     * Start routes
     */
    var router = express.Router();

    router.use( userAuth.use );

    router.use( '/patchUser', imageUpload.use );
    /**
     *Start applying middleware
     */
    router.use( '/patchUser', userMiddleWare.use );

    /**
     *End applying middleware
     */
    router.route( '/patchUser' )
        .patch( patchUserController.patch );

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = patchUserRoutes;