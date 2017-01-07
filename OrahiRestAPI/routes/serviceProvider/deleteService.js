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

var serviceController = require( '../../controllers/serviceProvider/deleteServiceController' )();

/**
 * End post Controllers variables
 */


/**
 * Start module main function
 */
var deleteRoutes = function ( app )
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
    router.use( '/deleteService/:_Id', serviceMiddleWare.use );

    /**
     *End applying middleware
     */
    router.route( '/deleteService/:_Id' )
        .delete( serviceController.del );

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = deleteRoutes;