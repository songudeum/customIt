const { Schema } = require('mongoose');

const orderSchema = new Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        address: {
            type: new Schema({
                postalCode: String,
                address1: String,
                address2: String,
            }),
            required: true,
        },

        productName: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
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
        totalPrice: {
            type: Number,
            required: true,
        },
        deliveryStatus: {
            type: String,
        },
    },
    {
        collection: 'Order',
    },
);

module.exports = orderSchema;
