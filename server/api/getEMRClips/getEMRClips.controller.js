'use strict';


var path = require("path");
var validator = require('validator');
var fs = require('fs');


var config = require('../../config/environment');
var fileNames   = [];

// Get list of getPOLists
exports.index = function(req, res) {

	var savedVideos = path.join(__dirname, '../../../..', 'modules/video/savedVideos.json');

	var EMRvideos  = fs.readFileSync(savedVideos, 'utf8').split(',')
	EMRvideos.shift()



    res.json({data: 
		EMRvideos
    	});


};


