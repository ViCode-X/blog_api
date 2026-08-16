const express = require('express');

const router = express.Router();

const { registerUser, loginUser } = require('../controllers/user.controller.js');

router.post('/sign-up', registerUser);
router.post('/login', loginUser);

module.exports = router;