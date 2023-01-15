const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { check } = require('express-validator');

const userValidator = [
  check('username').not().isEmpty(),
  check('email').normalizeEmail().isEmail(),
  check('password').isLength({
    min: 6,
  }),
];

router.post('/register', userValidator, authController.register);
router.post('/login', authController.login);

module.exports = router;
