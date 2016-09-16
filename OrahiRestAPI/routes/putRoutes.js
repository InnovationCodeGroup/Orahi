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
 * Start put MiddleWare variables based on the various models in the database
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
 * End put MiddleWare variables
 */

/**
 * Start put Controllers variables based on the various models in the database
 */
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
var putRoutes = function ()
{

    /**
     * Start routes
     */
    var router = express.Router();

    /**
     *Start applying middleware
     */

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
    router.route( '/putBooks/:_Id' )
        .put( bookController.put );

    router.route( '/putBanks/:_Id' )
        .put( bookController.put );

    router.route( '/putEmergencyServices/:_Id' )
        .put( bookController.put );

    router.route( '/putEvents/:_Id' )
        .put( bookController.put );

    router.route( '/putForexs/:_Id' )
        .put( bookController.put );

    router.route( '/putHotels/:_Id' )
        .put( bookController.put );

    router.route( '/putHouses/:_Id' )
        .put( bookController.put );

    router.route( '/putMobileMoneyAgents/:_Id' )
        .put( bookController.put );

    router.route( '/putRentals/:_Id' )
        .put( bookController.put );

    router.route( '/putRestaurants/:_Id' )
        .put( bookController.put );


    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = putRoutes;