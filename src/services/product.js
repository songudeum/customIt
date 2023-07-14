const { Product } = require('../data-access');

const productService = {
    createProduct: async ({ id, name, price, description, company, categoryName, image }) => {
        const createdProduct = await Product.create({
            id,
            name,
            price,
            description,
            company,
            categoryName,
            image,
        });
        return createdProduct;
    },
    updateProduct: async ({ id, name, price, description, company, categoryName, image }) => {
        const updatedProduct = await Product.updateOne(
            { id },
            { name, price, description, company, categoryName, image },
        );
        return updatedProduct;
    },
    deleteProduct: async ({ id }) => {
        const deletedProduct = await Product.deleteOne({ id });
        return deletedProduct;
    },
};

module.exports = productService;
