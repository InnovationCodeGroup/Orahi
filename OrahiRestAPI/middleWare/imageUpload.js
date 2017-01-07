var dateFormat = require( 'dateformat' ),
    fs = require( 'fs' ),
    path = require( 'path' );

var imageUpload = function ( imageDir )
{
    var updateReq = false;
    var i = 0;
    var callback = function ( files, imageDir, date, imageType, req )
    {
        image = date + '_' + imageType + path.extname( files.filename ).toLowerCase();
        ext = path.extname( files.filename ).toLowerCase();
        imagePath = imageDir + image;
        targetPath = path.resolve( imagePath );
        tempPath = files.file;

        if ( fs.existsSync( targetPath ) )
        {
            fs.unlinkSync( targetPath )
        }
        fs.rename( tempPath, targetPath, function ( err )
        {
            if ( err )
            {
                throw err;
            }
        });
    }
    var use = function ( req, res, next )
    {
        var now = new Date();
        var date = dateFormat( now.request_date, "yyyy-mm-dd_hMMss" );
        if ( !req.files )
        {
            next();
        } else
        {

            var files = req.files;
            var imageArray = [];
            for ( item in files )
            {
                imageArray.push( item );
            }

            for ( i = 0; i < imageArray.length; i++ )
            {
                if ( path.extname( files[imageArray[i]].filename ).toLowerCase() === '.png' || path.extname( files[imageArray[i]].filename ).toLowerCase() === '.jpg' )
                {
                    req.body[imageArray[i]] = imageDir + ( date + '_' + imageArray[i] + path.extname( files[imageArray[i]].filename ).toLowerCase() );
                    callback( files[imageArray[i]], imageDir, date, imageArray[i], req );
                }
                
            }

            if ( i === imageArray.length )
            {
                next();
            }
            

        }
    }

    return {
        use: use
    }
}

module.exports = imageUpload;