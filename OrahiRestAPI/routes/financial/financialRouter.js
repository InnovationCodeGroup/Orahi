var express = require( 'express' );

/**
 * Start database models variables
 */
var paymentModel = require( '../../models/paymentModel' );
/**
 *End database models variables
 */


/**
 * Start module main function
 */
var financialRouter = function ( app )
{

    var router = express.Router();

    router.post( '/success', function ( req, res )
    {
        paymentModel.findOne( { _id: req.body.id }, function ( err, result )
        {
            if ( err )
            {
                res.status( 500 );
                res.send( err );
            } else if ( result )
            {
                paymentModel.update( { _id: result._id },
                    {
                        $set: {
                            approved: true
                        }
                    }, function ( err, numAffected )
                    {
                        if ( err )
                        {
                            res.status( 500 );
                            res.send( err );
                        }
                        else
                        {
                            res.send( numAffected )
                        }
                    }
                )
            }
        })
    })

    router.post( '/failure', function ( req, res )
    {
        paymentModel.findOne({ _id: req.body.id }, function (err, result)
        {
            if ( err )
            {
                res.status( 500 );
                res.send( err );
            } else if ( result )
            {
                paymentModel.update( { _id: result._id },
                    {
                        $set: {
                            approved: false
                        }
                    }, function ( err, numAffected )
                    {
                        if ( err )
                        {
                            res.status( 500 );
                            res.send( err );
                        }
                        else
                        {
                            res.send( numAffected )
                        }
                    }
                )
            }
        })
    })
    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = financialRouter;