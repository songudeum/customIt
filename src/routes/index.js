const { Router } = require('express');

const { Product, Category } = require('../data-access');

const asyncHandler = require('../utils/async-handler');

const router = Router();

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const products = await Product.find({});
        const categories = await Category.find({});
        res.render('index', { products, categoryName: undefined, categories });
    }),
);

module.exports = router;
