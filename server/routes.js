/**
 * Main application routes
 */

'use strict';

var path = require('path');
var express = require('express');
var config = require('./config/environment');

var cors = require('cors')



module.exports = function(app) {

  app.use(cors());

  // Insert routes below
  app.use('/api/getClips', require('./api/getClips'));
  app.use('/api/getSettings', require('./api/getSettings'));
  app.use('/api/setSetting', require('./api/setSetting'));
  app.use('/api/deleteClip', require('./api/deleteClip'));
  app.use('/api/updateFirmware', require('./api/updateFirmware'));
  app.use('/api/isOnline', require('./api/isOnline'));
  





  app.use("/modules", express.static(path.join(__dirname, '../../', 'modules/')));


};
