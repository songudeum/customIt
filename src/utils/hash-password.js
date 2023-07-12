const bcrypt = require('bcrypt');

const createHash = (password) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return hashedPassword;
};

const comparePassword = (password, userPw) => bcrypt.compareSync(password, userPw);

module.exports = { createHash, comparePassword };
