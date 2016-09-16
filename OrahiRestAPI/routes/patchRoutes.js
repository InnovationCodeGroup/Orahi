var express = require( 'express' );

/**
 * Start database models variables
 */
var Book = require( '../models/bookModel' );
//var Bank = require( '../models/bankModel' );
//var EmergencyService = require( '../models/emergencyServiceModel' );
//var Event = require( '../models/eventModel' );
//var Forex = require( '../models/forexModel' );
//var Hotel = require( '../models/hotelModel' );
//var House = require( '../models/houseModel' );
//var MobileMoney = require( '../models/mobileMoneyAgentModel' );
//var Rental = require( '../models/rentalModel' );
//var Restaurant = require( '../models/restaurantModel' );
/**
 *End database models variables
 */

/**
 * Start patch MiddleWare variables based on the various models in the database
 */
var bookMiddleWare = require( '../middleWare/findByIdMiddleWare' )( Book );
var bankMiddleWare = require( '../middleWare/findByIdMiddleWare' )( Book );
var emergencyServiceMiddleWare = require( '../middleWare/findByIdMiddleWare' )( Book );
var eventMiddleWare = require( '../middleWare/findByIdMiddleWare' )( Book );
var forexMiddleWare = require( '../middleWare/findByIdMiddleWare' )( Book );
var hotelMiddleWare = require( '../middleWare/findByIdMiddleWare' )( Book );
var houseMiddleWare = require( '../middleWare/findByIdMiddleWare' )( Book );
var mobileMoneyMiddleWare = require( '../middleWare/findByIdMiddleWare' )( Book );
var rentalMiddleWare = require( '../middleWare/findByIdMiddleWare' )( Book );
var restaurantMiddleWare = require( '../middleWare/findByIdMiddleWare' )( Book );
/**
 * End patch MiddleWare variables
 */

/**
 * Start patch Controllers variables based on the various models in the database
 */
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
var patchRoutes = function ()
{

    /**
     * Start routes
     */
    var router = express.Router();

    /**
     *Start applying middleware
     */

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
    router.route( '/patchBooks/:_Id' )
        .patch( bookController.patch );

    router.route( '/patchBanks/:_Id' )
        .patch( bookController.patch );

    router.route( '/patchEmergencyServices/:_Id' )
        .patch( bookController.patch );

    router.route( '/patchEvents/:_Id' )
        .patch( bookController.patch );

    router.route( '/patchForexs/:_Id' )
        .patch( bookController.patch );

    router.route( '/patchHotels/:_Id' )
        .patch( bookController.patch );

    router.route( '/patchHouses/:_Id' )
        .patch( bookController.patch );

    router.route( '/patchMobileMoneyAgents/:_Id' )
        .patch( bookController.patch );

    router.route( '/patchRentals/:_Id' )
        .patch( bookController.patch );

    router.route( '/patchRestaurants/:_Id' )
        .patch( bookController.patch );


    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = patchRoutes;