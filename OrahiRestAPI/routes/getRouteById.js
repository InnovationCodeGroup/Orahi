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
 * Start get MiddleWare variables based on the various models in the database
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
 * End get MiddleWare variables
 */

/**
 * Start get Controllers variables based on the various models in the database
 */
var bookController = require( '../controllers/getByIdController' )();
var bankController = require( '../controllers/getByIdController' )();
var emergencyServiceController = require( '../controllers/getByIdController' )();
var eventController = require( '../controllers/getByIdController' )();
var forexController = require( '../controllers/getByIdController' )();
var hotelController = require( '../controllers/getByIdController' )();
var houseController = require( '../controllers/getByIdController' )();
var mobileMoneyController = require( '../controllers/getByIdController' )();
var rentalController = require( '../controllers/getByIdController' )();
var restuarantController = require( '../controllers/getByIdController' )();
/**
 * End get Controllers variables
 */

/**
 * Start module main function
 */
var getRoutes = function ()
{

    /**
     * Start routes
     */
    var router = express.Router();

    /**
     *Start applying middleware
     */

    router.use( '/getBooks/:_Id', bookMiddleWare.use );
    router.use( '/getBanks/:_Id', bankMiddleWare.use );
    router.use( '/getEmergencyServices/:_Id', emergencyServiceMiddleWare.use );
    router.use( '/getEvents/:_Id', eventMiddleWare.use );
    router.use( '/getForexs/:_Id', forexMiddleWare.use );
    router.use( '/getHotels/:_Id', hotelMiddleWare.use );
    router.use( '/getHouses/:_Id', houseMiddleWare.use );
    router.use( '/getMobileMoneyAgents/:_Id', mobileMoneyMiddleWare.use );
    router.use( '/getRentals/:_Id', rentalMiddleWare.use );
    router.use( '/getRestaurants/:_Id', restaurantMiddleWare.use );
    /**
     *End applying middleware
     */
    router.route( '/getBooks/:_Id' )
        .get( bookController.get );

    router.route( '/getBanks/:_Id' )
        .get( bookController.get );

    router.route( '/getEmergencyServices/:_Id' )
        .get( bookController.get );

    router.route( '/getEvents/:_Id' )
        .get( bookController.get );

    router.route( '/getForexs/:_Id' )
        .get( bookController.get );

    router.route( '/getHotels/:_Id' )
        .get( bookController.get );

    router.route( '/getHouses/:_Id' )
        .get( bookController.get );

    router.route( '/getMobileMoneyAgents/:_Id' )
        .get( bookController.get );

    router.route( '/getRentals/:_Id' )
        .get( bookController.get );

    router.route( '/getRestaurants/:_Id' )
        .get( bookController.get );


    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = getRoutes;