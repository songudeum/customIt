const { Router } = require('express');
const passport = require('passport');
const { nanoid } = require('nanoid');
const { Users } = require('../data-access');
const asyncHandler = require('../utils/async-handler');
const createHash = require('../utils/hash-password');
const loginRequired = require('../middlewares/login-required');
const { setUserToken, jwtVerify } = require('../utils/jwt');

const router = Router();

const emailCheck = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
const pwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
const numberCheck = /^[0-9]+$/;
const nameCheck = /^[가-힣]{2,4}$/;

// 회원가입 이메일 중복 확인 api (send render로바꾸기!)
router.post(
    '/join/emailDuplicate',
    asyncHandler(async (req, res) => {
        const { email } = req.body;
        const emailDuplicate = await Users.findOne({ email });
        if (emailDuplicate) {
            res.json({ message: '중복된 이메일이 존재합니다.' });
        } else {
            res.json({ message: '사용 가능한 이메일입니다.' });
        }
    }),
);

// 로그인 라우터 passport local로 인증
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    // 유저 토큰 생성 및 쿠키에 전달
    setUserToken(res, req.user);

    res.status(200).redirect('/');
});


// 로그아웃 라우터
router.get('/logout', (req, res) => {
    // 쿠키 만료시키도록 전달
    res.cookie('token', null, { maxAge: 0 });
    res.json({ message: '로그아웃 완료' });
});

// 사용자 회원가입 라우터
router.post(
    '/join',
    asyncHandler(async (req, res) => {
        const { email, password, name, phoneNumber, address } = req.body;

        // 이메일 형식 확인 조건문
        if (!emailCheck.test(email)) {
            const error = new Error('이메일 형식에 맞게 입력해주세요.');
            error.statusCode = 400;
            throw error;
        }

        // 비밀번호 형식 확인 조건문
        if (!pwCheck.test(password)) {
            const error = new Error('영문 숫자 특수기호 조합 8~15자 이하로 입력해주세요.');
            error.statusCode = 400;
            throw error;
        }

        // 이름 형식 확인 조건문
        if (!nameCheck.test(name)) {
            const error = new Error('이름은 2~4글자로 입력해주세요.');
            error.statusCode = 400;
            throw error;
        }

        // 핸드폰 번호 형식 확인 조건문
        if (!numberCheck.test(phoneNumber)) {
            const error = new Error('휴대폰 번호는 숫자로 입력해주세요.');
            error.statusCode = 400;
            throw error;
        }

        const userId = nanoid(5);
        await Users.create({
            userId,
            email,
            password: createHash(password),
            name,
            phoneNumber,
            address,
        });

        res.staus(201).redirect('/users/login');
    }),
);

// 사용자 탈퇴 라우터

router.post(
    '/info/delete',
    loginRequired,
    asyncHandler(async (req, res) => {
        const { password } = req.body;
        const userEmail = jwtVerify(req);
        const user = await Users.findOne({ email: userEmail });
        if (user.password !== createHash(password)) {
            const error = new Error('비밀번호가 일치하지 않습니다.');
            error.statusCode = 400;
            throw error;
        }
        await Users.deleteOne({ email: userEmail });

        res.status(200).redirect('/');
    }),
);

// 로그인 화면 라우팅
router.get('/login', (req, res) => {
    res.render('user-login');
});

// 사용자 회원가입
router.get('/join', (req, res) => {
    res.render('signin');
});

// 회원 탈퇴 페이지
router.get('/info/delete', (req, res) => {
    res.render('user-secession');
});
module.exports = router;
