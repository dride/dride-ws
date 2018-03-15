'use strict';

var path = require('path');
var validator = require('validator');

var fileNames = [];

// Get list of getPOLists
exports.index = function(req, res) {
	var videoClipsFolder = '/dride/thumb/';
	var fs = require('fs');

	fileNames = [];

	var files = fs.readdirSync(videoClipsFolder);
	for (var i in files) {
		if (files[i] == '.DS_Store' || files[i] == '.gitignore') continue;

		files[i] = files[i].split('.')[0];

		fileNames.push(files[i]);
	}

	res.json({
		data: fileNames
	});
};
