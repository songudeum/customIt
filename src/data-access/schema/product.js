const { Schema } = require("mongoose");

const productSchema = new Schema(
	{
		id: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		company: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		categoryName: {
			type: String,
			required: true,
		},
	},
	{
		collection: "Product",
	}
);

module.exports = productSchema;
