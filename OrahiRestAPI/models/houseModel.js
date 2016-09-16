var mongoose = require( 'mongoose' ),
    Schema = mongoose.Schema;

var hotelModel = new Schema( {
    name: {
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

module.exports = mongoose.model( 'Hotel', hotelModel );