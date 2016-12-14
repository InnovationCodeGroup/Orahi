var responses = require("../responses")();
var friends = require('../../models/friendshipModel');
var rating = require( '../../models/ratingModel' );
var industrialRating = require( '../../models/industrialRating' );
var publicRating = require( '../../models/publicRatingModel' );
var mongoose = require( 'mongoose' );
var serviceProviders = [];
var getServiceProviders = '[';
var dSP = [];
var num = -1;

var getController = function ( Value )
{
    var makeServiceProvider = function ( SSP, cont, i )
    {
        console.log( SSP );
        var sProvider = '{"_id":"' + SSP.serviceProvider._id + '","serviceType":"' + SSP.serviceProvider.serviceType + '","name":"' + SSP.serviceProvider.name + '",' +
            '"email":"' + SSP.serviceProvider.email + '", "contact":"' + SSP.serviceProvider.contact + '", "websiteURL":"' + SSP.serviceProvider.websiteURL + '", ' +
            '"location": { "long":"' + SSP.serviceProvider.locationLong + '", "lat":"' + SSP.serviceProvider.locationLat + '"}, "rating": "' + SSP.rating + '"}';
        cont( sProvider, i );
    }

    var mkserviceProviders = function ( serviceProvider, i )
    {
        if ( i == ( dSP.length - 1 ) )
        {
            getServiceProviders += serviceProvider + ']';
        } else
        {
            getServiceProviders += serviceProvider + ',';
        }
    }

    var callback = function ( req, res, serviceProvider, value )
    {
        if ( serviceProviders[serviceProvider] == null || serviceProviders[serviceProvider] == "" )
        {
            serviceProviders[serviceProvider] = value;
            dSP.push( serviceProvider );
        } else if ( serviceProviders[serviceProvider] != null )
        {
            serviceProviders[serviceProvider].rating = parseInt( serviceProviders[serviceProvider].rating ) + parseInt( value.rating );
        }
        if ( num == 1 )
        {
            for ( i = 0; i < dSP.length; i++ )
            {
                var SSP = serviceProviders[dSP[i]];
                makeServiceProvider( SSP, mkserviceProviders, i );           
            }
            responses.successfulOutput(req, res, JSON.parse(getServiceProviders));

            serviceProviders = [];
            getServiceProviders = '[';
            dSP = [];
            num = -1;

        }
        else
        {
            num--;       
        }          

    }

    var callback2 = function ( value )
    {
        num = value * 7;
    }

    var callback3 = function ( req, res )
    {
        if ( num == 1 )
        {
            for ( i = 0; i < dSP.length; i++ )
            {
                var SSP = serviceProviders[dSP[i]];
                makeServiceProvider( SSP, mkserviceProviders, i );

            }
            responses.successfulOutput(req, res, JSON.parse(getServiceProviders));

            serviceProviders = [];
            getServiceProviders = '[';
            dSP = [];
            num = -1;
        }
        else
        {
            num--;
        }  
    }

    var get = function ( req, res )
    {
        var userId = mongoose.Types.ObjectId(req.decoded._doc._id);
        var query = {};
        if ( req.query.serviceType )
        {
            query.serviceType = req.query.serviceType;
            Value.find( query, function ( err, result )
            {
                if ( err )
                {
                    responses.failureOutput(req, res, err);
                }
                else if ( result.length == 0 )
                {
                    responses.failureOutput(req, res, "No service providers exist in this category");
                }
                else if ( result )
                {
                    callback2( result.length );

                    for ( i = 0; i < result.length; i++ )
                    {    
                        //Record all services in the callback function
                        var serviceProvider = '{"_id":"' + result[i]._id + '","serviceType":"' + result[i].serviceType + '","name":"' + result[i].name + '",' +
                            '"email":"' + result[i].email + '", "contact":"' + result[i].contact + '", "websiteURL":"' + result[i].websiteURL + '", ' +
                            '"locationLong":"' + result[i].location.long + '", "locationLat":"' + result[i].location.lat + '"}';

                        var rate = 0;
                        var record = JSON.parse( '{"serviceProvider": ' + serviceProvider + ', "rating": "' + rate + '" }' );
                        callback( req, res, result[i]._id, record );                  

                        //Ratings based on the public
                        publicRating.aggregate( [
                            {
                                $lookup:
                                {
                                    from: "serviceproviders",
                                    localField: "serviceProvider",
                                    foreignField: "_id",
                                    as: "pr"
                                }
                            },
                            { $unwind: "$pr" },
                            { $match: { "serviceProvider": result[i]._id } }
                        ],
                            function ( err, SP )
                            {
                                if ( err )
                                {
                                    responses.consoleFailure(err);
                                } else 
                                {
                                    if ( SP.length > 0 )
                                    {

                                        var serviceProvider = '{"_id":"' + SP[0].pr._id + '","serviceType":"' + SP[0].pr.serviceType + '","name":"' + SP[0].pr.name + '",' +
                                            '"email":"' + SP[0].pr.email + '", "contact":"' + SP[0].pr.contact + '", "websiteURL":"' + SP[0].pr.websiteURL + '", ' +
                                            '"locationLong":"' + SP[0].pr.location.long + '", "locationLat":"' + SP[0].pr.location.lat + '"}';

                                        var rate = ( parseInt( SP[0].publicRating ) * 0.07 ).toFixed( 2 );
                                        var public = JSON.parse( '{"serviceProvider": ' + serviceProvider + ', "rating": "' + rate + '" }' );


                                        callback( req, res, SP[0].pr._id, public );
                                    } else
                                    {
                                        callback3(req, res);
                                        responses.consoleFailure('No public results');
                                    }
                                }
                            }
                        )


                        //Ratings based on an individual
                        rating.aggregate( [
                            {
                                $lookup:
                                {
                                    from: "serviceproviders",
                                    localField: "serviceProvider",
                                    foreignField: "_id",
                                    as: "spr"
                                }
                            },
                            { $unwind: "$spr" },
                            { $match: { "userId": userId, "serviceProvider": result[i]._id } }
                        ],
                            function ( err, SP )
                            {
                                if ( err )
                                {
                                    console.log( err );
                                } else 
                                {
                                    if ( SP.length > 0 )
                                    {
                                        var serviceProvider = '{"_id":"' + SP[0].spr._id + '","serviceType":"' + SP[0].spr.serviceType + '","name":"' + SP[0].spr.name + '",' +
                                            '"email":"' + SP[0].spr.email + '", "contact":"' + SP[0].spr.contact + '", "websiteURL":"' + SP[0].spr.websiteURL + '", ' +
                                            '"locationLong":"' + SP[0].spr.location.long + '", "locationLat":"' + SP[0].spr.location.lat + '"}';
                                        var rate = parseInt( SP[0].rating ) * 0.25;
                                        var individual = JSON.parse( '{"serviceProvider": ' + serviceProvider + ', "rating": "' + rate + '" }' );
                                        callback( req, res, SP[0].spr._id, individual );
                                    } else
                                    {
                                        callback3(req, res);
                                        responses.consoleFailure('No individual results');
                                    }

                                }
                            }
                        )

                        //Ratings based on the industry
                        industrialRating.aggregate( [
                            {
                                $lookup:
                                {
                                    from: "serviceproviders",
                                    localField: "serviceProviderId",
                                    foreignField: "_id",
                                    as: "ir"
                                }
                            },
                            { $unwind: "$ir" },
                            { $match: { "serviceProviderId": result[i]._id } }
                        ],
                            function ( err, SP )
                            {
                                if ( err )
                                {
                                    console.log( err );
                                } else 
                                {
                                    if ( SP.length > 0 )
                                    {
                                        var serviceProvider = '{"_id":"' + SP[0].ir._id + '","serviceType":"' + SP[0].ir.serviceType + '","name":"' + SP[0].ir.name + '",' +
                                            '"email":"' + SP[0].ir.email + '", "contact":"' + SP[0].ir.contact + '", "websiteURL":"' + SP[0].ir.websiteURL + '", ' +
                                            '"locationLong":"' + SP[0].ir.location.long + '", "locationLat":"' + SP[0].ir.location.lat + '" }';

                                        var rate = ( parseInt( SP[0].industrialRating ) * 0.05 ).toFixed( 2 );
                                        var industrial = JSON.parse( '{"serviceProvider": ' + serviceProvider + ', "rating": "' + rate + '" }' );
                                        callback( req, res, SP[0].ir._id, industrial );
                                    } else
                                    {
                                        callback3(req, res);
                                        responses.consoleFailure('Industrial rating non existant');
                                    }

                                }
                            }
                        )


                        //Ratings based on people one follows
                        friends.aggregate( [
                            {
                                $lookup:
                                {
                                    from: "ratings",
                                    localField: "friendId",
                                    foreignField: "userId",
                                    as: "friendRating"
                                }
                            },
                            { $unwind: "$friendRating" },
                            { $match: { "userId": userId, "friendRating.serviceProvider": result[i]._id, "following": true } },
                            { $group: { _id: { serviceProvider: "$friendRating.serviceProvider", rating: "$friendRating.rating" }, count: { $sum: 1 } } }
                        ],
                            function ( err, result )
                            {
                                if ( err )
                                {
                                    console.log( err );
                                } else 
                                {
                                    if ( result.length > 0 )
                                    {
                                        var rating = require( "../../Algorithm/ratingsComputation" )( result );
                                        var fRating = ( rating * 0.13 ).toFixed( 2 );

                                        Value.findOne( { _id: result[0]._id.serviceProvider }, function ( err, SP )
                                        {
                                            var serviceProvider = '{"_id":"' + SP._id + '","serviceType":"' + SP.serviceType + '","name":"' + SP.name + '",' +
                                                '"email":"' + SP.email + '", "contact":"' + SP.contact + '", "websiteURL":"' + SP.websiteURL + '", ' +
                                                '"locationLong":"' + SP.location.long + '", "locationLat":"' + SP.location.lat + '"}';

                                            var following = JSON.parse( '{"serviceProvider": ' + serviceProvider + ', "rating": "' + fRating + '" }' );
                                            callback( req, res, SP._id, following );
                                        });
                                    } else
                                    {
                                        callback3(req, res);
                                        responses.consoleFailure('Following ratings non existant');
                                    }
                                }
                            }
                        )

                        //Ratings based on people that accepted to also follow you
                        friends.aggregate( [
                            {
                                $lookup:
                                {
                                    from: "ratings",
                                    localField: "friendId",
                                    foreignField: "userId",
                                    as: "friendRating"
                                }
                            },
                            { $unwind: "$friendRating" },
                            { $match: { "userId": userId, "friendRating.serviceProvider": result[i]._id, "accepted": true } },
                            { $group: { _id: { serviceProvider: "$friendRating.serviceProvider", rating: "$friendRating.rating" }, count: { $sum: 1 } } }
                        ],
                            function ( err, result )
                            {
                                if ( err )
                                {
                                    console.log( err );
                                } else 
                                {
                                    if ( result.length > 0 )
                                    {
                                        var rating = require( "../../Algorithm/ratingsComputation" )( result );
                                        var aRating = ( rating * 0.2 ).toFixed( 2 );

                                        Value.findOne( { _id: result[0]._id.serviceProvider }, function ( err, SP )
                                        {
                                            var serviceProvider = '{"_id":"' + SP._id + '","serviceType":"' + SP.serviceType + '","name":"' + SP.name + '",' +
                                                '"email":"' + SP.email + '", "contact":"' + SP.contact + '", "websiteURL":"' + SP.websiteURL + '", ' +
                                                '"locationLong":"' + SP.location.long + '", "locationLat":"' + SP.location.lat + '"}';

                                            var accepted = JSON.parse( '{"serviceProvider": ' + serviceProvider + ', "rating": "' + aRating + '" }' );
                                            callback( req, res, SP._id, accepted );
                                        });
                                    } else
                                    {
                                        callback3(req, res);
                                        responses.consoleFailure('Accepted freinds ratings non existant');
                                    }

                                }
                            }
                        )

                        //Rating based on mutual friends
                        friends.aggregate( [
                            {
                                $lookup:
                                {
                                    from: "ratings",
                                    localField: "friendId",
                                    foreignField: "userId",
                                    as: "friendRating"
                                }
                            },
                            { $unwind: "$friendRating" },
                            { $match: { "userId": userId, "friendRating.serviceProvider": result[i]._id, "mutual": true } },
                            { $group: { _id: { serviceProvider: "$friendRating.serviceProvider", rating: "$friendRating.rating" }, count: { $sum: 1 } } }
                        ],
                            function ( err, result )
                            {
                                if ( err )
                                {
                                    console.log( err );
                                } else 
                                {
                                    if ( result.length > 0 )
                                    {
                                        var rating = require( "../../Algorithm/ratingsComputation" )( result );
                                        var mRating = ( rating * 0.3 ).toFixed( 2 );
                                        Value.findOne( { _id: result[0]._id.serviceProvider }, function ( err, SP )
                                        {
                                            var serviceProvider = '{"_id":"' + SP._id + '","serviceType":"' + SP.serviceType + '","name":"' + SP.name + '",' +
                                                '"email":"' + SP.email + '", "contact":"' + SP.contact + '", "websiteURL":"' + SP.websiteURL + '", ' +
                                                '"locationLong":"' + SP.location.long + '", "locationLat":"' + SP.location.lat + '"}';

                                            var mutual = JSON.parse( '{"serviceProvider": ' + serviceProvider + ', "rating": "' + mRating + '" }' );
                                            callback( req, res, SP._id, mutual );
                                        });
                                    } else
                                    {
                                        callback3(req, res);
                                        responses.consoleFailure('Mutual friends ratings non existant');
                                    }

                                }
                            }
                        )
                       
                    }
                }
            })
        } else
        {
            responses.failureOutput(req, res, "Service type not given");
        }

        

    }

    return {
        get: get
    }
}

module.exports = getController;
