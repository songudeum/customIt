// 로그인 여부 체크해주는 미들웨어
module.exports = (req, res, next) => {
    // 로그인 안되어 있다면 메인 화면으로
    if (!req.cookies.token) {
        res.redirect('/')
        return;
    }

    // 로그인 되어있다면 다음 미들웨어로
    next();
};
