var responses = require("../responses")();

var deleteController = function ()
{
    var del = ( function ( req, res )
    {
        if ( req.decoded._doc._id === req.value.serviceProvider )
        {

            req.value.remove( function ( err )
            {
                if ( err )
                {
                    responses.failureInput(req, res, err);
                }
                else
                {
                    responses.successfulInput(req, res, "Service Removed");
                }
            });
        }      
    })

    return {
        del: del
    }
}

module.exports = deleteController;