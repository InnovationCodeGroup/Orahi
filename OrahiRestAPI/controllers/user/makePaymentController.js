var jsonQuery = require( 'json-query' );
var querystring = require( 'querystring' );
var https = require( 'https' );
var querystring = require( 'querystring' );
var http = require( 'http' );


var paymentController = function ( Value, paymentMethods )
{
    var post = function ( req, res )
    {

        var endpoint = "/api/v2/transactions/credits";
        var value = new Value( req.body );
        value.userId = req.decoded._doc._id;
        value.userMobileMoney = req.decoded._doc.mobileMoneyNumber;
        value.depositorMobileMoney = "256772849837";
        var datetime = new Date();
        value.batch = "BATCH-1";
        var CurrencyCode = "UGX";
        var CountryCode = "256";
        var paymentMethod;
        var success;
        var method = "POST";


        if ( req.decoded._doc.mobileMoneyTelecom = "MTN" )
        {
            value.paymentMethod = "MTNMOBILEMONEYUG";
        }
        else if ( req.decoded._doc.mobileMoneyTelecom = "AIRTEL" )
        {
            value.paymentMethod = "AIRTELMONEYUG";
        }
        
        var channelId = "WEBAPI";

        value.save( function ( err )
        {
            if ( err )
            {
                res.status( 500 );
                res.send( err );
            }
            else
            {
               

                var paymentDetails = '{"BatchId": "' + value.batch + '","RequestId": "' + value._id + '","RequestReference": { "RequestId": "' + value._id + '","ServiceProvider": "' + value.serviceProvider + '", "Service": "' + value.service + '" },' +
                    '"PaymentMethodId": "' + value.paymentMethod + '", "PaymentMethodReference": { "MSISDN" : "' + value.userMobileMoney + '","memo": "Sending money..." },' +
                    '"Metadata": { "CreatedOn": "' + datetime + '"}, "ProductId": "PAYMENT", "ProductReference": {"Order": "Payment"}, "Amount": "' + value.rate + '", "CurrencyCode": "' + CurrencyCode + '",' +
                    '"CountryCode": "' + CountryCode + '", "Memo": "ServiceProvider-' + value.serviceProvider + ' and Service-' + value.service + '", "ChannelId": "' + channelId + '",'+
                    '"ChannelReference": {"AppId": "2P04FJ84G0F92Y35"}, "CustomerId": "' + value.userId + '" }';
                var data = JSON.parse( paymentDetails );
                //res.send( data );
                codestring = "function hello(name){ alert( 'Hello, ' + name );} hello( 'New user' );"
                require( '../financial/makePayment' )( endpoint, method, data, res );

            }
        });
    }

    return {
        post: post
    }
}

module.exports = paymentController;
