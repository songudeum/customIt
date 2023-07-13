const { Router } = require('express');
const { Users, Category } = require('../data-access');
const asyncHandler = require('../utils/async-handler');
const loginRequired = require('../middlewares/login-required');
const { jwtVerify } = require('../utils/jwt');

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
