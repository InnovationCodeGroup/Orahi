var express = require( 'express' );

/**
 * Start database models variables
 */
var User = require( '../models/userModel' );
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
 * Start put MiddleWare variables based on the various models in the database
 */
var userMiddleWare = require( '../middleWare/findByIdMiddleWare' )( User );
var bookMiddleWare = require( '../middleWare/findByIdMiddleWare' )( Book );
var bankMiddleWare = require( '../middleWare/findByIdMiddleWare' )( Bank );
var emergencyServiceMiddleWare = require( '../middleWare/findByIdMiddleWare' )( EmergencyService );
var eventMiddleWare = require( '../middleWare/findByIdMiddleWare' )( Events );
var forexMiddleWare = require( '../middleWare/findByIdMiddleWare' )( Forex );
var hotelMiddleWare = require( '../middleWare/findByIdMiddleWare' )( Hotel );
var houseMiddleWare = require( '../middleWare/findByIdMiddleWare' )( House );
var mobileMoneyMiddleWare = require( '../middleWare/findByIdMiddleWare' )( MobileMoney );
var rentalMiddleWare = require( '../middleWare/findByIdMiddleWare' )( Rental );
var restaurantMiddleWare = require( '../middleWare/findByIdMiddleWare' )( Restaurant );
/**
 * End put MiddleWare variables
 */

/**
 * Start put Controllers variables based on the various models in the database
 */
var userController = require( '../controllers/putController' )();
var bookController = require( '../controllers/putController' )();
var bankController = require( '../controllers/putController' )();
var emergencyServiceController = require( '../controllers/putController' )();
var eventController = require( '../controllers/putController' )();
var forexController = require( '../controllers/putController' )();
var hotelController = require( '../controllers/putController' )();
var houseController = require( '../controllers/putController' )();
var mobileMoneyController = require( '../controllers/putController' )();
var rentalController = require( '../controllers/putController' )();
var restuarantController = require( '../controllers/putController' )();
/**
 * End put Controllers variables
 */

/**
 * Start module main function
 */
var putRoutes = function ( app )
{
    //var serviceProiderAuth = require( '../middleWare/serviceProiderAuth' )( app );
    /**
     * Start routes
     */
    var router = express.Router();

    //router.use( serviceProiderAuth.use );
    /**
     *Start applying middleware
     */
    router.use( '/putUser/:_Id', userMiddleWare.use );
    router.use( '/putBooks/:_Id', bookMiddleWare.use );
    router.use( '/putBanks/:_Id', bankMiddleWare.use );
    router.use( '/putEmergencyServices/:_Id', emergencyServiceMiddleWare.use );
    router.use( '/putEvents/:_Id', eventMiddleWare.use );
    router.use( '/putForexs/:_Id', forexMiddleWare.use );
    router.use( '/putHotels/:_Id', hotelMiddleWare.use );
    router.use( '/putHouses/:_Id', houseMiddleWare.use );
    router.use( '/putMobileMoneyAgents/:_Id', mobileMoneyMiddleWare.use );
    router.use( '/putRentals/:_Id', rentalMiddleWare.use );
    router.use( '/putRestaurants/:_Id', restaurantMiddleWare.use );
    /**
     *End applying middleware
     */

    router.route( '/putUser/:_Id' )
        .put( userController.put );

    router.route( '/putBooks/:_Id' )
        .put( bookController.put );

    router.route( '/putBanks/:_Id' )
        .put( bankController.put );

    router.route( '/putEmergencyServices/:_Id' )
        .put( emergencyServiceController.put );

    router.route( '/putEvents/:_Id' )
        .put( eventController.put );

    router.route( '/putForexs/:_Id' )
        .put( forexController.put );

    router.route( '/putHotels/:_Id' )
        .put( hotelController.put );

    router.route( '/putHouses/:_Id' )
        .put( houseController.put );

    router.route( '/putMobileMoneyAgents/:_Id' )
        .put( mobileMoneyController.put );

    router.route( '/putRentals/:_Id' )
        .put( rentalController.put );

    router.route( '/putRestaurants/:_Id' )
        .put( restuarantController.put );


    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = putRoutes;