'use strict';
const Drawing = require("../../models/drawing");

module.exports.handle =
    function handle(req, res) {
		const target = req.method;
        switch (target) {
            case 'POST':
				postDrawing(req, res);
                break;
            case 'GET':
				getDrawings(req, res);
                break;
            default:
                res.end;
                break;
        }
		
		function postDrawing(req, res) {
			
			let db = new Drawing({
				byUsername: req.body.user.username,
				drawingName: req.body.drawingName,
				drawingData: req.body.canvas,
				createdAt: new Date()
			});
			
			db.save();
			res.json("success");
		}
		
		function getDrawings(req, res) {
			Drawing.find( {} ).sort( {createdAt: -1} ).exec((err, result) => {
				if (result) {
					req.result = result;
					res.json(req.result);
				} else {
					res.status(500).send("Something went wrong while retrieving all drawings from the database.");
				}
			});
		}
		
	};