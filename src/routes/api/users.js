const { Router } = require('express');
const { Users } = require('../../data-access');
const asyncHandler = require('../../utils/async-handler');
const createHash = require('../../utils/hash-password');
const { jwtVerify } = require('../../utils/jwt');

const router = Router();

// 회원가입 사용자 이메일 중복 확인 api (send render로바꾸기!)
router.post(
    '/join/emailDuplicate',
    asyncHandler(async (req, res) => {
        const { email } = req.body;
        const emailDuplicate = await Users.findOne({ email });
        if (emailDuplicate) {
            res.json({ message: '중복된 이메일이 존재합니다.' });
        } else {
            res.json({ message: '사용가능한 이메일입니다.' });
        }
    }),
);

// 개인페이지 사용자 정보 수정 api(send 나중에 render로 수정)
router.put(
    '/info/edit/:email',
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
        res.render(newUserInfo);
    }),
);

module.exports = router;
