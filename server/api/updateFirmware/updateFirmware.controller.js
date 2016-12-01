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
var fileNames   = [];


// Get list of getPOLists
exports.index = function(req, res) {
 

	//receive a zip with the new firmware and updates the files.

	var version = req.param('version');
	var pathToReleaseZip = 'https://github.com/dride/dride-ws/archive/'+ version +'.tar.gz';

	var dest = path.join(__dirname, '../../../..', 'dride-ws/');
	var tmpDest = path.join(__dirname, '../../../..', 'tmpFirmware/');
	// Streams 
	var read = request.get(pathToReleaseZip);
	var write = targz().createWriteStream(tmpDest);
	


	read.pipe(write)
	.on( 'finish', function(){
		//remove the current firmware
		rmdir(dest, function (err, dirs, files) {
			//gitHub have a version on the folder name so we move the files one dir higher
			mv(tmpDest + 'dride-ws-' + version, dest.replace(/\/$/, "") , function(err) {
				if (err)
					res.json({ "status": "0", "reason": err });

				//remove tmpFirmware dir
				rmdir(tmpDest);

			});

		});


		res.json({ "status": "1", "reason": "OK!" });
	});




};

