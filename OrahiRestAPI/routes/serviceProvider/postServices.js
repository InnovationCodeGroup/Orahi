var express = require( 'express' );

/**
 * Start database models variables
 */
var ServiceModel = require( '../../models/serviceModel' );
/**
 *End database models variables
 */

/**
 * Start post Controllers variables based on the various models in the database
 */

var serviceController = require( '../../controllers/serviceProvider/postServiceController' )( ServiceModel);

/**
 * End post Controllers variables
 */

/**
 * Start module main function
 */
var postServices = function ( app )
{
    var serviceProiderAuth = require( '../../middleWare/serviceProviderAuth' )( app );
    /**
     * Start routes
     */
    var router = express.Router();

    router.use( serviceProiderAuth.use );


    router.route( '/postService' )
        .post( serviceController.post );

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = postServices;