'use strict';

// Return the settings object from /defaults.cfg in JSON format

var path = require("path"),
    fs = require('fs'),
    mv = require('mv'),
    https = require('https'),
    request = require('request'),
    targz = require('tar.gz'),
    rmdir = require('rmdir');



var config = require('../../config/environment');
var fileNames = [];


// Get list of getPOLists
exports.index = function(req, res) {


    //receive a zip with the new firmware and updates the files.

    var version = req.param('version');
    var pathToReleaseZip = 'https://codeload.github.com/dride/dride-ws/tar.gz/' + version;

    var dest = path.join(__dirname, '../../../..', 'dride-ws/');
    var tmpDest = path.join(__dirname, '../../../..', 'tmpFirmware/');

    //make sure tmpFirmware dir is present
    if (!fs.existsSync(tmpDest)){
        fs.mkdirSync(tmpDest);
    }

    //download firmware gz
    var file = fs.createWriteStream(tmpDest + "firmware.tar.gz");
    var request = https.get(pathToReleaseZip, function(response) {

        response.pipe(file).on('finish', function() {

            console.log('file downloaded')
            //remove the current firmware
            rmdir(dest, function(err, dirs, files) {

                // Extract firmware files
                targz().extract(tmpDest + "firmware.tar.gz", tmpDest)
                    .then(function() {
                        console.log('unzipped !')
                        //gitHub have a version on the folder name so we move the files one dir higher
                        mv(tmpDest + 'dride-ws-' + version, dest.replace(/\/$/, ""), function(err) {
                            console.log(err)
                            if (err)
                                res.json({ "status": "0", "reason": err });

                            //remove tmpFirmware dir
                            rmdir(tmpDest);


                        });
                        res.json({ "status": "1", "reason": "OK!" });

                    })
                    .catch(function(err) {
                        console.log('Something is wrong ', err.stack);
                        res.json({ "status": "0", "reason": err.stack });
                    });




            });







        });
    });








};
