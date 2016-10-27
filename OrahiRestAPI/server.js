var express = require( 'express' ),
    mongoose = require( 'mongoose' ),
    bodyParser = require( 'body-parser' ),
    morgan = require( 'morgan' ),
    jwt = require( 'jsonwebtoken' ),
    config = require( './config' ),
    User = require( './models/userModel' );

var environment = process.env.ENV;
var db = mongoose.connect( config.database ); //connect to the database

var app = express();
var port = process.env.PORT || 1337;

app.set( 'userSecret', config.userSecret ); //secret variable
app.set( 'adminSecret', config.adminSecret ); //secret variable
app.set( 'serviceProviderSecret', config.serviceProviderSecret ); //secret variable
app.use( bodyParser.urlencoded( { extended: true }) );
app.use( bodyParser.json() );


require( './controllers/user/UserController' )(app);
require( './controllers/serviceProvider/ServiceProviderController' )( app );
require( './controllers/admin/adminController' )( app );

//var postRouter = require( './routes/postRoutes' )();
//var putRouter = require( './routes/putRoutes' )();
//var patchRouter = require( './routes/patchRoutes' )();
//var deleteRouter = require( './routes/deleteRoutes' )();


//app.use( '/api', postRouter );
//app.use( '/api', putRouter );
//app.use( '/api', patchRouter );
//app.use( '/api', deleteRouter );

app.get( '/', function ( req, res )
{
    res.send( 'Welcome to my API' );
})

app.listen( port, function ()
{
    console.log( 'Running on port: ' + port );
});