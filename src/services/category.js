const { Category } = require('../data-access');

const categoryService = {
	createCategory: async ({ id, name }) => {
		const createdCategory = await Category.create({
			id,
			name,
		});
		return createdCategory;
	},
	updateCategory: async ({ id, name }) => {
		const updatedCategory = await Category.updateOne({ id }, { name });
		return updatedCategory;
	},
	deleteCategory: async ({ id }) => {
		const deletedCategory = await Category.deleteOne({ id });
		return deletedCategory;
	},
};

module.exports = categoryService;
