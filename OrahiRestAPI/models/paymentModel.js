var mongoose = require( 'mongoose' ),
    Schema = mongoose.Schema;

var user = require( './userModel' );
var serviceProvider = require( './serviceProviderModel' );
var service = require('./serviceModel');
var dateFormat = require('dateformat');

var paymentModel = new Schema( {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'serviceProvider' },
    serviceType: { type: String },
    userMobileMoney: { type: String },
    depositorMobileMoney: { type: String },
    paymentMethod: { type: String },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'service' },
    rate: { type: String },
    approved: { type: Boolean, default: false },
    transactionId: { type: String },
    organisation: { type: String },
    author: { type: String },
    ResponseMessage: { type: String },
    paymentDate: { type : Date, default: Date.now },
    bookDate: { type : Date, default: Date.now },
    batch: { type: String },
    activity: { type: String }
});


module.exports = mongoose.model( 'payment', paymentModel ); 