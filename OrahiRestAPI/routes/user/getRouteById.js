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

var serviceController = require( '../../controllers/user/getServiceByIdController' )();

/**
 * End post Controllers variables
 */

/**
 * Start module main function
 */
var getRoutes = function ( app )
{
    var userAuth = require( '../../middleWare/userAuth' )( app );
    /**
     * Start routes
     */
    var router = express.Router();

    router.use( userAuth.use );
    /**
     *Start applying middleware
     */
    router.use( '/getService/:_Id', serviceMiddleWare.use );

    /**
     *End applying middleware
     */
    router.route( '/getService/:_Id' )
        .get( serviceController.get );

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = getRoutes;