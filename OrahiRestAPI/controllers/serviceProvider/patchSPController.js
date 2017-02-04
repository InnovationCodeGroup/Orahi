var serviceProviderModel = require( '../../models/serviceProviderModel' );
var fs = require('fs');
var responses = require("../responses")();

var patchUserController = function ()
{
    var patch = function ( req, res )
    {
        if ( req.body._id )
            delete req.body._id;
        if ( req.body.trust )
            delete req.body.trust
        if ( req.body.image )
        {
            serviceProviderModel.findOne( { _id: req.decoded._doc._id }, function ( err, serviceProvider )
            {
                if ( serviceProvider.image && fs.existsSync( serviceProvider.image ) )
                {
                    fs.unlinkSync( serviceProvider.image )
                }
                if ( serviceProvider.logo && fs.existsSync( serviceProvider.logo ) )
                {
                    fs.unlinkSync( serviceProvider.logo )
                }
            })
        }
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
                responses.successfulInput(req,res, "Service Provider has been updated");
            }
        });
    }
    return {
        patch: patch
    }
}

module.exports = patchUserController;

