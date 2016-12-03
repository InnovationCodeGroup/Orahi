var express = require( 'express' );

/**
 * Start database models variables
 */
var industrialRating = require( '../../models/industrialRating' );
/**
 *End database models variables
 */

/**
 * Start post Controllers variables based on the various models in the database
 */

var industrialRatingController = require( '../../controllers/admin/industrialRatingController' )( industrialRating );

/**
 * End post Controllers variables
 */

/**
 * Start module main function
 */
var postIndustrialRating = function ( app )
{
    var adminAuth = require( '../../middleWare/adminAuth' )( app );
    /**
     * Start routes
     */
    var router = express.Router();

    router.use( adminAuth.use );


    router.route( '/industrialRating' )
        .post( industrialRatingController.post );

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = postIndustrialRating;