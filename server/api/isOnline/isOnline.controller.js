'use strict';
var fs = require('fs');

// return 1 to indicate device is connected.
exports.index = function(req, res) {
	var state = '/home/Cardigan/state/app.json';
	fs.writeFile(
		state,
		JSON.stringify({
			connected: true,
			dte: new Date().getTime()
		}),
		err => {
			if (err) throw err;
		}
	);

	res.json({ status: '1' });
};
