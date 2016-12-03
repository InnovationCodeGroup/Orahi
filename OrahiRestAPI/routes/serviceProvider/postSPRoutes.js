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
var postRoutes = function ( imageDir )
{
    //Image Upload middleware
    var imageUpload = require( '../../middleWare/imageUpload' )( imageDir )
    

    /**
     * Start routes
     */
    var router = express.Router();

    router.use( '/registerServiceProvider', imageUpload.use );

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