var express = require( 'express' );

/**
 * Start database models variables
 */
var logsModel = require( '../../models/logsModel' );
var friends = require( '../../models/friendshipModel' );

/**
 *End database models variables
 */

/**
 * Start get Controllers variables based on the various models in the database
 */
var logsController = require( '../../controllers/user/logsController' )( logsModel, friends );

/**
 * End get Controllers variables
 */

/**
 * Start module main function
 */
var getLogs = function ( app )
{
    var userAuth = require( '../../middleWare/userAuth' )( app );
    /**
     * Start routes
     */
    var router = express.Router();

    router.use( userAuth.use );


    router.route( '/getLogs' )
        .get( logsController.get );

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = getLogs;