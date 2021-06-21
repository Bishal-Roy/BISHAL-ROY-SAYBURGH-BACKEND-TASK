const express = require('express');
const router = express.Router();
const user = require('../controlers/userControlers');

router.post('/register', user.registerUser);

router.post('/login', user.authUser);

module.exports = router;
