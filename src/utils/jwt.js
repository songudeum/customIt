const jwt = require("jsonwebtoken");
const jwtSecret = "CUSTOMIT_JSON_WEB_TOKEN_KEY_!@#$";

exports.jwtSecret = jwtSecret;

//토큰 생성하고 쿠키에 담아주는 함수
exports.setUserToken = (req, user) => {
    const token = jwt.sign(user, jwtSecret);
    res.cookie("token", token);
};
