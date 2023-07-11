const jwt = require('jsonwebtoken');

const secret = process.env.JWTSECRET;

exports.secret = secret;

exports.setUserToken = (res, user) => {
    // 유저 jwt 토큰생성
    // 토큰을 쿠키로 전달하며 쿠키의 유효기간은 1시간
    const token = jwt.sign(user, secret);
    res.cookie('token', token, { maxAge: 3600000 });
};

// jwt복호화해서 이메일 주소 얻는 코드
exports.jwtVerify = (req) => {
    const { token } = req.cookies;
    const { email } = jwt.verify(token, secret);
    return email;
};
