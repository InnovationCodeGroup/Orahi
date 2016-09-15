var express = require( 'express' );

var postRoutes = function ( Value, uriPath )
{
    /*Start Router*/
    var router = express.Router();
    router.route( uriPath )
        .post( function ( req, res )
        {
            var value = new Value( req.body );
            //console.log( book );
            //res.send( book );
            value.save();
            res.status( 201 ).send( value );

        })

    /*End Router*/

    return router;
}

module.exports = postRoutes;