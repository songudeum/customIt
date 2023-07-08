const mongoose = require('mongoose');
const adminSchema = require('../schema/admin');

exports.Admin = mongoose.model('Admin', adminSchema);
