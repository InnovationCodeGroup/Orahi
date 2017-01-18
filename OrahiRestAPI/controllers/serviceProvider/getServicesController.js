var responses = require("../responses")();
var category = require("../../models/categoryModel")();

var getController = function (Value)
{
    var get = function (req, res) {
        var query = {};
        if (req.query.serviceType) {
            query.serviceType = req.query.serviceType;
        }
        if (req.query.category) {
            query.category = req.query.category;
        }
        if (req.decoded._doc._id) {
            query.serviceProvider = req.decoded._doc._id;
        }

        //Value.aggregate([
        //    {
        //        $lookup:
        //        {
        //            from: "category",
        //            localField: "category",
        //            foreignField: "_id",
        //            as: "category"
        //        }
        //    },
        //    { $unwind: "$category" },
        //    { $match: query }
        //], function (err, value) {
        //    if (err)
        //    {
        //        responses.failureOutput(req, res, err);
        //    }
        //    else {
        //        responses.successfulOutput(req, res, value);
        //    }
        //});

            
        Value.find(query, function ( err, value )
        {
            if ( err )
            {
                responses.failureOutput(req, res, err);
            }
            else {
                responses.successfulOutput(req, res, value);
            }
        })

    }

    return {
        get: get
    }
}

module.exports = getController;