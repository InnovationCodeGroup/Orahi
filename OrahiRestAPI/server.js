var express = require( 'express' ),
    mongoose = require( 'mongoose' ),
    bb = require( 'express-busboy' ),
    dateFormat = require( 'dateformat' ),
    morgan = require( 'morgan' ),
    jwt = require( 'jsonwebtoken' ),
    config = require( './config' ),
    User = require( './models/userModel' ),
    path = require( 'path' ),
    fs = require('fs');

var environment = process.env.ENV;
var db = mongoose.connect( config.database ); //connect to the database

var app = express();
var port = process.env.PORT || 1337;

app.set( 'userSecret', config.userSecret ); //secret variable
app.set( 'adminSecret', config.adminSecret ); //secret variable
app.set( 'serviceProviderSecret', config.serviceProviderSecret ); //secret variable
var filePath = path.join( __dirname, 'images/tmp' );
var imageDir = ( path.join( __dirname, 'images' ) ).replace( /\\/g, '/' );

require( './makeImageFolders' );


bb.extend( app, {
    upload: true,
    path: filePath,
    allowedPath: /./
});

require( './controllers/user/UserController' )( app, imageDir );
require( './controllers/serviceProvider/ServiceProviderController' )( app, imageDir );
require( './controllers/admin/adminController' )( app, imageDir );
require( './controllers/readImage' )( app );
require( './controllers/financial/financialController' )( app );


app.get( '/', function ( req, res )
{
    res.send( 'Welcome to my API' );
})

app.listen( port, function ()
{
    console.log( 'Running on port: ' + port );
});