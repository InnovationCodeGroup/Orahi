//var express = require( 'express' );

//var getRouteById = function ( Value , uriPath)
//{
//    /*Start Router*/
//    var router = express.Router();
//    router.route( uriPath )
//        .get( function ( req, res )
//        {

//            Value.findById( req.params.bookId, function ( err, value )
//            {
//                if ( err )
//                    res.status( 500 ).send( err );
//                else
//                    res.json( value );
//            })

//        });

//    /*End Router*/

//    return router;
//}

//module.exports = getRouteById;

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
var bookController = require( '../controllers/getByIdController' )( Book );
var bankController = require( '../controllers/getByIdController' )( Book );
var emergencyServiceController = require( '../controllers/getByIdController' )( Book );
var eventController = require( '../controllers/getByIdController' )( Book );
var forexController = require( '../controllers/getByIdController' )( Book );
var hotelController = require( '../controllers/getByIdController' )( Book );
var houseController = require( '../controllers/getByIdController' )( Book );
var mobileMoneyController = require( '../controllers/getByIdController' )( Book );
var rentalController = require( '../controllers/getByIdController' )( Book );
var restuarantController = require( '../controllers/getByIdController' )( Book );
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