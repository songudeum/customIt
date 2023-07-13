const { Router } = require('express');

const { Order } = require('../data-access');

const asyncHandler = require('../utils/async-handler');

const router = Router();

// 관리자 주문 관리 페이지
router.get(
    '/edit',
    asyncHandler(async (req, res) => {
        const orders = await Order.find({});

        const orderData = orders.map((order) => {
            const { orderId, createdAt, products, totalPrice, deliveryStatus } = order;

            const productNames = products.map((product) => product.productName);

            return {
                orderId,
                createdAt,
                productNames,
                totalPrice,
                deliveryStatus,
            };
        });

        res.render('admin-order', { orders: orderData });
    }),
);

module.exports = router;
