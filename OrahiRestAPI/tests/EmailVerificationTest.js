var should = require( 'should' ),
    mongoose = require( 'mongoose' ),
    emailVerification = require( '../authorisation/emailVerification' )(),
    stubTransport = require( 'nodemailer-stub-transport' ),
    user = require( '../models/userModel' );
mongoose.connect( 'mongodb://localhost/orahidb_test' );

describe( 'Email verification tests', function ()
{
    var tempUserModel;

    it( 'Generates a temp user model', function ( done )
    {
        emailVerification.generateTempUserModel( user, function ( err, generatedTempUserModel )
        {
            tempUserModel = generatedTempUserModel;
            done();
        });
    });
})

