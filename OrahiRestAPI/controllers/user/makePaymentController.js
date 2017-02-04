var jsonQuery = require( 'json-query' );
var querystring = require( 'querystring' );
var https = require( 'https' );
var querystring = require( 'querystring' );
var http = require('http');
var dateFormat = require('dateformat');
var responses = require("../responses")();


var paymentController = function ( Value, paymentMethods )
{
    var post = function ( req, res )
    {
        
        var endpoint = "/api/v3/collectionrequests";
        var serviceId = req.body._id;
        delete req.body._id;
        var value = new Value(req.body);

        value.service = serviceId;
        value.userId = req.decoded._doc._id;
        value.userMobileMoney = req.decoded._doc.mobileMoneyNumber;
        //value.userMobileMoney = "+401000000001";
       
        var timeNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss").toString();
        value.paymentDate = new Date();
        
        //var CurrencyCode = "BXC";
        var CurrencyCode = "UGX";
        var CountryCode = "256";
        var paymentMethod;
        var success;
        var method = "POST";

       


        // if ( req.decoded._doc.mobileMoneyTelecom = "MTN" )
        // {
        //     value.paymentMethod = "MTNMOBILEMONEYUG";
        // }
        // else if ( req.decoded._doc.mobileMoneyTelecom = "AIRTEL" )
        // {
        //     value.paymentMethod = "AIRTELMONEYUG";
        // }
        
        var channelId = "WEBAPI";

        console.log(value);

        value.save( function ( err )
        {
            if ( err )
            {
                responses.failureInput(req, res, err);
            }
            else
            {
               
                var paymentDetails = '{"id":"' + value._id + '","organization":"' + value.serviceProvider + '","amount":"' + value.rate + '",' +
                    '"currency":"' + CurrencyCode + '","phonenumber":"' + value.userMobileMoney + '",' +
                                        '"created":"'+dateFormat(value.paymentDate, "yyyy-mm-dd hh:MM:ss")+'"}';
                var data = JSON.parse( paymentDetails );
                require( '../financial/makePayment' )( endpoint, method, data, req, res );                        
            }
        });
    }

    return {
        post: post
    }
}

module.exports = paymentController;
