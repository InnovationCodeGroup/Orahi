var mongoose = require( 'mongoose' ),
    Schema = mongoose.Schema,
    bcrypt = require( 'bcryptjs' );

var serviceModel = new Schema( {
    serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'serviceProvider' },
    serviceType: {
        type: String
    },
    serviceName: {
        type: String
    },
    discription: {
        type: String
    },
    trailer:{
        type: String
    },
    image1: {
        type: String
    },
    image2: {
        type: String
    },
    image3: {
        type: String
    },
    image4: {
        type: String
    },
    image5: {
        type: String
    },
    contact: {
        name: { type: String },
        phoneNumber: { type: String },
        picture: { type: String }
    },
    location: {
        long: {
            type: String
        },
        lat: {
            type: String
        }
    },
    online:{
        type:Boolean, default: false
    },
    rate:{
        type:String
    }
});


module.exports = mongoose.model( 'Services', serviceModel ); 
