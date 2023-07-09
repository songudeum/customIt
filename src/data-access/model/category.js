const mongoose = require('mongoose');
const categorySchema = require('../schema/category');

exports.Category = mongoose.model('Category', categorySchema);
