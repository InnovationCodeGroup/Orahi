var express = require( 'express' );

/**
 * Start database models variables
 */

var Book = require( '../models/bookModel' );
var Bank = require( '../models/bankModel' );
var EmergencyService = require( '../models/emergencyServiceModel' );
var Events = require( '../models/eventModel' );
var Forex = require( '../models/forexModel' );
var Hotel = require( '../models/hotelModel' );
var House = require( '../models/houseModel' );
var MobileMoney = require( '../models/mobileMoneyAgentModel' );
var Rental = require( '../models/rentalModel' );
var Restaurant = require( '../models/restaurantModel' );
/**
 *End database models variables
 */

/**
 * Start post Controllers variables based on the various models in the database
 */

var bookController = require( '../controllers/postController' )( Book );
var bankController = require( '../controllers/postController' )( Bank );
var emergencyServiceController = require( '../controllers/postController' )( EmergencyService );
var eventController = require( '../controllers/postController' )( Events );
var forexController = require( '../controllers/postController' )( Forex );
var hotelController = require( '../controllers/postController' )( Hotel );
var houseController = require( '../controllers/postController' )( House );
var mobileMoneyController = require( '../controllers/postController' )( MobileMoney );
var rentalController = require( '../controllers/postController' )( Rental );
var restuarantController = require( '../controllers/postController' )( Restaurant );
/**
 * End post Controllers variables
 */

/**
 * Start module main function
 */
var postRoutes = function ( app )
{
    var serviceProiderAuth = require( '../middleWare/serviceProiderAuth' )( app );
    /**
     * Start routes
     */
    var router = express.Router();

    router.use( serviceProiderAuth.use );

    router.route( '/postBooks' )
        .post( bookController.post );

    router.route( '/postBanks' )
        .post( bankController.post );

    router.route( '/postEmergencyServices' )
        .post( emergencyServiceController.post );

    router.route( '/postEvents' )
        .post( eventController.post );

    router.route( '/postForexs' )
        .post( forexController.post );

    router.route( '/postHotels' )
        .post( hotelController.post );

    router.route( '/postHouses' )
        .post( houseController.post );

    router.route( '/postMobileMoneyAgents' )
        .post( mobileMoneyController.post );

    router.route( '/postRentals' )
        .post( rentalController.post );

    router.route( '/postRestaurants' )
        .post( restuarantController.post );


    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = postRoutes;