var express = require( 'express' );

/**
 * Start database models variables
 */
var ServiceProviderModel = require( '../../models/serviceProviderModel' );

/**
 *End database models variables
 */

/**
 * Start post Controllers variables based on the various models in the database
 */

var spController = require( '../../controllers/serviceProvider/postSPController' )( ServiceProviderModel );
 
/**
 * End post Controllers variables
 */

/**
 * Start module main function
 */
var postRoutes = function ( app )
{
    /**
     * Start routes
     */
    var router = express.Router();

    router.route( '/registerServiceProvider' )
        .post( spController.post );

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = postRoutes;