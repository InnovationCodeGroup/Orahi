var express = require( 'express' );
  
var readImageController = function ( app )
{

    //Image Router
    var readImageRouter = require( '../routes/image/readImage' )();
    app.use( '/api/readImage', readImageRouter );
}

module.exports = readImageController;