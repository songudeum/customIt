const jwt = require("jsonwebtoken");

//jwt secret 값 불러옴
const jwtSecret = process.env.JWTSECRET;

exports.jwtSecret = jwtSecret;

//토큰 생성하고 쿠키에 담아주는 함수
exports.gernerateToken = (req, user) => {
    const token = jwt.sign(user, jwtSecret);
    res.cookie("token", token);
};