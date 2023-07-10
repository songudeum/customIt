const { Router } = require('express');
const { nanoid } = require('nanoid');

const orderService = require('../../services/order');

const asyncHandler = require('../../utils/async-handler');

const router = Router();

// 주문 생성
router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { userId, productId, quantity, orderDate, totalAmount } = req.body;

        // 고유한 주문 ID 생성
        const orderId = nanoid(10);

        // 제공된 데이터를 사용하여 주문 생성
        await orderService.createOrder({
            orderId,
            userId,
            productId,
            quantity,
            orderDate,
            totalAmount,
        });

        // 생성된 주문의 ID를 포함한 응답 전송
        res.status(201).json({
            data: {
                orderId,
            },
        });
    }),
);

// 주문삭제
router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        await orderService.deleteOrder({ id });

        //  삭제 완료 응답 전송
        res.status(200).send();
    }),
);

// updateDeliveryInfo
router.put(
    '/:id',
    asyncHandler(async (req, res) => {
        const { userId } = req.body;
        const { id } = req.params;

        if (!userId) {
            const error = new Error('기입하지 않은 정보가 있는지 확인해 주세요.');
            error.statusCode = 400;
            throw error;
        }

        orderService.updateeDeliveryInfo({ id, userId });
        //  업데이트 완료 응답 전송
        res.status(201).send();
    }),
);

// updateDeliveryStatus
router.put(
    '/:id',
    asyncHandler(async (req, res) => {
        const { DeliveryStatus } = req.body;
        const { id } = req.params;

        orderService.updateDeliveryStatus({ id, DeliveryStatus });
        //  업데이트 완료 응답 전송
        res.status(201).send();
    }),
);

module.exports = router;
