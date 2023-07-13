const { Schema } = require('mongoose');

const ProductSchema = new Schema(
    {
        productName: {
            type: String,
        },
        price: {
            type: Number,
        },

        image: {
            type: String,
        },

        quantity: {
            type: Number,
        },
    },
    { _id: false },
);

const AddressSchema = new Schema(
    {
        address1: {
            type: String,
        },
        address2: {
            type: String,
        },
    },
    { _id: false },
);

const orderUserSchema = new Schema(
    {
        email: {
            type: String,
        },
        userName: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        address: {
            type: AddressSchema,
        },
    },
    { _id: false },
);

const orderSchema = new Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true,
        },
        products: {
            type: [ProductSchema],
        },
        orderUser: {
            type: orderUserSchema,
        },
        totalPrice: {
            type: Number,
        },
        deliveryStatus: {
            type: String,
        },
        paymentStatus: {
            type: Boolean,
        },
    },
    {
        collection: 'Order',
        timestamps: true,
    },
);

module.exports = orderSchema;
