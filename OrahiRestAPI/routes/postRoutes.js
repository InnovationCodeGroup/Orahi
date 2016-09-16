//var express = require( 'express' );

//var postRoutes = function ( Value, uriPath )
//{
//    /*Start Router*/
//    var router = express.Router();
//    router.route( uriPath )
//        .post( function ( req, res )
//        {
//            var value = new Value( req.body );
//            //console.log( book );
//            //res.send( book );
//            value.save();
//            res.status( 201 ).send( value );

//        })

//    /*End Router*/

//    return router;
//}

//module.exports = postRoutes;

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
 * Start post Controllers variables based on the various models in the database
 */
var bookController = require( '../controllers/postController' )( Book );
var bankController = require( '../controllers/postController' )( Book );
var emergencyServiceController = require( '../controllers/postController' )( Book );
var eventController = require( '../controllers/postController' )( Book );
var forexController = require( '../controllers/postController' )( Book );
var hotelController = require( '../controllers/postController' )( Book );
var houseController = require( '../controllers/postController' )( Book );
var mobileMoneyController = require( '../controllers/postController' )( Book );
var rentalController = require( '../controllers/postController' )( Book );
var restuarantController = require( '../controllers/postController' )( Book );
/**
 * End post Controllers variables
 */

/**
 * Start module main function
 */
var postRoutes = function ()
{

    /**
     * Start routes
     */
    var router = express.Router();

    router.route( '/postBooks' )
        .post( bookController.post );

    router.route( '/postBanks' )
        .post( bookController.post );

    router.route( '/postEmergencyServices' )
        .post( bookController.post );

    router.route( '/postEvents' )
        .post( bookController.post );

    router.route( '/postForexs' )
        .post( bookController.post );

    router.route( '/postHotels' )
        .post( bookController.post );

    router.route( '/postHouses' )
        .post( bookController.post );

    router.route( '/postMobileMoneyAgents' )
        .post( bookController.post );

    router.route( '/postRentals' )
        .post( bookController.post );

    router.route( '/postRestaurants' )
        .post( bookController.post );


    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = postRoutes;