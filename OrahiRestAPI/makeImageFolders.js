var fs = require( 'fs' );

var makeImageFolders = function ()
{
    if ( !fs.existsSync( './images/' ) )
    {
        fs.mkdirSync( './images/' );
    };
    if ( !fs.existsSync( './images/users/' ) )
    {
        fs.mkdirSync( './images/users/' );
    };
    if ( !fs.existsSync( './images/serviceProviders/' ) )
    {
        fs.mkdirSync( './images/serviceProviders/' );
    };
    if ( !fs.existsSync( './images/admin/' ) )
    {
        fs.mkdirSync( './images/admin/' );
    };
    if ( !fs.existsSync( './images/tmp/' ) )
    {
        fs.mkdirSync( './images/tmp/' );
    };

}

module.exports = makeImageFolders();