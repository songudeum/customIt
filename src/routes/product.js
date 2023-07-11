const { Router } = require('express');

const { Product } = require('../data-access');

const asyncHandler = require('../utils/async-handler');

const router = Router();

router.get(
    '/sub/:categoryName',
    asyncHandler(async (req, res) => {
        const { categoryName } = req.params;
        const products = await Product.find({ categoryName });
        res.render('product-sub', { products });
    }),
);

router.get(
    '/detail/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const product = await Product.findOne({ id });
        res.render('product-detail', { product });
    }),
);

module.exports = router;
