const { Router } = require('express');
const passport = require('passport');
const { Admin } = require('../data-access');
const asyncHandler = require('../utils/async-handler');
const { createHash } = require('../utils/hash-password');
const { setUserToken } = require('../utils/jwt');
const loginRequired = require('../middlewares/login-required');

const router = Router();
const adminEmailCheck = /[a-z0-9]+@admin.com/;
const pwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

// 관리자 회원가입 api
router.post(
    '/join',
    asyncHandler(async (req, res) => {
        const { email, password, name } = req.body;

        // 이메일 형식 체크하는 조건문
        if (!adminEmailCheck.test(email)) {
            const error = new Error('올바른 이메일 형식이 아닙니다.');
            error.statusCode = 400;
            throw error;
        }

        // 비밀번호 형식 체크하는 조건문
        if (!pwCheck.test(password)) {
            const error = new Error(
                '비밀번호 형식은 대소문자/특수문자 조합 8~15자로 입력해주세요.',
            );
            error.statusCode = 400;
            throw error;
        }

        await Admin.create({
            email,
            password: createHash(password),
            name,
        });

        res.status(201).redirect('/admin/login');
    }),
);

// 관리자 이메일 중복 확인 api
router.post(
    '/join/emailDuplicate',
    asyncHandler(async (req, res) => {
        const { email } = req.body;
        const emailDuplicate = await Admin.findOne({ email });
        if (emailDuplicate) {
            res.json({ message: '중복된 이메일이 존재합니다.' });
        } else {
            res.json({ message: '사용 가능한 이메일입니다.' });
        }
    }),
);

// 관리자 로그인 라우터
router.post('/login', passport.authenticate('admin', { session: false }), (req, res) => {
    // 유저 토큰 생성 및 쿠키에 전달
    setUserToken(res, req.user);

    res.redirect('/admin/category');
});

// 로그아웃 라우터
router.get('/logout', loginRequired, (req, res) => {
    // 쿠키 만료시키도록 전달
    res.cookie('token', null, { maxAge: 0 });
    res.json({ message: '로그아웃 완료' });
});

// 어드민 로그인 화면
router.get('/login', (req, res) => {
    res.render('admin-login');
});

// 어드민 회원가입 화면
router.get('/join', (req, res) => {
    res.render('admin-signin');
});

module.exports = router;
