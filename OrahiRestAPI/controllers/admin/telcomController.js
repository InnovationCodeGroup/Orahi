var responses = require("../responses")();
var telcomController = function (Value)
{
    var post = function ( req, res )
    {
        Value.find( { identifier: req.body.identifier }, function ( err, result )
        {
            if ( err )
            {
                res.status( 500 );
                res.send( err );
            }
            var resultLength = Object.keys( result ).length;
            if ( resultLength != 0 )
            {

                responses.dataConflict(req, res, "Telecom identifier already exists");

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
                        responses.successfulInput(req, res, "Telecom registered");
                    }
                })
            }
        })      
            
    }

    return {
        post: post
    }
}

module.exports = telcomController;