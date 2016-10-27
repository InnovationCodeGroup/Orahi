var express = require( 'express' );

/**
 * Start database models variables
 */
var userModel = require( '../../models/userModel' );

/**
 *End database models variables
 */

/**
 * Start get Controllers variables based on the various models in the database
 */
var userController = require( '../../controllers/getController' )( userModel );

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


    router.route( '/getUsers' )
        .get( userController.get );

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = getRoutes;