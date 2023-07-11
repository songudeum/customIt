const crypto = require('crypto');

// 비밀번호 hash화 하는 함수
module.exports = (password) => {
    const hash = crypto.createHash('sha1');
    hash.update(password);
    return hash.digest('hex');
};