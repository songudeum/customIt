const { Router } = require('express');

const { Product, Category } = require('../data-access');

const asyncHandler = require('../utils/async-handler');

const router = Router();

router.get(
    '/sub/:categoryName',
    asyncHandler(async (req, res) => {
        const { categoryName } = req.params;
        const products = await Product.find({ categoryName });
        const categories = await Category.find({});

        res.render('product-sub', { products, categoryName, categories });
    }),
);

router.get(
    '/detail/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const product = await Product.findOne({ id });
        const categories = await Category.find({});
        const categoryName = product.categoryName;
        res.render('product-detail', { product, categoryName, categories });
    }),
);

module.exports = router;
