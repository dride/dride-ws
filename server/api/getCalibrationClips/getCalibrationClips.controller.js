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
	var maxSpeedClipName;
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
	                //find max speed in file valued > 30
	                var maxSpeedInClip = 30
	                Object.keys(routeTrack).forEach(function(key) {

	                    if (parseInt(JSON.parse(routeTrack[key]).speed) > maxSpeedInClip) {
	                    	maxSpeedInClip = parseInt(JSON.parse(routeTrack[key]).speed)
	                    	maxSpeedClipName = files[i]
	                    }

	                });

	                if (maxSpeedInClip > 30)
                        fileNames.push({'filename': maxSpeedClipName, 'maxSpeed': maxSpeedInClip});



	            } catch (e) {
	                console.log('malformed request', data);

	            }
    }


    //sort and return only the 2 highest values
	var bySpeed = fileNames.slice(0);
	bySpeed.sort(function(a,b) {
	    return a.maxSpeed - b.maxSpeed;
	});


	res.json({data: 
			[bySpeed.pop().filename]
	});



};
