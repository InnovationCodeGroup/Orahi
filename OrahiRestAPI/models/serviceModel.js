var mongoose = require( 'mongoose' ),
    Schema = mongoose.Schema,
    bcrypt = require( 'bcryptjs' );

var serviceModel = new Schema( {
    serviceProvider: {
        type: String
    },
    serviceType: {
        type: String
    },
    serviceName: {
        type: String
    },
    discription: {
        type: String
    },
    rate: {
        type: String
    }
});


module.exports = mongoose.model( 'Services', serviceModel ); 
