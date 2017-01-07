var express = require( 'express' );

/**
 * Start database models variables
 */
var telcomModel = require( '../../models/telcomModel' );

/**
 *End database models variables
 */

/**
 * Start get Controllers variables based on the various models in the database
 */
var telecomController = require( '../../controllers/admin/getController' )( telcomModel );

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


    router.route( '/getTelecoms' )
        .get( telecomController.get );

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = getRoutes;