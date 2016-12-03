var patchController = function ()
{
    var patch = function ( req, res )
    {
        if ( req.body._id )
            delete req.body._id;
       
        if ( req.body.image )
        {
            UserModel.findOne( { _id: req.decoded._doc._id }, function ( err, user )
            {
                if ( user.image1 && fs.existsSync( user.image1 ) )
                {
                    fs.unlinkSync( user.image1 )
                }
                if ( user.image2 &&  fs.existsSync( user.image2 ) )
                {
                    fs.unlinkSync( user.image2 )
                }
                if ( user.image3 &&  fs.existsSync( user.image3 ) )
                {
                    fs.unlinkSync( user.image3 )
                }
                if ( user.image4 && fs.existsSync( user.image4 ) )
                {
                    fs.unlinkSync( user.image4 )
                }
                if ( user.image5 && fs.existsSync( user.image5 ) )
                {
                    fs.unlinkSync( user.image5 )
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

module.exports = patchController;