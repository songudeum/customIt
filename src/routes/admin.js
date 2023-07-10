const { Router } = require('express');
const { Admin } = require('../data-access');
const asyncHandler = require('../utils/async-handler');
const createHash = require('../utils/hash-password');

const router = Router();

// 사용자 회원가입 api
router.post(
    '/join',
    asyncHandler(async (req, res) => {
        const { email, password, name } = req.body;

        // 이메일 형식 체크하는 조건문
        const emailCheck = /[a-z0-9]+@admin.com/;
        if (!emailCheck.test(email)) {
            const error = new Error('@admin.com 형식으로 입력해주세요.');
            error.statusCode = 400;
            throw error;
        }

        // 비밀번호 형식 체크하는 조건문
        const pwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
        if (!pwCheck.test(password)) {
            const error = new Error(
                '비밀번호 형식은 대소문자/특수문자 조합 8~15자로 입력해주세요.',
            );
            error.statusCode = 400;
            throw error;
        }

        // 비밀번호 hash화 작업
        const hashedPassword = createHash(password);

        await Admin.create({
            email,
            password: hashedPassword,
            name,
        });

        res.status(201).json({ message: '회원가입 성공' });
        res.redirect('/');
    }),
);

module.exports = router;