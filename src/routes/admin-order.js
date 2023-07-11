const { Router } = require('express');

const { Order } = require('../data-access');

const asyncHandler = require('../utils/async-handler');

const router = Router();

// 관리자 주문 관리 페이지
router.get(
    '/edit',
    asyncHandler(async (req, res) => {
        const orders = await Order.find({});

        res.render('관리자 주문 관리 페이지', { orders });
    }),
);

module.exports = router;
