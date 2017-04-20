'use strict';

// Return the settings object from /defaults.cfg in JSON format

var path = require("path"),
	fs = require('fs'),
   	ini = require('ini')


var config = require('../../config/environment');
var fileNames   = [];


// Get list of getPOLists
exports.index = function(req, res) {


	//TODO: Validate the input type's
	var videoId = req.param('videoId');

	//delete clip, thumb & gps file
	var videoModulePath = path.join(__dirname, '../../../../modules/video/');
	try {
	    fs.unlinkSync(videoModulePath + 'clip/' + videoId + '.mp4');
	} catch (err) { console.log(err); }

	try {
	    fs.unlinkSync(videoModulePath + 'thumb/' + videoId + '.jpg');
	} catch (err) { console.log(err); }

	try {
	    fs.unlinkSync(videoModulePath + 'gps/' + videoId + '.json');
	} catch (err) { console.log(err); }



	//TODO: deal with remove from the cloud



	res.json({'status': '1'});
   



};



