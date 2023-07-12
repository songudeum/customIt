const { Router } = require('express');

const router = Router();

// 어드민 로그인 화면
router.get('/login', (req, res) => {
    res.render('admin-login');
});

// 어드민 회원가입 화면
router.get('/join', (req, res) => {
    res.render('admin-signin');
});

module.exports = router;
