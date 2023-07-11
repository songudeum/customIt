const { Router } = require('express');
const { Users } = require('../../data-access');
const asyncHandler = require('../../utils/async-handler');
const createHash = require('../../utils/hash-password');
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
        res.render('user-secession', { userInfo });
    }),
);

// 개인페이지 사용자 정보 수정 api(send 나중에 render로 수정)
router.put(
    '/info/edit',
    loginRequired,
    asyncHandler(async (req, res) => {
        const userEmail = jwtVerify(req);
        const { email, password, newPassword, name, phoneNumber, address } = req.body;
        const user = await Users.findOne({ email: userEmail });
        const userPw = user.password;

        if (userPw !== createHash(password)) {
            const error = new Error('비밀번호가 일치하지 않습니다.');
            error.statusCode = 400;
            throw error;
        }
        const newUserInfo = await Users.findOneAndUpdate(
            { email: userEmail },
            {
                email,
                password: createHash(newPassword),
                name,
                phoneNumber,
                address,
            },
        );
        res.render('edit-user-info', { newUserInfo });
    }),
);

module.exports = router;
