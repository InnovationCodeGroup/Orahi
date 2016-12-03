var express = require( 'express' );

/**
 * Start database models variables
 */
var userModel = require( '../../../models/userModel' );

/**
 *End database models variables
 */

/**
 * Start get Controllers variables based on the various models in the database
 */
var userController = require( '../../../controllers/user/singleUserController' )( userModel );

/**
 * End get Controllers variables
 */

/**
 * Start module main function
 */
var getRoutes = function ( app )
{
    var userAuth = require( '../../../middleWare/userAuth' )( app );
    /**
     * Start routes
     */
    var router = express.Router();

    router.use( userAuth.use );


    router.route( '/getUser' )
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