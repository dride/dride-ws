'use strict';


var path = require("path");
var validator = require('validator');
var fs = require('fs');

var config = require('../../config/environment');
var fileNames   = [];

// Get list of clips that have a speed over 90MPH
exports.index = function(req, res) {


	var gpsClipsFolder = path.join(__dirname, '../../../..', 'modules/video/gps/');
	
	fileNames   = [];

	var files = fs.readdirSync(gpsClipsFolder);
	for (var i in files) {

	  if (files[i] != '.json' )
	  	continue;

	  files[i] = (files[i].split('.'))[0]
	  console.log(files[i])
	  fileNames.push(files[i]);
	}


    res.json({data: 
    				fileNames
    		});


};


