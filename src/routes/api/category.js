const { Router } = require('express');
const { nanoid } = require('nanoid');

const { Category } = require('../../data-access');
const categoryService = require('../../services/category');

const asyncHandler = require('../../utils/async-handler');

const router = Router();

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { name } = req.body;
        const isExists = await Category.exists({ name });
        if (isExists) {
            const error = new Error('중복된 이름입니다.');
            error.statusCode = 400;
            throw error;
        }
        if (!name) {
            const error = new Error('카테고리명을 1자 이상 입력해주세요.');
            error.statusCode = 400;
            throw error;
        } else if (name.length > 10) {
            const error = new Error('카테고리명을 10자 미만 입력해주세요.');
            error.statusCode = 400;
            throw error;
        }

        const id = nanoid(10);

        categoryService.createCategory({ id, name });

        res.status(201);
        res.json({
            data: {
                id,
            },
        });
    }),
);

router.put(
    '/:id',
    asyncHandler(async (req, res) => {
        const { name } = req.body;
        const { id } = req.params;
        if (!name) {
            const error = new Error('카테고리명을 1자 이상 입력해주세요.');
            error.statusCode = 400;
            throw error;
        } else if (name.length > 10) {
            const error = new Error('카테고리명을 10자 미만 입력해주세요.');
            error.statusCode = 400;
            throw error;
        }

        categoryService.updateCategory({ id, name });

        res.status(201);
    }),
);

router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        categoryService.deleteCategory({ id });

        res.status(200);
    }),
);

module.exports = router;
