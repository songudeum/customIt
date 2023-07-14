const { Order } = require('../data-access');

const orderService = {
    createOrder: async (orderData) => {
        const createdOrder = await Order.create(orderData);
        if (!createdOrder) {
            throw new Error('주문서 등록에 실패했습니다.');
        }

        return createdOrder;
    },

    deleteOrder: async ({ orderId }) => {
        const deletedOrder = await Order.deleteOne({ orderId });
        if (deletedOrder.ok !== 1) {
            throw new Error('주문서 삭제에 실패했습니다.');
        }
        return deletedOrder;
    },

    updateDeliveryInfo: async ({ orderId, userId }) => {
        const updateDeliveryInfo = await Order.updateOne({ orderId }, { $set: { userId } }); // $set 문서 전체를 수정하는 것이 아닌 배송 정보만 수정하도록 설정
        if (updateDeliveryInfo.nModified === 0) {
            return { error: '배송 정보를 정상적으로 처리하지 못했습니다.' };
        }
        return updateDeliveryInfo;
    },

    updateDeliveryStatus: async ({ orderId, deliveryStatus }) => {
        const updateDeliveryStatus = await Order.updateOne({ orderId }, { deliveryStatus });
        if (updateDeliveryStatus.nModified === 0) {
            return { error: '배송 상태를 정상적으로 처리하지 못했습니다.' };
        }
        return updateDeliveryStatus;
    },
};

module.exports = orderService;
