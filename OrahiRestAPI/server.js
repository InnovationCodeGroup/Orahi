var express = require( 'express' ),
    mongoose = require( 'mongoose' ),
    bodyParser = require( 'body-parser' );

var environment = process.env.ENV;
//var db = mongoose.connect( 'mongodb://localhost/OrahiAPI' );
var db = mongoose.connect( 'mongodb://localhost/bookAPI' );


var app = express();
var port = process.env.PORT || 1337;

app.use( bodyParser.urlencoded( { extended: true }) );
app.use( bodyParser.json() );

getRouter = require( './routes/getRoutes' )();
postRouter = require( './routes/postRoutes' )();
getRouterById = require( './routes/getRouteById' )();
app.use( '/api', getRouter );
app.use( '/api', postRouter );
app.use( '/api', getRouterById );

app.get( '/', function ( req, res )
{
    res.send( 'Welcome to my API' );
})

app.listen( port, function ()
{
    console.log( 'Running on port: ' + port );
});