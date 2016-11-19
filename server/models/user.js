'use strict';
const mongoose = require('mongoose');

let userSchema = mongoose.Schema({

    local: {
        email: { type : String , unique : true, required : true },
        password: { type : String , unique : false, required : true },
        username: { type : String , unique : true, required : true },
        joinDate: Date,
		token: String
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.local.password;
    delete obj.local.email;
    delete obj.resetPasswordExpires;
    delete obj.resetPasswordToken;
    delete obj.__v;
    return obj;
};
module.exports = mongoose.model('User', userSchema);