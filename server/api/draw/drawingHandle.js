'use strict';
const User = require("../../models/drawing");

module.exports.handle =
    function handle(req, res) {
		const target = req.method;
        switch (target) {
            case 'POST':
				postDrawing(req, res);
                break;
            case 'GET':
				getDrawing(req, res);
                break;
            default:
                res.end;
                break;
        }
		
		function postDrawing(req, res) {
			console.log(req.body);
		}
		
		function getDrawing(req, res) {
			
		}
		
	};