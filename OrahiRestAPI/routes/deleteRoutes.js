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
 * Start delete MiddleWare variables based on the various models in the database
 */
var userMiddleWare = require( '../middleWare/findByIdMiddleWare' )( User );
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
 * End delete MiddleWare variables
 */

/**
 * Start delete Controllers variables based on the various models in the database
 */
var userController = require( '../controllers/deleteController' )();
var bookController = require( '../controllers/deleteController' )();
var bankController = require( '../controllers/deleteController' )();
var emergencyServiceController = require( '../controllers/deleteController' )();
var eventController = require( '../controllers/deleteController' )();
var forexController = require( '../controllers/deleteController' )();
var hotelController = require( '../controllers/deleteController' )();
var houseController = require( '../controllers/deleteController' )();
var mobileMoneyController = require( '../controllers/deleteController' )();
var rentalController = require( '../controllers/deleteController' )();
var restuarantController = require( '../controllers/deleteController' )();
/**
 * End delete Controllers variables
 */

/**
 * Start module main function
 */
var deleteRoutes = function ( app )
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
    router.use( '/deleteUser/:_Id', userMiddleWare.use );
    router.use( '/deleteBooks/:_Id', bookMiddleWare.use );
    router.use( '/deleteBanks/:_Id', bankMiddleWare.use );
    router.use( '/deleteEmergencyServices/:_Id', emergencyServiceMiddleWare.use );
    router.use( '/deleteEvents/:_Id', eventMiddleWare.use );
    router.use( '/deleteForexs/:_Id', forexMiddleWare.use );
    router.use( '/deleteHotels/:_Id', hotelMiddleWare.use );
    router.use( '/deleteHouses/:_Id', houseMiddleWare.use );
    router.use( '/deleteMobileMoneyAgents/:_Id', mobileMoneyMiddleWare.use );
    router.use( '/deleteRentals/:_Id', rentalMiddleWare.use );
    router.use( '/deleteRestaurants/:_Id', restaurantMiddleWare.use );
    /**
     *End applying middleware
     */
    router.route( '/deleteUser/:_Id' )
        .delete( bookController.del );

    router.route( '/deleteBooks/:_Id' )
        .delete( bookController.del );

    router.route( '/deleteBanks/:_Id' )
        .delete( bookController.del );

    router.route( '/deleteEmergencyServices/:_Id' )
        .delete( bookController.del );

    router.route( '/deleteEvents/:_Id' )
        .delete( bookController.del );

    router.route( '/deleteForexs/:_Id' )
        .delete( bookController.del );

    router.route( '/deleteHotels/:_Id' )
        .delete( bookController.del );

    router.route( '/deleteHouses/:_Id' )
        .delete( bookController.del );

    router.route( '/deleteMobileMoneyAgents/:_Id' )
        .delete( bookController.del );

    router.route( '/deleteRentals/:_Id' )
        .delete( bookController.del );

    router.route( '/deleteRestaurants/:_Id' )
        .delete( bookController.del );


    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = deleteRoutes;