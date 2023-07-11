const passport = require('passport');
const local = require('./strategies/local');
const admin = require('./strategies/admin');
const jwt = require('./strategies/jwt');

module.exports = () => {
    passport.use('admin', admin);

    passport.use(local);
    // jwt strategy 사용
    passport.use(jwt);
};
