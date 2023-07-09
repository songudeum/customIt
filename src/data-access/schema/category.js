const { Schema } = require("mongoose");

const categorySchema = new Schema(
	{
		id: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
	},
	{
		collection: "Category",
	}
);

module.exports = categorySchema;
