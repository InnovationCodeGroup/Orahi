var mongoose = require('mongoose');
var responses = require("../responses")();

var getController = function ( Value, friends )
{
    var get = function ( req, res )
    {
        var userId = req.decoded._doc._id;
        var query = {};
        if ( req.query.friendId )
        {
            friends.aggregate( [
                {
                    $lookup:
                    {
                        from: "logs",
                        localField: "friendId",
                        foreignField: "userId",
                        as: "friendLog"
                    }
                },
                { $unwind: "$friendLog" },
                { $match: { "userId": mongoose.Types.ObjectId( userId ), "friendLog.userId": mongoose.Types.ObjectId( req.query.friendId ) } },
                { $project: { friendLog: 1 } }
            ], function ( err, result )
            {
                if ( err )
                {
                    responses.failureOutput(req, res, err);
                } else if ( result.length == 0 )
                {
                    responses.dataConflict(req, res, "You do not have logs");
                } else if ( result.length > 0 )
                {
                    responses.successfulOutput(req, res, result);
                }
            })
        } else
        {
            Value.find( { userId: userId }, function ( err, value )
            {
                if ( err )
                {
                    responses.failureOutput(req, res, err);
                } else if ( value.length == 0 )
                {
                    responses.failureOutput(req, res, "You do not have any logs");
                } else if ( value.length > 0 )
                {
                    responses.successfulOutput(req, res, value);
                }
            })
        }


    }

    return {
        get: get
    }
}

module.exports = getController;