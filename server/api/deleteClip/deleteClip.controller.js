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




};



