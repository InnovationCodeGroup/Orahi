var express = require( 'express' );

/**
 * Start database models variables
 */
var telcomModel = require( '../../models/telcomModel' );
/**
 *End database models variables
 */

/**
 * Start post Controllers variables based on the various models in the database
 */

var telcomController = require( '../../controllers/admin/telcomController' )( telcomModel);

/**
 * End post Controllers variables
 */

/**
 * Start module main function
 */
var postTelcom = function ( app )
{
    var adminAuth = require( '../../middleWare/adminAuth' )( app );
    /**
     * Start routes
     */
    var router = express.Router();

    router.use( adminAuth.use );


    router.route( '/postTelecom' )
        .post( telcomController.post );

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = postTelcom;