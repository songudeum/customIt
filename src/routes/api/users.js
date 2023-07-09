const { Router } = require('express');
const { Users } = require('../../data-access');
const asyncHandler = require('../../utils/async-handler');
const createHash = require('../../utils/hash-password');
const getUserFromJWT = require('../../middlewares/get-user-from-jwt');
const { jwtVerify } = require('../../utils/jwt');

const router = Router();

// 회원가입 사용자 이메일 중복 확인 api (send render로바꾸기!)
router.post(
    '/join/emailDuplicate',
    asyncHandler(async (req, res) => {
        const { email } = req.body;
        const emailDuplicate = await Users.findOne({ email });
        if (emailDuplicate) {
            res.status(200);
            res.send('중복된 이메일이 존재합니다.');
        } else {
            res.status(200);
            res.send('성공');
        }
    }),
);

// 개인페이지 사용자 정보 수정 api(send 나중에 render로 수정)
router.put(
    '/info/edit/:email',
    getUserFromJWT,
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
        res.status(200).json({ message: '사용자 정보 완료' });
        res.send(newUserInfo);
    }),
);

module.exports = router;
