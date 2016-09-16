﻿var putController = function ()
{
    var put = ( function ( req, res )
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
                res.status( 500 );
                res.send( err );
            }
            else
            {
                res.status( 201 );
                res.json( req.value );
            }
        });           
    })

    return {
        put: put
    }
}

module.exports = putController;