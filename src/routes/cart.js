const { Router } = require('express');
const { getCartDataFromLocalStorage } = require('../data-access/localStorage');

const asyncHandler = require('../utils/async-handler');

const router = Router();

// 로컬스토리지에 담긴 모든 상품 정보를 가져와 장바구니 페이지를 렌더링하는 라우터
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const products = await getCartDataFromLocalStorage();
        // getProductsFromLocalStorage() 함수를 사용해 로컬 스토리지에 저장된 상품 정보를 가져옴

        res.render('cart', { products });
        // products 값을 넘겨주어, 이를 사용하여 장바구니 페이지를 렌더
    }),
);

module.exports = router;
