const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
//passportLocalMongoose will automatically define username and password hence written only email
const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    name: String,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);