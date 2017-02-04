var express = require( 'express' );

/**
 * Start database models variables
 */
var friendship = require( '../../../models/friendshipModel' );
/**
 *End database models variables
 */

/**
 * Start post Controllers variables based on the various models in the database
 */

var followController = require( '../../../controllers/user/followController' )( friendship );

/**
 * End post Controllers variables
 */

/**
 * Start module main function
 */
var postServices = function ( app )
{
    var userAuth = require( '../../../middleWare/userAuth' )( app );
    /**
     * Start routes
     */
    var router = express.Router();

    router.use( userAuth.use );


    router.route( '/follow' )
        .post( followController.post );

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = postServices;