"use strict";

// Return the settings object from /defaults.cfg in JSON format

var path = require("path"),
  fs = require("fs"),
  ini = require("ini"),
  rimraf = require("rimraf");

var config = require("../../config/environment");
var fileNames = [];

// Get list of getPOLists
exports.index = function(req, res) {
  //delete clip, thumb & gps file
  var p1 = new Promise((resolve, reject) => {
    try {
      rimraf("/home/Cardigan/modules/video/clip/", () => {
		fs.mkdirSync("/home/Cardigan/modules/video/clip");
        resolve();
      });
    } catch (err) {
      reject();
    }
  });
  var p2 = new Promise((resolve, reject) => {
    try {
      rimraf("/home/Cardigan/modules/video/thumb/", () => {
		fs.mkdirSync("/home/Cardigan/modules/video/thumb");
        resolve();
      });
    } catch (err) {
      reject();
    }
  });
  var p3 = new Promise((resolve, reject) => {
    try {
      rimraf("/home/Cardigan/modules/video/gps/", () => {
		fs.mkdirSync("/home/Cardigan/modules/video/gps");
        resolve();
      });
    } catch (err) {
      reject();
    }
  });



  Promise.all([p1, p2, p3]).then(values => { 
	res.json({ status: "1" });
  });

  
};
