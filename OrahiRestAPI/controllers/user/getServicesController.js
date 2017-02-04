var responses = require("../responses")();
var mongoose = require("mongoose");

var getController = function (Value) {
    var get = function (req, res) {

        var query = {};
        if (req.query.serviceProvider) {
            query.serviceProvider = req.query.serviceProvider;

            Value.aggregate([
                {
                    $lookup:
                    {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
                { $match: { serviceProvider: mongoose.Types.ObjectId(query.serviceProvider) } }
            ], function (err, value) {
                if (err) {
                    responses.failureOutput(req, res, err);
                }
                else{
                    responses.successfulOutput(req, res, value);
                    }
                }
            );
        } else {
            responses.failureOutput(req, res, "No service provider given.");
        }
    }
    return {
        get: get
    }
}

module.exports = getController;