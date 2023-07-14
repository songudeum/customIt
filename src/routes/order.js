const { Router } = require('express');
const { Order } = require('../data-access');

const { Category } = require('../data-access');
const asyncHandler = require('../utils/async-handler');

const router = Router();

router.get(
    '/cart',
    asyncHandler(async (req, res) => {
        const { cartData } = req.body;

        const categories = await Category.find({});
        res.render('main-cart', { cartData, categories, categoryName: undefined });
    }),
);

router.get(
    '/:userId/orderList',
    asyncHandler(async (req, res) => {
        const { userId } = req.params;
        const categories = await Category.find({});
        const orders = await Order.find({ userId });
        const orderList = orders.map((order) => {
            const { orderId, totalPrice, deliveryStatus, products } = order;

            return {
                orderId,
                totalPrice,
                deliveryStatus,
                image: products[0].image,
            };
        });

        res.render('order-list', { orderList, categories, categoryName: undefined });
    }),
);

router.get(
    '/orderListDetail',
    asyncHandler(async (req, res) => {
        const { orderId } = req.params;
        const order = await Order.findOne(orderId);
        const categories = await Category.find({});
        res.render('order-detail', { order, categories, categoryName: undefined });
    }),
);

router.get(
    '/edit',
    asyncHandler(async (req, res) => {
        const { orderId } = req.params;
        const categories = await Category.find({});
        const order = await Order.findOne({ orderId });

        res.render('order-list-edit', { order, categories, categoryName: undefined });
    }),
);

router.get('/payment', async (req, res) => {
    const categories = await Category.find({});
    res.render('order-complete', { categories, categoryName: undefined });
});

router.get('/cancel', async (req, res) => {
    const categories = await Category.find({});
    res.render('order-cancel', { categories, categoryName: undefined });
});
module.exports = router;
