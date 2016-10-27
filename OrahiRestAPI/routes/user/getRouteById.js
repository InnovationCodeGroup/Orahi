var express = require( 'express' );

/**
 * Start database models variables
 */
var User = require( '../../models/userModel' );
var Book = require( '../../models/bookModel' );
var Bank = require( '../../models/bankModel' );
var EmergencyService = require( '../../models/emergencyServiceModel' );
var Events = require( '../../models/eventModel' );
var Forex = require( '../../models/forexModel' );
var Hotel = require( '../../models/hotelModel' );
var House = require( '../../models/houseModel' );
var MobileMoney = require( '../../models/mobileMoneyAgentModel' );
var Rental = require( '../../models/rentalModel' );
var Restaurant = require( '../../models/restaurantModel' );
/**
 *End database models variables
 */

/**
 * Start put MiddleWare variables based on the various models in the database
 */
var userMiddleWare = require( '../../middleWare/findByIdMiddleWare' )( User );
var bookMiddleWare = require( '../../middleWare/findByIdMiddleWare' )( Book );
var bankMiddleWare = require( '../../middleWare/findByIdMiddleWare' )( Bank );
var emergencyServiceMiddleWare = require( '../../middleWare/findByIdMiddleWare' )( EmergencyService );
var eventMiddleWare = require( '../../middleWare/findByIdMiddleWare' )( Events );
var forexMiddleWare = require( '../../middleWare/findByIdMiddleWare' )( Forex );
var hotelMiddleWare = require( '../../middleWare/findByIdMiddleWare' )( Hotel );
var houseMiddleWare = require( '../../middleWare/findByIdMiddleWare' )( House );
var mobileMoneyMiddleWare = require( '../../middleWare/findByIdMiddleWare' )( MobileMoney );
var rentalMiddleWare = require( '../../middleWare/findByIdMiddleWare' )( Rental );
var restaurantMiddleWare = require( '../../middleWare/findByIdMiddleWare' )( Restaurant );
/**
 * End put MiddleWare variables
 */


/**
 * Start get Controllers variables based on the various models in the database
 */
var userController = require( '../../controllers/getByIdController' )();
var bookController = require( '../../controllers/getByIdController' )();
var bankController = require( '../../controllers/getByIdController' )();
var emergencyServiceController = require( '../../controllers/getByIdController' )();
var eventController = require( '../../controllers/getByIdController' )();
var forexController = require( '../../controllers/getByIdController' )();
var hotelController = require( '../../controllers/getByIdController' )();
var houseController = require( '../../controllers/getByIdController' )();
var mobileMoneyController = require( '../../controllers/getByIdController' )();
var rentalController = require( '../../controllers/getByIdController' )();
var restuarantController = require( '../../controllers/getByIdController' )();
/**
 * End get Controllers variables
 */

/**
 * Start module main function
 */
var getRoutes = function ( app )
{

    var userAuth = require( '../../middleWare/userAuth' )( app );
    /**
     * Start routes
     */
    var router = express.Router();

    router.use( userAuth.use );
    /**
     *Start applying middleware
     */
    router.use( '/getUser/:_Id', userMiddleWare.use );
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

    router.route( '/getUser/:_Id' )
        .get( userController.get );

    router.route( '/getBooks/:_Id' )
        .get( bookController.get );

    router.route( '/getBanks/:_Id' )
        .get( bankController.get );

    router.route( '/getEmergencyServices/:_Id' )
        .get( emergencyServiceController.get );

    router.route( '/getEvents/:_Id' )
        .get( eventController.get );

    router.route( '/getForexs/:_Id' )
        .get( forexController.get );

    router.route( '/getHotels/:_Id' )
        .get( hotelController.get );

    router.route( '/getHouses/:_Id' )
        .get( houseController.get );

    router.route( '/getMobileMoneyAgents/:_Id' )
        .get( mobileMoneyController.get );

    router.route( '/getRentals/:_Id' )
        .get( rentalController.get );

    router.route( '/getRestaurants/:_Id' )
        .get( restuarantController.get );


    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = getRoutes;