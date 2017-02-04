var express = require( 'express' );

/**
 * Start database models variables
 */
var friendship = require( '../../../models/friendshipModel' );
/**
 *End database models variables
 */

/**
 * Start delete MiddleWare variables based on the various models in the database
 */
var friendMiddleWare = require( '../../../middleWare/findByIdMiddleWare' )( friendship );
/**
 * End delete MiddleWare variables
 */

/**
 * Start post Controllers variables based on the various models in the database
 */

var friendController = require( '../../../controllers/user/patchFriendController' )();

/**
 * End post Controllers variables
 */


/**
 * Start module main function
 */
var patchRoutes = function ( app )
{
    var userAuth = require( '../../../middleWare/userAuth' )( app );
    /**
     * Start routes
     */
    var router = express.Router();

    router.use( userAuth.use );
    /**
     *Start applying middleware
     */
    router.use( '/patchFriend/:_Id', friendMiddleWare.use );

    /**
     *End applying middleware
     */
    router.route( '/patchFriend/:_Id' )
        .patch( friendController.patch );

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = patchRoutes;