var mongoose = require( 'mongoose' ),
    Schema = mongoose.Schema,
    bcrypt = require( 'bcryptjs' );

var serviceProviderModel = new Schema( {
    name: {
        type: String
    },
    serviceType: {
        type: String
    },
    email: {
        type: String
    },
    contact: {
        type: String
    },
    websiteURL: {
        type: String
    },
    password: {
        type: String
    },
    sno: {
        type: String
    },
    location: {
        long: {
            type: String
        },
        lat: {
            type: String
        }
    },
    trust: {
        type: false
    }
});


//methods
// generating a has
serviceProviderModel.methods.generateHash = function ( password )
{
    return bcrypt.hashSync( password, bcrypt.genSaltSync( 8 ), null );
}
//checking the password is valid
serviceProviderModel.methods.validPassword = function ( password )
{
    return bcrypt.compareSync( password, this.local.password );
}

module.exports = mongoose.model( 'ServiceProvider', serviceProviderModel ); 