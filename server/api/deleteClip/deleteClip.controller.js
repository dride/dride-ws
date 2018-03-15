'use strict';

var path = require('path'),
	fs = require('fs');
var fileNames = [];

exports.index = function(req, res) {
	//TODO: Validate the input type's
	var videoId = req.param('videoId');

	//delete clip, thumb & gps file
	var videoModulePath = '/dride/thumb/';
	try {
		fs.unlinkSync(videoModulePath + 'clip/' + videoId + '.mp4');
	} catch (err) {
		console.log(err);
	}

	try {
		fs.unlinkSync(videoModulePath + 'thumb/' + videoId + '.jpg');
	} catch (err) {
		console.log(err);
	}

	try {
		fs.unlinkSync(videoModulePath + 'gps/' + videoId + '.json');
	} catch (err) {
		console.log(err);
	}

	//remove video from savedVideos.json
	var savedVideosPath = videoModulePath + 'savedVideos.json';
	var EMRvideos = JSON.parse(fs.readFileSync(savedVideosPath, 'utf8'));
	for (var i = 0; i < EMRvideos.length; i++) {
		if (EMRvideos[i].key == videoId) {
			EMRvideos.splice(i, 1);
		}
	}
	fs.writeFileSync(savedVideosPath, JSON.stringify(EMRvideos));

	res.json({
		status: '1'
	});
};
