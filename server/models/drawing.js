'use strict';
const mongoose = require('mongoose');

let drawingSchema = mongoose.Schema({

    byUsername: { type : String , required : true },
	drawingName: { type : String , required : true },
	drawingData: { type : String , required : true },
	createdAt: Date

});

module.exports = mongoose.model('Drawing', drawingSchema);