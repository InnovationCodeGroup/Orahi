var express = require( 'express' );

var serviceProviderController = function ( app, imageDir )
{
    imageDir = imageDir + '/serviceProviders/';
    //Register service provider

    var postRouter = require( '../../routes/serviceProvider/postSPRoutes' )( imageDir );
    app.use( '/api/serviceProvider', postRouter );

    //Login service provider
    var spLoginRouter = require( '../../routes/serviceProvider/spLogin' )( app );
    app.use( '/api/serviceProvider', spLoginRouter );

    //Delete router for deleting services by the service provider
    var patchServiceProvider = require( '../../routes/serviceProvider/patchServiceProvider' )( app, imageDir );
    app.use( '/api/serviceProvider', patchServiceProvider );

    //Post router for the various services that the service providers feed in
    var postService = require( '../../routes/serviceProvider/postService' )( app, imageDir );
    app.use( '/api/serviceProvider', postService );

    //Get Services router
    var getServices = require( '../../routes/serviceProvider/getServices' )( app );
    app.use( '/api/serviceProvider', getServices );

    //Delete router for deleting services by the service provider
    var getServiceById = require( '../../routes/serviceProvider/getServiceById' )( app );
    app.use( '/api/serviceProvider', getServiceById );

    //Delete router for deleting services by the service provider
    var patchService = require( '../../routes/serviceProvider/patchService' )( app, imageDir );
    app.use( '/api/serviceProvider', patchService );

    //Delete router for deleting services by the service provider
    var putService = require( '../../routes/serviceProvider/putService' )( app, imageDir );
    app.use( '/api/serviceProvider', putService );

    //Delete router for deleting services by the service provider
    var deleteService = require( '../../routes/serviceProvider/deleteService' )( app );
    app.use( '/api/serviceProvider', deleteService );

}

module.exports = serviceProviderController;