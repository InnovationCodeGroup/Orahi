var serviceProviderModel = require( '../../models/serviceProviderModel' );
var fs = require( 'fs' );

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
                res.status( 500 );
                res.send( err );
            }
            else
            {
                res.status( 201 );
                res.json( req.value );
            }
        });
    }
    return {
        patch: patch
    }
}

module.exports = patchUserController;

