var mongoose = require( 'mongoose' ),
    Schema = mongoose.Schema,
    bcrypt = require( 'bcryptjs' );

var userModel = new Schema( {
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    admin: {
        type: Boolean, default: false
    }
});


//methods
// generating a has
userModel.methods.generateHash = function ( password )
{
    return bcrypt.hashSync( password, bcrypt.genSaltSync( 8 ), null );
}
//checking the password is valid
userModel.methods.validPassword = function ( password )
{
    return bcrypt.compareSync( password, this.local.password );
}

module.exports = mongoose.model( 'User', userModel ); 