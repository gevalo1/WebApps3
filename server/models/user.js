'use strict';
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt-nodejs');

let userSchema = mongoose.Schema({

    local: {
        email: { type : String , unique : true, required : true },
        password: { type : String , unique : false, required : true },
        username: { type : String , unique : true, required : true },
        joinDate: Date
    },
    status: {
        online: {type: Boolean, default: false},
        room: String,
        lastOnline: Date
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

/*userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};*/
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