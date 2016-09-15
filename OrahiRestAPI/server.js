var express = require( 'express' ),
    mongoose = require( 'mongoose' ),
    bodyParser = require( 'body-parser' );

var environment = process.env.ENV;
//var db = mongoose.connect( 'mongodb://localhost/OrahiAPI' );
var db = mongoose.connect( 'mongodb://localhost/bookAPI' );

/*Start database models*/
//var Hotel = require( './models/hotelModel' );
var Book = require( './models/bookModel' );
//var UserAccounts = requrie( './models/userModel' );
/*End database models*/

var app = express();
var port = process.env.PORT || 1337;

app.use( bodyParser.urlencoded( { extended: true }) );
app.use( bodyParser.json() );

getRouter = require( './routes/getRoutes' )( Book, '/Books' );
postRouter = require( './routes/postRoutes' )( Book, '/Books' );
getRouterById = require( './routes/getRouteById' )( Book, '/Books/:bookId' );
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