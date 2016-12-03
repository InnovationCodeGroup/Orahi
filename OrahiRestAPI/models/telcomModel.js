var mongoose = require( 'mongoose' ),
    Schema = mongoose.Schema;

var telcomModel = new Schema( {
    identifier: { type: String },
    name: { type: String }
});


module.exports = mongoose.model( 'telcom', telcomModel ); 