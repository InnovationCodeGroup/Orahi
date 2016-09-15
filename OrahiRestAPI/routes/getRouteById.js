var express = require( 'express' );

var getRouteById = function ( Value , uriPath)
{
    /*Start Router*/
    var router = express.Router();
    router.route( uriPath )
        .get( function ( req, res )
        {

            Value.findById( req.params.bookId, function ( err, value )
            {
                if ( err )
                    res.status( 500 ).send( err );
                else
                    res.json( value );
            })

        });

    /*End Router*/

    return router;
}

module.exports = getRouteById;