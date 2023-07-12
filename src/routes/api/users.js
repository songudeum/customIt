const { Router } = require('express');
const { Users } = require('../../data-access');
const asyncHandler = require('../../utils/async-handler');
const createHash = require('../../utils/hash-password');
const loginRequired = require('../../middlewares/login-required');
const { jwtVerify } = require('../../utils/jwt');
const { Category } = require('../../data-access');

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
    '/users/info/edit', // 경로를 '/users/info/edit'로 변경
    loginRequired,
    asyncHandler(async (req, res) => {
        console.log(req.body);
        const userEmail = jwtVerify(req);
        const { email, name, phoneNumber, address1, address2 } = req.body;
        const user = await Users.findOne({ email: userEmail });
        console.log(user);
        await Users.findOneAndUpdate(
            { email: userEmail },
            {
                email,
                password: user.password,
                name,
                phoneNumber,
                address: {
                    address1,
                    address2,
                },
            },
        );

        const updatedUserInfo = await Users.findOne({ email });

        const categories = await Category.find({});

        res.render('edit-user-info', {
            userInfo: updatedUserInfo,
            categoryName: undefined,
            categories,
        });
    }),
);
module.exports = router;
