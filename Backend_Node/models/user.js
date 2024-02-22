var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
   password: {
        type: String,
    },
    fullName: {
        type: String,
    },
    profileImg: {
        type: String,
    },
    countryCode: {
        type: String,
        default: ''
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
        default: ''
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date
    }
});

var userModel = mongoose.model('users', userSchema);

module.exports = userModel;