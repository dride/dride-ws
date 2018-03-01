'use strict';


var path = require("path");
var validator = require('validator');
var fs = require('fs');


;
var fileNames = [];

// Get list of getPOLists
exports.index = function (req, res) {

  var savedVideos = path.join(__dirname, '../../../..', 'modules/video/savedVideos.json');
  if (fs.existsSync(savedVideos)) {
    var EMRvideos = fs.readFileSync(savedVideos, 'utf8')
    res.json({
      data: JSON.parse(EMRvideos)
    });
  } else {
    res.json({
      data: []
    });
  }
};
