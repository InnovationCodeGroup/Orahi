var fs = require('fs');
var path = require('path');
var express = require( 'express' );

var readImage = function () {
     var router = express.Router();
     router.get('', function (req, res) {
         var imageDir = req.query.image;
         var ext = path.extname( imageDir ).toLowerCase();
         if (ext === '.png' || ext === '.jpg'){
            fs.readFile(imageDir, function(err, data){
                if (err) {
                    console.log(err);
                    if (err.code === "ENOENT") {
                        var message = "No such file or directory";
                        res.send({success: false, message: message});
                    }else
                        res.send({ success: false, message: err });
                    //throw err;
                }else{
                    if (ext === '.png') res.writeHead(200, { 'Content-Type': 'image/png' });
                    if (ext === '.jpg') res.writeHead(200, { 'Content-Type': 'image/jpg' });
                    res.end(data, 'binary');
                }

            });
         }else{
            res.json({ success: false, message: 'Image non existant in the system' })
         }
     });

     return router;
}

module.exports = readImage;