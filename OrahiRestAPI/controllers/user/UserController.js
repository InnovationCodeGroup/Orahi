var express = require( 'express' );
  
var userController = function ( app, imageDir )
{
    imageDir = imageDir + '/users/';

    //Sign up new users
    var userSignUpRouter = require( '../../routes/user/userSignUp' )( imageDir );
    app.use( '/api/user', userSignUpRouter );

    //Login user
    var userLoginRouter = require( '../../routes/user/userLogin' )( app );
    app.use( '/api/user', userLoginRouter );

    var getServicesRouter = require( '../../routes/user/getServicesRoutes' )( app );
    app.use( '/api/user', getServicesRouter );

    var getSPRouter = require( '../../routes/user/getServiceProviders' )( app );
    app.use( '/api/user', getSPRouter );

    var getRouterById = require( '../../routes/user/getRouteById' )( app );
    app.use('/api/user', getRouterById);

    var getSPById = require('../../routes/user/getSPById')(app);
    app.use('/api/user', getSPById);

    //Friend Module
    //Get a single user
    var singleUser = require( '../../routes/user/friends/getUser' )( app );
    app.use( '/api/user', singleUser );

    //Post router for the various services that the service providers feed in
    var postRating = require( '../../routes/user/postRating' )( app );
    app.use( '/api/user', postRating );

    //Post router for the various services that the service providers feed in
    var makePayment = require( '../../routes/user/Payment/makePayment' )( app );
    app.use( '/api/user', makePayment );

    //Post router for the following friends
    var follow = require( '../../routes/user/friends/follow' )( app );
    app.use( '/api/user', follow );

    //Patch router for the various updates made to the friend model
    var updateFriend = require( '../../routes/user/friends/updateFriend' )( app );
    app.use( '/api/user', updateFriend );

    //Router to retrieve telecom providers
    var getTelecom = require( '../../routes/user/getTelecom' )( app );
    app.use( '/api/user', getTelecom );

    //Router to retrieve telecom providers
    var getLogs = require( '../../routes/user/getLogs' )( app );
    app.use( '/api/user', getLogs );

    //Router to patch user providers
    var patchUser = require( '../../routes/user/patchUser' )( app, imageDir );
    app.use( '/api/user', patchUser );

}

module.exports = userController;
