// const { Router } = require('express');
const { Router } = require('express');
const { Admin } = require('../../data-access');
const asyncHandler = require('../../utils/async-handler');

const router = Router();

// 관리자 이메일 중복 확인 api (render값 수정해야함)
router.post(
    '/join/emailDuplicate',
    asyncHandler(async (req, res) => {
        const { email } = req.body;
        const emailDuplicate = await Admin.findOne({ email });
        if (emailDuplicate) {
            res.render('중복된 이메일이 존재합니다.');
        } else res.render('성공');
    }),
);

module.exports = router;
