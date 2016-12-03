var mongoose = require( 'mongoose' ),
    Schema = mongoose.Schema;

var serviceProvider = require( './serviceProviderModel' );

var logsModel = new Schema( {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'serviceProvider' },
    serviceProvider: {
        type: String
    },
    activity: {
        type: String
    },
    details: {
        type: String
    },
    date: {
        type: Date, default: Date.now
    }
});


module.exports = mongoose.model( 'logs', logsModel ); 