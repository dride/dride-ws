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
      rimraf("/dride/clip/", () => {
		fs.mkdirSync("/dride/clip");
        resolve();
      });
    } catch (err) {
      reject();
    }
  });
  var p2 = new Promise((resolve, reject) => {
    try {
      rimraf("/dride/thumb/", () => {
		fs.mkdirSync("/dride/thumb");
        resolve();
      });
    } catch (err) {
      reject();
    }
  });
//   var p3 = new Promise((resolve, reject) => {
//     try {
//       rimraf("/dride/gps/", () => {
// 		fs.mkdirSync("/dride/gps");
//         resolve();
//       });
//     } catch (err) {
//       reject();
//     }
//   });


  // add p3 for GPS
  Promise.all([p1, p2]).then(values => { 
	res.json({ status: "1" });
  });

  
};
