const { Router } = require('express');
const { Order } = require('../data-access');
const { getCartDataFromLocalStorage } = require('./cart');
const asyncHandler = require('../utils/async-handler');

const router = Router();

// 주문서 => 주문서에 들어오는 값은 로컬 스토리지의 값
router.get(
    '/',
    asyncHandler(async (req, res) => {
        // 로컬스토리지에서 카트 데이터 가져오기
        const cartData = JSON.parse(getCartDataFromLocalStorage());
        res.render('수정예정', { cartData });
    }),
);

// 마이페이지 주문내역 리스트
router.get(
    '/:userId/orderList',
    asyncHandler(async (req, res) => {
        // 요청 파라미터에서 userId 가져오기
        const { userId } = req.params;

        const orders = await Order.find({ userId }); // 주문 데이터 Find
        const orderList = orders.map((order) => {
            const { orderId, totalPrice, deliveryStatus, image } = order;

            return {
                orderId,
                totalPrice,
                deliveryStatus,
                image: image[0],
            };
        });

        res.render('order-list', { orderList });
    }),
);

// 마이페이지 주문서 상세보기
router.get(
    '/:id/orderList/:orderId',
    asyncHandler(async (req, res) => {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        res.render('order-detail', { order });
    }),
);

// 배송정보 수정
router.get(
    '/edit/:userId/:orderId',
    asyncHandler(async (req, res) => {
        const { orderId } = req.params;

        const order = await Order.findOne({ orderId });

        res.render('order-list-edit', { order });
    }),
);

// 결제완료
router.get('/payment', (req, res) => {
    res.render('order-complete');
});

// 주문 취소 완료 페이지
router.get('/cancel', (req, res) => {
    res.render('order-cancel');
});
module.exports = router;
