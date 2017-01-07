var express = require( 'express' );

/**
 * Start database models variables
 */
var serviceProviderModel = require( '../../models/serviceProviderModel' );

/**
 *End database models variables
 */

/**
 * Start get Controllers variables based on the various models in the database
 */
var servicesController = require( '../../controllers/user/getServicesAllgo' )( serviceProviderModel );

/**
 * End get Controllers variables
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


    router.route( '/getServiceProviders' )
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