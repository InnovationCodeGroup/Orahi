var postController = function ( Value )
{
    var post = function ( req, res )
    {
        var value = new Value( req.body );
        value.save( function ( err )
        {
            if ( err )
            {
                res.status( 500 );
                res.send( err );
            }
            else
            {
                res.status( 201 );
                res.json( value );
            }
        });        
    }

    return {
        post: post
    }
}

module.exports = postController;