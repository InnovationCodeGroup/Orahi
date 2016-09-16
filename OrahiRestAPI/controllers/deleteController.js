var deleteController = function ()
{
    var del = ( function ( req, res )
    {
        req.value.remove( function ( err )
        {
            if ( err )
            {
                res.status( 500 );
                res.send( err );
            }
            else
            {
                res.status( 201 );
                res.send( 'Removed' );
            }
        });       
    })

    return {
        del: del
    }
}

module.exports = deleteController;