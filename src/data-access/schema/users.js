const { Schema } = require('mongoose');

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
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
        userId: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        collection: 'Users',
    },
);

module.exports = userSchema;
