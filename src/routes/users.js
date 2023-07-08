const { Router } = require('express');
const passport = require('passport');
const { Users } = require('../data-access');
const asyncHandler = require('../utils/async-handler');
const createHash = require('../utils/hash-password');
const { setUserToken } = require('../utils/jwt');

const router = Router();

// 사용자 회원가입 라우터
router.post(
    '/join',
    asyncHandler(async (req, res) => {
        const { email, password, name, phoneNumber, address } = req.body;

        // 이메일 형식 확인 조건문
        const emailCheck = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
        if (!emailCheck.test(email)) {
            const error = new Error('이메일 형식에 맞게 입력해주세요.');
            error.statusCode = 400;
            throw error;
        }

        // 비밀번호 형식 확인 조건문
        const pwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
        if (!pwCheck.test(password)) {
            const error = new Error('영문 숫자 특수기호 조합 8~15자 이하로 입력해주세요.');
            error.statusCode = 400;
            throw error;
        }

        // 핸드폰 번호 형식 확인 조건문
        if (!/^[0-9]+$/.test(phoneNumber)) {
            const error = new Error('휴대폰 번호는 숫자로 입력해주세요.');
            error.statusCode = 400;
            throw error;
        }

        await Users.create({
            email,
            password: createHash(password),
            name,
            phoneNumber,
            address,
        });

        res.status(201).json({ message: '회원가입 성공' });
        res.redirect('/');
    }),
);

// 사용자 정보 조회 라우터
router.get(
    '/info/:email',
    asyncHandler(async (req, res) => {
        const userEmail = req.params.email;
        const userInfo = await Users.findOne({ email: userEmail });
        res.send(userInfo);
    }),
);

// 로그인 라우터 passport local로 인증
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    // 유저 토큰 생성 및 쿠키에 전달
    setUserToken(res, req.user);

    res.send('성공');
});

module.exports = router;
