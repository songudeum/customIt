const passport = require('passport');

// jwt토큰 확인 미들웨어
function passportAuthenticate(req, res, next) {
    if (!req.cookies.token) {
        next();    
    }

    return passport.authenticate('jwt', { session: false })(req, res, next);
}

module.exports = passportAuthenticate
