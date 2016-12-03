var publicRating = require( '../../models/publicRatingModel' );
var paymentModel = require( '../../models/paymentModel' );
var logsModel = require( '../../models/logsModel' );
var serviceproviders = require( '../../models/serviceProviderModel' );
var mongoose = require( 'mongoose' );


var ratingController = function ( Value )
{
    var post = function ( req, res )
    {

        var value = new Value( req.body );
        value.userId = req.decoded._doc._id;

        Value.findOne( {
            userId: value.userId,
            serviceProvider: value.serviceProvider
        }, function ( err, result )
        {
            if ( err )
                throw err;
            if ( result )
            {
                res.json( { success: false, message: 'Rating exist' });
            } else if ( !result )
            {
                value.save( function ( err )
                {
                    if ( err )
                    {
                        res.status( 500 );
                        res.send( err );
                    }
                    else
                    {

                        var callback = function ( item )
                        {
                            //console.log( item[0].service.serviceName );

                            var result = '{"userId":"' + value.userId + '","serviceProvider":"' + value.serviceProvider + '","activity":"Rating",' +
                                '"details":"Gave ' + item.name + ' a rating of ' + value.rating + '"}';

                            var logs = new logsModel( JSON.parse( result ) );

                            logs.save( function ( err )
                            {
                                if ( err ) console.log( err );
                                else console.log( logs );
                            })

                        }

                        var it = value.serviceProvider;
                        serviceproviders.findOne( { _id: value.serviceProvider}, function ( err, reply )
                        {
                            if ( err ) console.log( err );
                            else if ( !reply )
                            {
                                console.log( "No items returned" );
                            } else
                            {
                                callback( reply );
                            }

                        })





                        res.status( 201 );
                        res.json( value );

                        Value.aggregate( [
                            { $match: { "serviceProvider": value.serviceProvider } },
                            { $group: { _id: { serviceProvider: "$serviceProvider", rating: "$rating" }, count: { $sum: 1 } } }
                        ], function ( err, answer )
                        {
                            var rating = require( "../../Algorithm/ratingsComputation" )( answer );
                            var data = JSON.parse( '{"serviceProvider":"' + answer[0]._id.serviceProvider + '","publicRating":"' + rating + '"}' );

                            publicRating.find( { serviceProvider: answer[0]._id.serviceProvider }, function ( err, reply )
                            {
                                console.log(reply)
                                if ( err )
                                {
                                    console.log( err );
                                }
                                else
                                {
                                    var replyLength = Object.keys( reply ).length;
                                    if ( replyLength == 0 )
                                    {
                                        var public = new publicRating( data );
                                        public.save( function ( err )
                                        {
                                            if ( err )
                                            {
                                                console.log( err );
                                            }
                                            else
                                            {
                                                console.log( public );
                                            }
                                        })
                                    } else if ( replyLength != 0 )
                                    {                                    
                                        publicRating.update( { serviceProvider: mongoose.Types.ObjectId( reply[0].serviceProvider ) },
                                            { $set: { publicRating: data.publicRating } }, function ( err, numAffected )
                                        {
                                            if ( err )
                                            {                           
                                                console.log( err );
                                            }
                                            else
                                            {
                                                console.log( numAffected )
                                            }
                                        })
                                    }
                                }
                            })
                            
                        })
                        
                    }
                })
            }
        })
    }

    return {
        post: post
    }
}

module.exports = ratingController;