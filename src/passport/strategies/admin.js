const LocalStrategy = require('passport-local').Strategy;
const { Admin } = require('../../data-access');
const createHash = require('../../utils/hash-password');

const config = { usernameField: 'email', passwordFiled: 'password' };

const admin = new LocalStrategy(config, async (email, password, done) => {
    try {
        // 입력된 이메일을 바탕으로 유저 찾고 이메일과 비밀번호 일치 여부 확인
        const user = await Admin.findOne({ email });
        if (!user) {
            const error = new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
            error.statusCode = 400;
            throw error;
        }
        if (user.password !== createHash(password)) {
            const error = new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
            error.statusCode = 400;
            throw error;
        }
        done(null, { email: user.email, name: user.name });
    } catch (err) {
        done(err, null);
    }
});

module.exports = admin;
