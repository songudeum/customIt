const { Router } = require('express');
const passport = require('passport');
const { nanoid } = require('nanoid');
const { Users } = require('../data-access');
const asyncHandler = require('../utils/async-handler');
const createHash = require('../utils/hash-password');
const { setUserToken, jwtVerify } = require('../utils/jwt');
const loginRequired = require('../middlewares/login-required');

const router = Router();
const emailCheck = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
const pwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
const numberCheck = /^[0-9]+$/;
const nameCheck = /^[가-힣]{2,4}$/;

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
        if (!nameCheck.test(password)) {
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

        const userId = nanoid(10);
        await Users.create({
            userId,
            email,
            password: createHash(password),
            name,
            phoneNumber,
            address,
        });

        res.json({ meassage: '회원가입 성공' });
    }),
);

// 사용자 정보 조회 라우터
router.get(
    '/info/:email',
    loginRequired,
    asyncHandler(async (req, res) => {
        const userEmail = jwtVerify(req);
        const userInfo = await Users.findOne({ email: userEmail });
        res.render(userInfo);
    }),
);

// 사용자 탈퇴 라우터
router.delete(
    '/info/delete/:email',
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

        res.json({ message: '사용자 탈퇴 완료' });
    }),
);

// 로그인 라우터 passport local로 인증
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    // 유저 토큰 생성 및 쿠키에 전달
    setUserToken(res, req.user);

    res.redirect('/');
});

// 로그아웃 라우터
router.get('/logout', loginRequired, (req, res) => {
    // 쿠키 만료시키도록 전달
    res.cookie('token', null, { maxAge: 0 });
});

module.exports = router;
