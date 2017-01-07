var express = require( 'express' );

/**
 * Start database models variables
 */
var ServiceModel = require( '../../models/serviceModel' );
/**
 *End database models variables
 */

/**
 * Start delete MiddleWare variables based on the various models in the database
 */
var serviceMiddleWare = require( '../../middleWare/findByIdMiddleWare' )( ServiceModel );
/**
 * End delete MiddleWare variables
 */

/**
 * Start post Controllers variables based on the various models in the database
 */

var serviceController = require( '../../controllers/serviceProvider/putServiceController' )();

/**
 * End post Controllers variables
 */


/**
 * Start module main function
 */
var putRoutes = function ( app, imageDir )
{
    //Image Upload middleware
    var imageUpload = require( '../../middleWare/imageUpload' )( imageDir )

    var serviceProiderAuth = require( '../../middleWare/serviceProviderAuth' )( app );
    /**
     * Start routes
     */
    var router = express.Router();

    router.use( serviceProiderAuth.use );

    router.use( '/putService/:_Id', imageUpload.use );
    /**
     *Start applying middleware
     */
    router.use( '/putService/:_Id', serviceMiddleWare.use );

    /**
     *End applying middleware
     */
    router.route( '/putService/:_Id' )
        .put( serviceController.put );

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = putRoutes;