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
 * Start patch MiddleWare variables based on the various models in the database
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
 * End patch MiddleWare variables
 */

/**
 * Start patch Controllers variables based on the various models in the database
 */
var userController = require( '../controllers/patchController' )();
var bookController = require( '../controllers/patchController' )();
var bankController = require( '../controllers/patchController' )();
var emergencyServiceController = require( '../controllers/patchController' )();
var eventController = require( '../controllers/patchController' )();
var forexController = require( '../controllers/patchController' )();
var hotelController = require( '../controllers/patchController' )();
var houseController = require( '../controllers/patchController' )();
var mobileMoneyController = require( '../controllers/patchController' )();
var rentalController = require( '../controllers/patchController' )();
var restuarantController = require( '../controllers/patchController' )();
/**
 * End patch Controllers variables
 */

/**
 * Start module main function
 */
var patchRoutes = function ( app )
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
    router.use( '/patchUser/:_Id', userMiddleWare.use );
    router.use( '/patchBooks/:_Id', bookMiddleWare.use );
    router.use( '/patchBanks/:_Id', bankMiddleWare.use );
    router.use( '/patchEmergencyServices/:_Id', emergencyServiceMiddleWare.use );
    router.use( '/patchEvents/:_Id', eventMiddleWare.use );
    router.use( '/patchForexs/:_Id', forexMiddleWare.use );
    router.use( '/patchHotels/:_Id', hotelMiddleWare.use );
    router.use( '/patchHouses/:_Id', houseMiddleWare.use );
    router.use( '/patchMobileMoneyAgents/:_Id', mobileMoneyMiddleWare.use );
    router.use( '/patchRentals/:_Id', rentalMiddleWare.use );
    router.use( '/patchRestaurants/:_Id', restaurantMiddleWare.use );
    /**
     *End applying middleware
     */

    router.route( '/patchUser/:_Id' )
        .patch( userController.patch );

    router.route( '/patchBooks/:_Id' )
        .patch( bookController.patch );

    router.route( '/patchBanks/:_Id' )
        .patch( bankController.patch );

    router.route( '/patchEmergencyServices/:_Id' )
        .patch( emergencyServiceController.patch );

    router.route( '/patchEvents/:_Id' )
        .patch( eventController.patch );

    router.route( '/patchForexs/:_Id' )
        .patch( forexController.patch );

    router.route( '/patchHotels/:_Id' )
        .patch( hotelController.patch );

    router.route( '/patchHouses/:_Id' )
        .patch( houseController.patch );

    router.route( '/patchMobileMoneyAgents/:_Id' )
        .patch( mobileMoneyController.patch );

    router.route( '/patchRentals/:_Id' )
        .patch( rentalController.patch );

    router.route( '/patchRestaurants/:_Id' )
        .patch( restuarantController.patch );


    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = patchRoutes;