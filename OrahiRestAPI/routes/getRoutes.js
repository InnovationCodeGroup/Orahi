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
 * Start get Controllers variables based on the various models in the database
 */
var bookController = require( '../controllers/getController' )( Book );
var bankController = require( '../controllers/getController' )( Book );
var emergencyServiceController = require( '../controllers/getController' )( Book );
var eventController = require( '../controllers/getController' )( Book );
var forexController = require( '../controllers/getController' )( Book );
var hotelController = require( '../controllers/getController' )( Book );
var houseController = require( '../controllers/getController' )( Book );
var mobileMoneyController = require( '../controllers/getController' )( Book );
var rentalController = require( '../controllers/getController' )( Book );
var restuarantController = require( '../controllers/getController' )( Book );
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

    router.route( '/getBooks' )
        .get( bookController.get );

    router.route( '/getBanks' )
        .get( bookController.get );

    router.route( '/getEmergencyServices' )
        .get( bookController.get );

    router.route( '/getEvents' )
        .get( bookController.get );

    router.route( '/getForexs' )
        .get( bookController.get );

    router.route( '/getHotels' )
        .get( bookController.get );

    router.route( '/getHouses' )
        .get( bookController.get );

    router.route( '/getMobileMoneyAgents' )
        .get( bookController.get );

    router.route( '/getRentals' )
        .get( bookController.get );

    router.route( '/getRestaurants' )
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