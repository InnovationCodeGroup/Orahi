var mongoose = require( 'mongoose' ),
    Schema = mongoose.Schema;

var bankModel = new Schema( {
    name: {
        type: String
    },
    availability: {
        type: String
    },
    service: {
        type: String
    },
    location: {
        lat: {
            type: string
        },
        lng: {
            type: string
        }
    },
    contact: {
        phone: {
            type: string
        },
        email: {
            type: string
        },
        address: {
            type: string
        }
    }
});

module.exports = mongoose.model( 'Bank', bankModel );