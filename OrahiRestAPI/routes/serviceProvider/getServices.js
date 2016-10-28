var express = require( 'express' );

/**
 * Start database models variables
 */
var ServiceModel = require( '../../models/serviceModel' );

/**
 *End database models variables
 */

/**
 * Start get Controllers variables based on the various models in the database
 */
var servicesController = require( '../../controllers/serviceProvider/getServicesController' )( ServiceModel );


/**
 * End get Controllers variables
 */

/**
 * Start module main function
 */
var getRoutes = function ( app )
{
    var serviceProiderAuth = require( '../../middleWare/serviceProviderAuth' )( app );
    /**
     * Start routes
     */
    var router = express.Router();

    router.use( serviceProiderAuth.use );

    router.route( '/getServices' )
        .get( servicesController.get );
 

   /**
     * End routes
     */

    return router;
}

/**
 * End module main function
 */
module.exports = getRoutes;