const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('<h1>Hello brother</h1>');
});

router.use('/api/v1/auth', require('./authRoute'));

module.exports = router;
