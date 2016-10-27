var express = require( 'express' );
  
var userController = function ( app )
{
    //Sign up new users
    var userSignUpRouter = require( '../../routes/user/userSignUp' )();
    app.use( '/api/user', userSignUpRouter );

    //Login user
    var userLoginRouter = require( '../../routes/user/userLogin' )( app );
    app.use( '/api/user', userLoginRouter );

    var getRouter = require( '../../routes/user/getServicesRoutes' )( app );
    //var getRouterById = require( '../../routes/user/getRouteById' )( app );
    app.use( '/api/user', getRouter );
    //app.use( '/api/user', getRouterById );
}

module.exports = userController;
