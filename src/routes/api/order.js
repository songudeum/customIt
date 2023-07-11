const { Router } = require('express');
const { nanoid } = require('nanoid');

const orderService = require('../../services/order');

const asyncHandler = require('../../utils/async-handler');

const router = Router();

// 주문 생성
router.post(
    '/',
    asyncHandler(async (req, res) => {
        const {
            productName,
            image,
            quantity,
            price,
            totalPrice,
            userName,
            phoneNumber,
            email,
            address,
        } = req.body;

        // 고유한 주문 ID 생성
        const orderId = nanoid(10);

        // 제공된 데이터를 사용하여 주문 생성
        await orderService.createOrder({
            orderId,
            productName,
            image,
            quantity,
            price,
            totalPrice,
            userName,
            phoneNumber,
            email,
            address,
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
    '/:orderId',
    asyncHandler(async (req, res) => {
        const { orderId } = req.params;

        await orderService.deleteOrder({ orderId });

        //  삭제 완료 응답 전송
        res.status(200).send();
    }),
);

// updateDeliveryInfo
router.put(
    '/:orderId',
    asyncHandler(async (req, res) => {
        const { orderId } = req.params;

        orderService.updateeDeliveryInfo({ orderId });
        //  업데이트 완료 응답 전송
        res.status(201).send();
    }),
);

// updateDeliveryStatus
router.put(
    '/:id',
    asyncHandler(async (req, res) => {
        const { deliveryStatus } = req.body;
        const { id } = req.params;

        orderService.updateDeliveryStatus({ id, deliveryStatus });
        //  업데이트 완료 응답 전송
        res.status(201).send();
    }),
);

module.exports = router;
