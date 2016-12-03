var mongoose = require( 'mongoose' ),
    Schema = mongoose.Schema,
    bcrypt = require( 'bcryptjs' ),
    SALT_WORK_FACTOR = 10;

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
    paymentBatch: {
        type: String
    },
    trust: {
        type: Boolean, default: false
    }, 
    image: {
        type: String
    },
    logo: {
        type: String
    }
});


serviceProviderModel.pre( 'save', function ( next )
{
    var serviceProvider = this;

    // only hash the password if it has been modified (or is new)
    if ( !serviceProvider.isModified( 'password' ) ) return next();

    // generate a salt
    bcrypt.genSalt( SALT_WORK_FACTOR, function ( err, salt )
    {
        if ( err ) return next( err );

        // hash the password using our new salt
        bcrypt.hash( serviceProvider.password, salt, function ( err, hash )
        {
            if ( err ) return next( err );

            // override the cleartext password with the hashed one
            serviceProvider.password = hash;
            next();
        });
    });
});

serviceProviderModel.methods.comparePassword = function ( candidatePassword, cb )
{
    bcrypt.compare( candidatePassword, this.password, function ( err, isMatch )
    {
        if ( err ) return cb( err );
        cb( null, isMatch );
    });
};

module.exports = mongoose.model( 'serviceproviders', serviceProviderModel ); 