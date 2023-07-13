const { Schema } = require('mongoose');

const ProductSchema = new Schema(
    {
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
    },
    { _id: false },
);

const AddressSchema = new Schema(
    {
        postalCode: {
            type: String,
            required: true,
        },
        address1: {
            type: String,
            required: true,
        },
        address2: {
            type: String,
            required: true,
        },
    },
    { _id: false },
);

const orderUserSchema = new Schema(
    {
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
            type: AddressSchema,
            required: true,
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
            required: true,
        },
        orderUser: {
            type: orderUserSchema,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        deliveryStatus: {
            type: String,
            enum: ['상품준비중', '배송준비중', '배송중', '배송완료'],
            default: '상품준비중',
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
