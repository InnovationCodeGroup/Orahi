var postController = function ( Value )
{
    var post = function ( req, res )
    {
        var value = new Value( req.body );
        value.save();
        res.status( 201 );
        res.send( value );
    }

    return {
        post: post
    }
}

module.exports = postController;