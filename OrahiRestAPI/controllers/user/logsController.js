var mongoose = require( 'mongoose' );

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
                    res.status( 500 );
                    res.send( err );
                } else if ( result.length == 0 )
                {
                    res.status( 500 );
                    res.json( { Success: false, message: "You do not have any logs" });
                } else if ( result.length > 0 )
                {
                    console.log( result.friendLog );
                    res.json( result );
                }
            })
        } else
        {
            Value.find( { userId: userId }, function ( err, value )
            {
                if ( err )
                {
                    res.status( 500 );
                    res.send( err );
                } else if ( value.length == 0 )
                {
                    res.status( 500 );
                    res.json( { Success: false, message: "You do not have any logs" });
                } else if ( value.length > 0 )
                {
                    res.json( value );
                }
            })
        }


    }

    return {
        get: get
    }
}

module.exports = getController;