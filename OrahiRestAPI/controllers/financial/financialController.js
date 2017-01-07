var express = require( 'express' );

var financialController = function ( app )
{
    //Login user
    var financialRouter = require( '../../routes/financial/financialRouter' )( app );
    app.use( '/api/financial', financialRouter );
}

module.exports = financialController;