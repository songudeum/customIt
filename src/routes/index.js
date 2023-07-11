const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.send('성공');
});

module.exports = router;
