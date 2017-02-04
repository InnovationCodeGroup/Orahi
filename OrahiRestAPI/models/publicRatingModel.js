var mongoose = require( 'mongoose' ),
    Schema = mongoose.Schema;

var serviceProvider = require( './serviceProviderModel' );

var publicRatingModel = new Schema( {
    serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'serviceProvider' },
    publicRating: {
        type: String
    }
});


module.exports = mongoose.model( 'publicRating', publicRatingModel ); 