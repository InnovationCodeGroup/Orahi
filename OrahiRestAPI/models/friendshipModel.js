var mongoose = require( 'mongoose' ),
    Schema = mongoose.Schema,
    bcrypt = require( 'bcryptjs' );

var user = require( './userModel' );

var friendShipModel = new Schema( {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    friendId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    following: {
        type: Boolean, default: true
    },
    accepted: {
        type: Boolean, default: false
    },
    mutual: {
        type: Boolean, default: false
    }
});


module.exports = mongoose.model( 'friends', friendShipModel ); 
