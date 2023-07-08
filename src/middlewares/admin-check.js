const { secret } = require('../utils/jwt');

// jwt토큰 확인 미들웨어
function adminCheck(req, res, next) {
    const { token } = req.cookies;
    const verified = token.verify(token, secret);
    const email = verified.split('@')[1];
    if (email !== 'admin.com') {
        const error = new Error('관리자가 아닙니다.');
            error.statusCode = 401;
            throw error;
    }

    next();
}

module.exports = adminCheck;
