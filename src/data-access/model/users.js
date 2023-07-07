const mongoose = require("mongoose");
const userSchema = require("../schema/users");

exports.Users = mongoose.model("Users", userSchema);
