var express = require('express'),
    cors = require('cors'),
    mongoose = require( 'mongoose' ),
    bb = require( 'express-busboy' ),
    dateFormat = require( 'dateformat' ),
    morgan = require( 'morgan' ),
    jwt = require( 'jsonwebtoken' ),
    config = require( './config' ),
    User = require( './models/userModel' ),
    path = require( 'path' ),
    fs = require('fs'),
    swaggerJSDoc = require('swagger-jsdoc');


var environment = process.env.ENV;
var db = mongoose.connect( config.database ); //connect to the database

/*********************************
* swagger spec definition
*/
var swaggerDefinition = {
  info: {
    title: 'Orahi API',
    version: '1.0.0',
    description: 'Documentation of the Orahi RESTful API with Swagger'
  },
  host: 'localhost:1337',
  basePath: '/'
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js']
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

/*
* End of swagger spec definition
*********************************/

var app = express();
var port = process.env.PORT || 1337;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
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

//Server Homepage
app.get( '/', function ( req, res )
{
    res.send( 'Welcome to my API' );
})
// serve swagger spec
app
  .get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.listen( port, function ()
{
    console.log( 'Running on port: ' + port );
});