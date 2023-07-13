const session = require('express-session');
const { Router } = require('express');

const { Category } = require('../data-access');
const asyncHandler = require('../utils/async-handler');

const router = Router();

router.get(
    '/cart',
    asyncHandler(async (req, res) => {
        // 세션에서 장바구니 데이터를 가져옵니다.
        let { cart } = req.session;

        // 세션에 장바구니 데이터가 없다면 초기화 합니다.
        if (!cart) {
            cart = req.session.cart = [];
        }

        const categories = await Category.find({});

        res.render('cart', { cart, categories, categoryName: undefined });
    }),
);

module.exports = router;
