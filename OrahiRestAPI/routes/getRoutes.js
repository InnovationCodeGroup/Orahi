var express = require( 'express' );

var getRoutes = function ( Value, uriPath )
{
    /*Start Router*/
    var router = express.Router();
    router.route( uriPath )
        .get( function ( req, res )
        {

            Value.find( function ( err, values )
            {
                if ( err )
                    res.status( 500 ).send( err );
                else
                    res.json( values );
            })

        });

    /*End Router*/

    return router;
}

module.exports = getRoutes;