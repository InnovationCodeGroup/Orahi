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

var serviceController = require( '../../controllers/serviceProvider/patchServiceController' )();

/**
 * End post Controllers variables
 */


/**
 * Start module main function
 */
var patchRoutes = function ( app )
{
    var serviceProiderAuth = require( '../../middleWare/serviceProviderAuth' )( app );
    /**
     * Start routes
     */
    var router = express.Router();

    router.use( serviceProiderAuth.use );
    /**
     *Start applying middleware
     */
    router.use( '/patchService/:_Id', serviceMiddleWare.use );

    /**
     *End applying middleware
     */
    router.route( '/patchService/:_Id' )
        .patch( serviceController.patch );

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = patchRoutes;