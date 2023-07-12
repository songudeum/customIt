const { Router } = require('express');
const { Users, Category } = require('../../data-access');
const asyncHandler = require('../../utils/async-handler');
const loginRequired = require('../../middlewares/login-required');
const { jwtVerify } = require('../../utils/jwt');

const router = Router();

// 사용자 정보 조회 라우터
router.get(
    '/info',
    loginRequired,
    asyncHandler(async (req, res) => {
        const userEmail = jwtVerify(req);
        const userInfo = await Users.findOne({ email: userEmail });

        const categories = await Category.find({});

        res.render('edit-user-info', { userInfo, categoryName: undefined, categories });
    }),
);

// 개인페이지 사용자 정보 수정 api
router.put(
    '/info/edit',
    loginRequired,
    asyncHandler(async (req, res) => {
        const userEmail = jwtVerify(req);
        const { email, name, phoneNumber, address } = req.body;
        const user = await Users.findOne({ email: userEmail });

        const categories = await Category.find({});

        const newUserInfo = await Users.findOneAndUpdate(
            { email: userEmail },
            {
                email,
                password: user.password,
                name,
                phoneNumber,
                address,
            },
        );
        res.render('edit-user-info', { newUserInfo, categoryName: undefined, categories });
    }),
);

module.exports = router;
