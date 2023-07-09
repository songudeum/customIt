const { Router } = require('express');

const { Product, Category } = require('../data-access');

const asyncHandler = require('../utils/async-handler');

const router = Router();

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const products = await Product.find({});
        res.render('admin-product', { products });
    }),
);

router.get(
    '/add',
    asyncHandler(async (req, res) => {
        const categories = await Category.find({});
        res.render('admin-product-add', { categories });
    }),
);

router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const product = await Product.findOne({ id });
        const categories = await Category.find({});
        res.render('admin-product-add', { product, categories });
    }),
);

module.exports = router;
