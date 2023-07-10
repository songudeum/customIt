const jwt = require('jsonwebtoken');
const { secret } = require('../utils/jwt');

// jwt토큰 확인 미들웨어
function adminCheck(req, res, next) {
    const { token } = req.cookies;

    // jwt 토큰 복호화 한 후의 유저의 email값
    const verified = jwt.verify(token, secret).email;

    // email에서 @이후의 주소만 추출
    const email = verified.split('@')[1];
    if (email !== 'admin.com') {
        const error = new Error('관리자가 아닙니다.');
        error.statusCode = 401;
        throw error;
    }

    res.status(200).json({message: "토큰 확인 완료"})
    next();
}

module.exports = adminCheck;
