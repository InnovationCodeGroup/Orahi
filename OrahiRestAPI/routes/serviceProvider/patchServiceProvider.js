var express = require( 'express' );

/**
 * Start database models variables
 */
var ServiceProviderModel = require( '../../models/serviceProviderModel' );
/**
 *End database models variables
 */

/**
 * Start delete MiddleWare variables based on the various models in the database
 */
var spMiddleWare = require( '../../middleWare/findUsingIdMiddleWare' )( ServiceProviderModel );
/**
 * End delete MiddleWare variables
 */

/**
 * Start post Controllers variables based on the various models in the database
 */

var patchSPController = require( '../../controllers/serviceProvider/patchSPController' )();

/**
 * End post Controllers variables
 */


/**
 * Start module main function
 */
var patchSPRoutes = function ( app, imageDir )
{
    //Image Upload middleware
    var imageUpload = require( '../../middleWare/imageUpload' )( imageDir )

    var serviceProviderAuth = require( '../../middleWare/serviceProviderAuth' )( app );
    /**
     * Start routes
     */
    var router = express.Router();

    router.use( serviceProviderAuth.use );

    router.use( '/patchServiceProvider', imageUpload.use );
    /**
     *Start applying middleware
     */
    router.use( '/patchServiceProvider', spMiddleWare.use );

    /**
     *End applying middleware
     */
    router.route( '/patchServiceProvider' )
        .patch( patchSPController.patch );

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = patchSPRoutes;