var responses = require("../responses")();

var postServiceController = function (Value)
{
    var post = function ( req, res )
    {
       
        var value = new Value( req.body );
        value.serviceProvider = req.decoded._doc._id;

        value.save( function ( err )
        {
            if ( err )
            {
                responses.failureInput(req, res, err);
            }
            else
            {
                responses.successfulInput(req, res, "Service has been inserted");
            }
        })
            
    }

    return {
        post: post
    }
}

module.exports = postServiceController;