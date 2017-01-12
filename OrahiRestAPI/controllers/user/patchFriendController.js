var responses = require("../responses")();

var patchController = function ()
{
    var patch = function ( req, res )
    {
        if ( req.decoded._doc._id == req.value.userId )
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
                    responses.successfulInput(req, res, "Friend association updated");
                }
            });
        }
        else
        {
            console.log( 'testing' );
        }
    }


    return {
        patch: patch
    }
}

module.exports = patchController;