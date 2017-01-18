var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var categoryModel = new Schema({
    name: {
        type: String
    },
    serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'serviceProvider' }
});

module.exports = mongoose.model("Categories", categoryModel);