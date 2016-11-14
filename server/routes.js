'use strict';
const userHandle = require('./api/auth/userHandle');

module.exports = function (app) {
	
	app.post('/api/signup', (req, res, next) => {
		userHandle.handle(req, res);
	});
	
	app.post('/api/login', (req, res, next) => {
		userHandle.handle(req, res);
	});

	app.get('/api/user', (req, res, next) => {
		userHandle.handle(req, res);
	});

};