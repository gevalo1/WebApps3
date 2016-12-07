'use strict';
const userHandle = require('./api/auth/userHandle');
const drawHandle = require('./api/draw/drawingHandle');

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
	
	
	app.post('/api/drawing', (req, res, next) => {
		drawHandle.handle(req, res);
	});
	
	app.get('/api/drawing', (req, res, next) => {
		drawHandle.handle(req, res);
	});
	
	app.get('/api/drawingLimited', (req, res, next) => {
		drawHandle.handle(req, res);
	});

};