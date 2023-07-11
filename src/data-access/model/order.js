const mongoose = require('mongoose');
const orderSchema = require('../schema/order');

exports.Order = mongoose.model('Order', orderSchema);
