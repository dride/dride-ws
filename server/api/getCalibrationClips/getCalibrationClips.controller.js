'use strict';


var path = require("path");
var validator = require('validator');
var fs = require('fs');

var config = require('../../config/environment');
var fileNames = [];

// Get list of clips that have a speed over 90MPH
exports.index = function(req, res) {


    var gpsClipsFolder = path.join(__dirname, '../../../..', 'modules/video/gps/');

    fileNames = [];

    var files = fs.readdirSync(gpsClipsFolder);
    for (var i in files) {

        if (files[i] == '.DS_Store' || files[i] == '.gitignore')
            continue;


        files[i] = (files[i].split('.'))[0]

        //scan the file to find if clip had driving on HW
        var currentGPSFile = path.join(__dirname, '../../../..', 'modules/video/gps/' + files[i] + '.json')
        var data = fs.readFileSync(currentGPSFile, 'utf8');

        	if (data)
	            try {
	                var routeTrack = JSON.parse(data);
	                //find speed valued > 90
	                Object.keys(routeTrack).forEach(function(key) {
	                    if (parseInt(JSON.parse(routeTrack[key]).speed) > 90) {
	                        fileNames.push(files[i]);
	                        return (files[i]);
	                    }
	                });

	            } catch (e) {
	                console.log('malformed request', data);

	            }
    }


	res.json({data: 
			fileNames
	});



};
