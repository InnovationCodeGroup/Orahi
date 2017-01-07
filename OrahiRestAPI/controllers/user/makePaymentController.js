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

        //var endpoint = "/api/v2/transactions/credits";
        var endpoint = "/api/v3/collectionrequests";
        var value = new Value( req.body );
        value.userId = req.decoded._doc._id;
        value.userMobileMoney = req.decoded._doc.mobileMoneyNumber;
        value.userMobileMoney = "+401000000001";
        //value.depositorMobileMoney = "256772849837";
       
        var timeNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss").toString();
        value.paymentDate = new Date();

        //console.log(timeNow);
        //console.log(dateFormat(value.paymentDate, "yyyy-mm-dd hh:MM:ss"));

        //value.batch = "BATCH-1";
        var CurrencyCode = "BXC";
        //var CurrencyCode = "UGX";
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

        value.save( function ( err )
        {
            if ( err )
            {
                responses.failureInput(req, res, err);
            }
            else
            {
               

                // var paymentDetails = '{"BatchId": "' + value.batch + '","RequestId": "' + value._id + '","RequestReference": { "RequestId": "' + value._id + '","ServiceProvider": "' + value.serviceProvider + '", "Service": "' + value.service + '" },' +
                //     '"PaymentMethodId": "' + value.paymentMethod + '", "PaymentMethodReference": { "MSISDN" : "' + value.userMobileMoney + '","memo": "Sending money..." },' +
                //     '"Metadata": { "CreatedOn": "' + datetime + '"}, "ProductId": "PAYMENT", "ProductReference": {"Order": "Payment"}, "Amount": "' + value.rate + '", "CurrencyCode": "' + CurrencyCode + '",' +
                //     '"CountryCode": "' + CountryCode + '", "Memo": "ServiceProvider-' + value.serviceProvider + ' and Service-' + value.service + '", "ChannelId": "' + channelId + '",'+
                //     '"ChannelReference": {"AppId": "2P04FJ84G0F92Y35"}, "CustomerId": "' + value.userId + '" }';

                var paymentDetails = '{"id":"' + value._id + '","organization":"' + value.serviceProvider + '","amount":"' + value.rate + '",' +
                    '"currency":"' + CurrencyCode + '","phonenumber":"' + value.userMobileMoney + '",' +
                                        '"created":"'+dateFormat(value.paymentDate, "yyyy-mm-dd hh:MM:ss")+'"}';
                var data = JSON.parse( paymentDetails );
                //console.log(JSON.parse(paymentDetails));

                //res.json(paymentDetails);
                //codestring = "function hello(name){ alert( 'Hello, ' + name );} hello( 'New user' );"
                require( '../financial/makePayment' )( endpoint, method, data, res );                        
            }
        });
    }

    return {
        post: post
    }
}

module.exports = paymentController;
