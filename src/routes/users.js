const { Router } = require('express');
const { Users, Category } = require('../data-access');
const asyncHandler = require('../utils/async-handler');
const loginRequired = require('../middlewares/login-required');
const { jwtVerify } = require('../utils/jwt');

const router = Router();

const numberCheck = /^[0-9]+$/;

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
        // 핸드폰 번호 형식 확인 조건문
        if (!numberCheck.test(phoneNumber)) {
            const error = new Error('휴대폰 번호는 숫자로 입력해주세요.');
            error.statusCode = 400;
            throw error;
        }

        const userInfo = await Users.findOneAndUpdate(
            { email: userEmail },
            {
                email,
                password: user.password,
                name,
                phoneNumber,
                address,
            },
        );
        res.render('edit-user-info', { userInfo, categoryName: undefined, categories });
    }),
);

// 로그인 화면 라우팅
router.get('/login', (req, res) => {
    res.render('user-login');
});

// 사용자 회원가입
router.get('/join', async (req, res) => {
    const categories = await Category.find({});
    res.render('signin', { categoryName: undefined, categories });
});

// 회원 비밀번호 수정 페이지
router.get('/info/edit/pw', async (req, res) => {
    const categories = await Category.find({});
    res.render('change-password', { categoryName: undefined, categories });
});

// 회원 탈퇴 페이지
router.get('/info/delete', async (req, res) => {
    const categories = await Category.find({});
    res.render('user-secession', { categoryName: undefined, categories });
});

module.exports = router;
