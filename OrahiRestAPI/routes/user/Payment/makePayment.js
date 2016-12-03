var express = require( 'express' );

/**
 * Start database models variables
 */
var payment = require( '../../../models/paymentModel' );
var serviceProvider = require( '../../../models/serviceProviderModel' );

var paymentMethods = require( './paymentMethods' );

var paymentController = require( '../../../controllers/user/makePaymentController' )(payment, paymentMethods);


var makePayment = function ( app )
{
    var userAuth = require( '../../../middleWare/userAuth' )( app );
    /**
     * Start routes
     */
    var router = express.Router();

    router.use( userAuth.use );


    router.route( '/makePayment' )
        .post( paymentController.post );

    /**
      * End routes
      */

    return router;

}

module.exports = makePayment;