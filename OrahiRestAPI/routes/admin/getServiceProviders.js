var express = require( 'express' );

/**
 * Start database models variables
 */
var ServiceProviderModel = require( '../../models/serviceProviderModel' );

/**
 *End database models variables
 */

/**
 * Start get Controllers variables based on the various models in the database
 */
var spController = require( '../../controllers/getController' )( ServiceProviderModel );

/**
 * End get Controllers variables
 */

/**
 * Start module main function
 */
var getRoutes = function ( app )
{
    var adminAuth = require( '../../middleWare/adminAuth' )( app );
    /**
     * Start routes
     */
    var router = express.Router();

    router.use( adminAuth.use );


    router.route( '/getServiceProviders' )
        .get( spController.get );

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = getRoutes;