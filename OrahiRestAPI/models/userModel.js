﻿var mongoose = require( 'mongoose' ),
    Schema = mongoose.Schema,
    bcrypt = require( 'bcryptjs' ),
    SALT_WORK_FACTOR = 10;

var userModel = new Schema( {
    name: {
        type: String
    },
    userName: {
        type: String
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    mobileMoneyNumber: {
        type: String
    },
    mobileMoneyTelecom: {
        type: String
    },
    password: {
        type: String
    },
    adminReg: {
        type: Boolean, default: false
    },
    admin: {
        type: Boolean, default: false
    }, 
    image: {
        type: String
    }
});




userModel.pre( 'save', function ( next )
{
    var user = this;

    // only hash the password if it has been modified (or is new)
    if ( !user.isModified( 'password' ) ) return next();

    // generate a salt
    bcrypt.genSalt( SALT_WORK_FACTOR, function ( err, salt )
    {
        if ( err ) return next( err );

        // hash the password using our new salt
        bcrypt.hash( user.password, salt, function ( err, hash )
        {
            if ( err ) return next( err );

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userModel.methods.comparePassword = function ( candidatePassword, cb )
{
    bcrypt.compare( candidatePassword, this.password, function ( err, isMatch )
    {
        if ( err ) return cb( err );
        cb( null, isMatch );
    });
};


module.exports = mongoose.model( 'User', userModel ); 