const { Router } = require('express');
const { Order } = require('../data-access');

const { Category } = require('../data-access');
const asyncHandler = require('../utils/async-handler');

const router = Router();

// 주문서 => 주문서에 들어오는 값은 로컬 스토리지의 값
router.get(
    '/cart',
    asyncHandler(async (req, res) => {
        // 로컬스토리지에서 카트 데이터 가져오기

        const categories = await Category.find({});
        res.render('main-cart', { categories, categoryName: undefined });
    }),
);

// 마이페이지 주문내역 리스트
router.get(
    '/:userId/orderList',
    asyncHandler(async (req, res) => {
        // 요청 파라미터에서 userId 가져오기
        const { userId } = req.params;
        const categories = await Category.find({});
        const orders = await Order.find({ 'orderUser.email': userId }); // 주문 데이터 Find
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

// 마이페이지 주문서 상세보기
router.get(
    '/orderListDetail',
    asyncHandler(async (req, res) => {
        const { orderId } = req.params;
        const order = await Order.findOne(orderId);
        const categories = await Category.find({});
        res.render('order-detail', { order, categories, categoryName: undefined });
    }),
);

// 배송정보 수정
router.get(
    '/edit',
    asyncHandler(async (req, res) => {
        const { orderId } = req.params;
        const categories = await Category.find({});
        const order = await Order.findOne({ orderId });

        res.render('order-list-edit', { order, categories, categoryName: undefined });
    }),
);

// 결제완료
router.get('/payment', async (req, res) => {
    const categories = await Category.find({});
    res.render('order-complete', { categories, categoryName: undefined });
});

// 주문 취소 완료 페이지
router.get('/cancel', async (req, res) => {
    const categories = await Category.find({});
    res.render('order-cancel', { categories, categoryName: undefined });
});
module.exports = router;
