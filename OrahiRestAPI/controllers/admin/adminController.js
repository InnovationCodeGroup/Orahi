var express = require( 'express' );

var adminController = function ( app, imageDir )
{
    imageDir = imageDir + '/admin/';

    //Sign up new users
    var userSignUpRouter = require( '../../routes/user/userSignUp' )( imageDir );
    app.use( '/api/admin', userSignUpRouter );

    //Login user
    var adminLoginRouter = require( '../../routes/admin/adminLogin' )( app );
    app.use( '/api/admin', adminLoginRouter );

    //Router to retrieve service providers
    var serviceProvider = require( '../../routes/admin/getServiceProviders' )( app );
    app.use( '/api/admin', serviceProvider );

    //Router to retrieve system users
    var users = require( '../../routes/admin/getUsers' )( app );
    app.use( '/api/admin', users );

    //Router to retrieve system users
    var telcom = require( '../../routes/admin/postTelcom' )( app );
    app.use( '/api/admin', telcom );

    //Router to retrieve telecom providers
    var getTelecom = require( '../../routes/admin/getTelecom' )( app );
    app.use( '/api/admin', getTelecom );

    //Router to input industrial ratings
    var industrialRatings = require( '../../routes/admin/postIndustrialRating' )( app );
    app.use( '/api/admin', industrialRatings );

    //Router to update industrial ratings
    var updateIndustrialRating = require( '../../routes/admin/updateIndustrialRating' )( app );
    app.use( '/api/admin', updateIndustrialRating );

}

module.exports = adminController;