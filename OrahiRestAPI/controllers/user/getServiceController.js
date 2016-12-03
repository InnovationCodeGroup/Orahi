var ratingModel = require( '../../models/ratingModel' );
var friendshipModel = require( '../../models/friendshipModel' );

var getController = function ( Value )
{
    var values;
    var get = function ( req, res )
    {

        var query = {};
        if ( req.query.serviceProvider )
        {
            query.serviceProvider = req.query.serviceProvider;

            Value.find( query, function ( err, results )
            {
                if ( err )
                {
                    res.status( 500 );
                    res.send( err );
                }
                else
                    values = results;
            })

        }

    }

    return {
        get: get
    }
}

module.exports = getController;