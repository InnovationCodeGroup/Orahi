var mongoose = require( 'mongoose' ),
    Schema = mongoose.Schema;

var serviceProvider = require( './serviceProviderModel' );

var industrialRatingModel = new Schema( {
    serviceProviderId: { type: mongoose.Schema.Types.ObjectId, ref: 'serviceProvider' },
    serviceType: {
        type: String
    },
    name: {
        type: String
    },
    industrialRating: {
        type: String
    }
});


module.exports = mongoose.model( 'industrialRating', industrialRatingModel ); 