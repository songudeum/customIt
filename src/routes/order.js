const { Router } = require('express');

const { Order } = require('../data-access');

const asyncHandler = require('../utils/async-handler');

const router = Router();

// 주문서
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const order = await Order.find({});
        res.render('주문서 페이지', { order });
    }),
);

// 배송정보 수정
router.get(
    '/edit/:userId/:orderId',
    asyncHandler(async (req, res) => {
        const { userId, orderId } = req.params;

        const order = await Order.findOne({ userId, orderId });

        res.render('배송정보 수정 페이지', { order });
    }),
);

// 결제완료
router.get('/payment', (req, res) => {
    res.render('결제 완료 페이지');
});

// 주문 취소 완료 페이지
router.get('/cancel', (req, res) => {
    res.render('취소 완료 페이지');
});
module.exports = router;
