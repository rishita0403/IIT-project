const express = require('express');
const { signup, login, updateUserDetails } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.put('/user/:userId', updateUserDetails);

module.exports = router;
