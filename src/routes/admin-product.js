const { Router } = require("express");

const { Product } = require("../data-access");

const asyncHandler = require("../utils/async-handler");

const router = Router();

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const products = await Product.find({});
		res.render("admin-product", { products });
	})
);

module.exports = router;
