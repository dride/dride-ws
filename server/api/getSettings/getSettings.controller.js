'use strict';

// Return the settings object from /defaults.cfg in JSON format

var path = require("path");

var fs = require('fs')
  , ini = require('ini')


var config = require('../../config/environment');
var fileNames   = [];

// Get list of getPOLists
exports.index = function(req, res) {

	var defaults = path.join(__dirname, '../../../..', 'defaults.cfg');
	var config = ini.parse(fs.readFileSync(defaults, 'utf-8'))

	res.json(config);
   


};


