const { Router } = require('express');

const { Category } = require('../data-access');

const asyncHandler = require('../utils/async-handler');

const router = Router();

router.get(
	'/',
	asyncHandler(async (req, res) => {
		const categories = await Category.find({});
		res.render('admin-category', { categories });
	}),
);

module.exports = router;
