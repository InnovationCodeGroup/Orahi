var responses = require("../responses")();
var putController = function ()
{
    var put = ( function ( req, res )
    {
        if ( req.decoded._doc._id === req.value.serviceProvider )
        {
            if ( req.body._id )
                delete req.body._id;
            for ( var p in req.body )
            {
                req.value[p] = req.body[p];
            }
            req.value.save( function ( err )
            {
                if ( err )
                {
                    responses.failureInput(req, res, err);
                }
                else
                {
                    responses.successfulInput(req, res, "Service Updated");
                }
            });
        }         
    })

    return {
        put: put
    }
}

module.exports = putController;