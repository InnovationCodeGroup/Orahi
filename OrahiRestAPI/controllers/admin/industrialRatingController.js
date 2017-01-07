var responses = require("../responses")();

var industrialRatingController = function (Value)
{
    var post = function ( req, res )
    {
        Value.find( { serviceProviderId: req.body.serviceProviderId }, function ( err, result )
        {
            if ( err )
            {
                responses.failureInput(req, res, err);
            }
            var resultLength = Object.keys( result ).length;
            if ( resultLength != 0 )
            {
                responses.dataConflict(req, res, "Service provider rating already exists");
            }
            else if ( resultLength === 0 )
            {
                var value = new Value( req.body );

                value.save( function ( err )
                {
                    if ( err )
                    {
                        responses.failureInput(req, res, err);
                    }
                    else
                    {
                        responses.successfulInput(req, res, "Industrial rating set");
                    }
                })
            }
        })

    }

    return {
        post: post
    }
}

module.exports = industrialRatingController;