var mongoose = require( 'mongoose' ),
    Schema = mongoose.Schema,
    bcrypt = require( 'bcryptjs' );

var user = require( './userModel' );
var serviceProvider = require('./serviceProviderModel' );

var ratingModel = new Schema( {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'serviceProvider' },
    serviceType: {
        type: String
    },
    rating: {
        type: String
    }
});


module.exports = mongoose.model( 'Rating', ratingModel ); 