const mongoose = require("mongoose");
const productSchema = require("../schema/product");

exports.Product = mongoose.model("Product", productSchema);
