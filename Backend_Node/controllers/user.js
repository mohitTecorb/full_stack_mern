const userModel = require('../models/user');
const moment = require('moment-timezone');
var codes = { "success": 200, "create": 201, "update": 301, "badRequest": 401, "notFound": 404, "internal": 501 }
var message = {
    "success": "Success", "already": "Already Exists", "notFound": "Data not found", "internal": "Internal Server Error", "BadRequest": "Bad request",
    "accountBlock": "Account Blocked by Admin", "invalidPass": "Password not Match with old Password"
}

class userServices {
    async signUp(req, res) {
        try {
            var req_data = req.body;
            if (!req_data.fullName || !req_data.email || !req_data.password) {
                return res.json({ code: codes.badRequest, message: message.BadRequest });
            }
            var usr = await userModel.findOne({ 'email': req_data.email, isDelete: false });
            if (usr) {
                return res.json({ code: codes.badRequest, message: message.already });
            } else {
                var data = {
                    'fullName': req_data.fullName,
                    "profileImg": req_data.image,
                    'email': req_data.email,
                    'countryCode': req_data.countryCode,
                    'mobile': req_data.mobile,
                    'password': req_data.password,
                    'createdAt': moment().format()
                }
                var save = await new userModel(data).save();
                return res.json({ code: codes.create, message: message.success, result: save });
            }
        } catch (error) {
            console.log(error)
            return res.json({ code: codes.internal, message: message.internal });
        }
    }

    async login(req, res) {
        try {
            var req_data = req.body;
            if (!req_data.email || !req_data.password) {
                return res.json({ code: codes.badRequest, message: message.BadRequest });
            }
            var usr = await userModel.findOne({ "email": req_data.email });
            if (usr) {
                var password_status = methods.compare_pass({ 'password': req_data.password, 'user_pass': usr.password });
                if (password_status == false) {
                    return res.json({ code: codes.badRequest, message: message.accountBlock });
                } else {
                    var userDetails = {
                        '_id': usr._id,
                        'mobile': usr.mobile,
                        'email': usr.email,
                        'profileImg': usr.profileImg,
                        'countryCode': usr.countryCode,
                        'fullName': usr.fullName,
                        'isActive': usr.isActive,
                        'createdAt': usr.createdAt
                    }
                    return res.json({ code: codes.success, message: message.success, result: userDetails });
                }
            } else {
                return res.json({ code: codes.badRequest, message: message.notFound });
            }
        } catch (error) {
            console.log(error)
            return res.json({ code: codes.internal, message: message.internal });
        }
    }

    async userEditProfile(req, res) {
        try {
            var req_data = req.body;
            var userId = req.body.userId;
            if (!userId) {
                return res.json({ code: codes.badRequest, message: message.BadRequest })
            }
            var chck = await userModel.findOne({ '_id': userId })
            if (chck) {
                var obj = {
                    'fullName': req_data.fullName ? req_data.fullName : chck.fullName,
                    "countryCode": req_data.countryCode ? req_data.countryCode : chck.countryCode,
                    "mobile": req_data.mobile ? req_data.mobile : chck.mobile,
                    'language': req_data.language ? req_data.language : chck.language,
                    'updatedAt': moment(new Date()).format()
                }
                var save = await userModel.updateOne({ '_id': userId }, { $set: obj });
                return res.json({ code: codes.update, message: message.success, result: save })
            } else {
                return res.json({ code: codes.notFound, message: message.notFound })
            }
        } catch (error) {
            console.log(error)
            return res.json({ code: codes.internal, message: message.internal })
        }
    }


    async change_password(req, res) {
        try {
            var data = req.body;
            var userId = data.userId;
            if (!userId) {
                return res.json({ code: codes.badRequest, message: message.BadRequest })
            } else {
                var usr = await userModel.findOne({ '_id': userId });
                if (usr) {
                    if (usr.password === newPassword) {
                        var new_pwd = data.newPassword;
                        var updte = await userModel.updateOne({ '_id': usr._id }, { $set: { 'password': new_pwd } });
                        return res.json({ code: codes.success, message: message.success, result: updte });
                    } else {
                        return res.json({ code: codes.badRequest, message: message.invalidPass });
                    }
                } else {
                    return res.json({ cod: codes.badRequest, message: message.notFound });
                }
            }
        } catch (error) {
            console.log(error)
            return res.json({ code: codes.internal, message: message.internal })
        }
    }

    async forgotPassword(req, res) {
        try {
            var req_data = req.body;
            if (!req_data.email || !req_data.password) {
                return res.json({ code: codes.badRequest, message: message.BadRequest });
            } else {
                var chck = await userModel.findOne({ 'email': req_data.email });
                if (chck) {
                    var pwd = req_data.password;
                    var updte = await userModel.updateOne({ _id: chck._id }, { $set: { 'password': pwd } });
                    return res.json({ code: codes.success, message: message.success, result: updte })
                } else {
                    return res.json({ code: codes.badRequest, message: message.notFound })
                }
            }
        } catch (error) {
            console.log(error)
            return res.json({ code: codes.internal, message: message.internal });
        }
    }

    async getDetails(req, res) {
        try {
            var req_data = req.body;
            var userId = req_data.userId;
            if (!userId) {
                return res.json({ code: codes.badRequest, message: message.BadRequest })
            } else {
                var usr = await userModel.findOne({ '_id': userId, 'isActive': true, isDelete: false });
                if (usr) {
                    return res.json({ code: codes.success, message: message.success, result: usr });
                } else {
                    return res.json({ code: codes.badRequest, message: message.BadRequest })
                }
            }
        } catch (error) {
            console.log(error);
            return res.json({ code: codes.internal, message: message.internal })
        }
    }




}
module.exports = userServices;