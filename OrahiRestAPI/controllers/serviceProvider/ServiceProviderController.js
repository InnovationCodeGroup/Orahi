var express = require( 'express' );

var serviceProviderController = function ( app )
{
    //Register service provider
    var postRouter = require( '../../routes/serviceProvider/postSPRoutes' )( app );
    app.use( '/api/serviceProvider', postRouter );

    //Login service provider
    var spLoginRouter = require( '../../routes/serviceProvider/spLogin' )( app );
    app.use( '/api/serviceProvider', spLoginRouter );

    //Post router for the various services that the service providers feed in
    var postServices = require( '../../routes/serviceProvider/postServices' )( app );
    app.use( '/api/serviceProvider', postServices );

}

module.exports = serviceProviderController;