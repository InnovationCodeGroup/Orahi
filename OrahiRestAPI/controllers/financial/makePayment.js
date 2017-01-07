var responses = require("../responses")();
var querystring = require('querystring');
var https = require( 'https' );
var http = require( 'http' );

//var host = 'ip2-sandbox.intelworld.international';
//var AccountId = '256782539187';
//var ApiKey = '57A3A1CE47CF4632B63C24E26D3A4E42';
//var SubscriptionId = 'F6E4CA2A3F214BD886D2D896FE81B331V2';
//var password = "password";

var host = 'app.beyonic.com';
var ApiKey = 'Token 47fbdedc77b3c96e5b9e29d70ec4391891120c4c';


var paymentModel = require( '../../models/paymentModel' );
var logsModel = require( '../../models/logsModel' );
var serviceproviders = require( '../../models/serviceProviderModel' );
var mongoose = require( 'mongoose' );


function makePayment( endpoint, method, data, view )
{
    var post_data = JSON.stringify( data );
    var headers = {};
    var payment_id = data.id;

    //console.log( payment_id );
    // endpoint = endpoint + '/' + SubscriptionId + '/' + AccountId;

    if ( method == 'GET' )
    {
        endpoint += '?' + querystring.stringify( data );
        headers = {
            'Authorization': ApiKey
        };
    }
    else
    {
        headers = {
            'Content-Type': 'application/json',
            'Authorization': ApiKey,
            'Content-Length': post_data.length
        };
        
    }
    //port: '84',
    var options = {
        host: host,
        port: '443',      
        path: endpoint,
        method: method,
        headers: headers
    };

    var post_req = https.request( options, function ( res )
    {
        res.setEncoding( 'utf-8' );

        var responseString = '';

        res.on( 'data', function ( data )
        {
            responseString += data;
        });

        res.on( 'end', function ()
        {
            console.log( responseString );
            var responseObject = JSON.parse( responseString );

            paymentModel.findOne({ _id: payment_id }, function (err, result)
            {
                if ( err )
                {
                    responses.failureInput(req, res, err);
                } else if ( result )
                {
                    var callback = function ( item )
                    {
                        //console.log( item[0].service.serviceName );
                        
                        var value = '{"userId":"' + result.userId + '","serviceProvider":"' + result.serviceProvider + '","activity":"Booking",' +
                            '"details":"Request to ' + item[0].name + ' for ' + item[0].service.serviceName + '"}';
                        var logs = new logsModel( JSON.parse( value ) );
                        logs.save( function ( err )
                        {
                            if (err) responses.consoleFailure(err);
                            else responses.consoleSuccess("Log" + logs._id + "saved");

                        })
                       
                    }
                    
                    serviceproviders.aggregate( [
                        {
                            $lookup:
                            {
                                from: "services",
                                localField: "_id",
                                foreignField: "serviceProvider",
                                as: "service"
                            }
                        },
                        { $unwind: "$service" },
                        { $match: { "_id": result.serviceProvider, "service._id": result.service } }
                    ], function ( err, reply )
                    {
                        if (err) console.log({ status: "failure", error: err });
                        else if ( reply.length == 0 )
                        {
                            responses.consoleFailure("No items returned");
                        } else
                        {
                            callback( reply );
                        }

                    })
                    

                    paymentModel.update( { _id: result._id },
                        {
                            $set: {
                                transactionId: responseObject.id,
                                organisation: responseObject.organisation,
                                author: responseObject.author
                            }
                        }, function ( err, numAffected )
                        {
                            if ( err )
                            {
                                responses.failureInput(req, res, err);
                            }
                            else
                            {
                                responses.consoleSuccess(numAffected);                       
                            }
                        }
                    )
                }
            })

            view.send( responseObject );         
        });
    });

    // post the data
    post_req.write( post_data );
    post_req.end();

}

module.exports = makePayment;

























































