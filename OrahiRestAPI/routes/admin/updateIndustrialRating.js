var express = require( 'express' );

/**
 * Start database models variables
 */
var industrialRating = require( '../../models/industrialRating' );
/**
 *End database models variables
 */

/**
 * Start delete MiddleWare variables based on the various models in the database
 */
var idustrialRatingMiddleWare = require( '../../middleWare/findByIdMiddleWare' )( industrialRating );
/**
 * End delete MiddleWare variables
 */

/**
 * Start post Controllers variables based on the various models in the database
 */

var industrialRatingController = require( '../../controllers/admin/patchIndustrialRating' )();

/**
 * End post Controllers variables
 */


/**
 * Start module main function
 */
var patchRoutes = function ( app )
{
    var adminAuth = require( '../../middleWare/adminAuth' )( app );
    /**
     * Start routes
     */
    var router = express.Router();

    router.use( adminAuth.use );
    /**
     *Start applying middleware
     */
    router.use( '/updateIndustrialRating/:_Id', idustrialRatingMiddleWare.use );

    /**
     *End applying middleware
     */
    router.route( '/updateIndustrialRating/:_Id' )
        .patch( industrialRatingController.patch );

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = patchRoutes;