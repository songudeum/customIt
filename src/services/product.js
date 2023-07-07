const { Product } = require("../data-access");

const productService = {
	createProduct: async ({ id, name }) => {
		const createdProduct = await Product.create({
			id,
			name,
		});
		return createdProduct;
	},
	updateProduct: async ({ id, name }) => {
		const updatedProduct = await Product.updateOne(
			{ id },
			{ name, price, description, company, categoryName, image }
		);
		return updatedProduct;
	},
	deleteProduct: async ({ id }) => {
		const deletedProduct = await Product.deleteOne({ id });
		return deletedProduct;
	},
};

module.exports = productService;
