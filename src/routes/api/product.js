const { Router } = require('express');
const { nanoid } = require('nanoid');

const productService = require('../../services/product');

const asyncHandler = require('../../utils/async-handler');
const upload = require('../../middlewares/multer');

const router = Router();

router.post(
    '/',
    upload.single('productImage'),
    asyncHandler(async (req, res) => {
        const { name, price, description, company, categoryName } = req.body;
        console.log(name, price, description, company, categoryName);
        if (!name || !price || !description || !company || !categoryName) {
            const error = new Error('모든 값은 필수 값입니다.');
            error.statusCode = 400;
            throw error;
        }

        if (
            req.file.mimetype !== 'image/png' &&
            req.file.mimetype !== 'image/jpg' &&
            req.file.mimetype !== 'image/jpeg'
        ) {
            const error = new Error('.png, .jpeg, .jpg 파일만 업로드 가능합니다.');
            error.statusCode = 400;
            throw error;
        }

        const id = nanoid(10);

        productService.createProduct({
            id,
            name,
            price: Number(price),
            description,
            company,
            categoryName,
            image: `/image/${req.file.originalname}`,
        });

        res.status(201).redirect('/admin/product');
    }),
);

router.put(
    '/:id',
    upload.single('productImage'),
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { name, price, description, company, categoryName } = req.body;

        if (!name || !price || !description || !company || !categoryName) {
            const error = new Error('모든 값은 필수 값입니다.');
            error.statusCode = 400;
            throw error;
        }
        if (
            req.file.mimetype !== 'image/png' &&
            req.file.mimetype !== 'image/jpg' &&
            req.file.mimetype !== 'image/jpeg'
        ) {
            const error = new Error('.png, .jpeg, .jpg 파일만 업로드 가능합니다.');
            error.statusCode = 400;
            throw error;
        }

        productService.updateProduct({
            id,
            name,
            price: Number(price),
            description,
            company,
            categoryName,
            image: `/image/${req.file.originalname}`,
        });

        res.status(201).redirect('/admin/product');
    }),
);

router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        productService.deleteProduct({ id });

        res.status(200).redirect('/admin/product');
    }),
);

module.exports = router;
