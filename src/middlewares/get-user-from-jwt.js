const passport = require('passport');

// jwt토큰 확인 미들웨어
function passportAuthenticate(req, res, next) {
    if (!req.cookies.token) {
        res.status(401).send('로그인X')    
    }

    return passport.authenticate('jwt', { session: false })(req, res, next);
}

module.exports = passportAuthenticate
