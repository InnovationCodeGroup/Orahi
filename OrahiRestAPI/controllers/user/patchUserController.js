var UserModel = require( '../../models/userModel' );
var fs = require('fs');
var responses = require("../responses")();

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
                responses.failureInput(req, res, err);
            }
            else
            {
                responses.successfulInput(req, res, "User updated");
            }
        });
    }
    return {
        patch : patch
    }
}

module.exports = patchUserController;

