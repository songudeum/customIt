const { Schema } = require('mongoose');

const orderSchema = new Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        orderDate: {
            type: Date,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        DeliveryStatus: {
            type: String,
        },
    },
    {
        collection: 'Order',
    },
);

module.exports = orderSchema;
