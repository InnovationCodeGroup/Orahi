var UserModel = require( '../../models/userModel' );
var fs = require( 'fs' );

var patchUserController = function ()
{
    var patch = function ( req, res )
    {
        if ( req.body._id )
            delete req.body._id;
        if ( req.body.adminReg )
            delete req.body.adminReg;
        if ( req.body.admin )
            delete req.body.admin
        if ( req.body.image )
        {
            UserModel.findOne( { _id: req.decoded._doc._id }, function ( err, user )
            {
                if ( fs.existsSync( user.image ) )
                {
                    fs.unlinkSync( user.image )
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
        patch : patch
    }
}

module.exports = patchUserController;

