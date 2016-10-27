var router = express.Router();

var serviceProviderController = function ( app )
{
    var postRouter = require( '../routes/postRoutes' )( app );
    var patchRouter = require( '../routes/patchRoutes' )( app );
    var putRouter = require( '../routes/putRoutes' )( app );
    var deleteRouter = require( '../routes/deleteRoutes' )( app );
    app.use( '/api/user', postRouter );
    app.use( '/api/user', patchRouter );
    app.use( '/api/user', putRouter );
    app.use( '/api/user', deleteRouter );
}

module.exports = userController;