const { Router } = require('express');
const { nanoid } = require('nanoid');

const orderService = require('../../services/order');

const asyncHandler = require('../../utils/async-handler');

const router = Router();

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { products, orderUser, totalPrice } = req.body;

        const orderId = nanoid(10);

        await orderService.createOrder({
            orderId,
            products,
            orderUser,
            totalPrice,
        });

        res.status(201).json({
            data: {
                orderId,
            },
        });
    }),
);

router.delete(
    '/:orderId',
    asyncHandler(async (req, res) => {
        const { orderId } = req.params;

        await orderService.deleteOrder({ orderId });

        res.status(200).send();
    }),
);

router.put(
    '/:orderId',
    asyncHandler(async (req, res) => {
        const { orderId } = req.params;
        const { userId } = req.body;
        orderService.updateDeliveryInfo({ orderId, userId });

        res.status(201).send();
    }),
);

router.put(
    '/:orderId',
    asyncHandler(async (req, res) => {
        const { deliveryStatus } = req.body;
        const { orderId } = req.params;

        await orderService.updateDeliveryStatus({ orderId, deliveryStatus });

        res.status(201).send();
    }),
);

module.exports = router;
