var express = require( 'express' );

var adminController = function ( app )
{
    //Login user
    var adminLoginRouter = require( '../../routes/admin/adminLogin' )( app );
    app.use( '/api/admin', adminLoginRouter );

    //Router to retrieve service providers
    var serviceProvider = require( '../../routes/admin/getServiceProviders' )( app );
    app.use( '/api/admin', serviceProvider );

    //Router to retrieve system users
    var users = require( '../../routes/admin/getUsers' )( app );
    app.use( '/api/admin', users );

}

module.exports = adminController;