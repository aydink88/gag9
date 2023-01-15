const AppError = require('../utils/app-error');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const knex = require('../database/config');
const asyncHandler = require('../utils/async-handler');

//Register /api/auth/register
exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(new AppError('Credentials missing', 401));
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new AppError('Invalid credentials', 422));
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 8);

  const [newUser] = await knex('users')
    .insert({ username, email, password: hashedPassword, role: 'user' })
    .returning(['id', 'username', 'email', 'role']);

  console.log(newUser);

  const token = jwt.sign(
    {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );

  res.status(201).json({
    message: 'success',
    data: { ...newUser, token },
  });
});

//Login /api/auth/login
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Credentials missing', 401));
  }

  const [user] = await knex('users').where({ email });

  if (!user) {
    return next(new AppError('Email or password wrong'));
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return next(new AppError('Email or password wrong'));
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );

  res.json({
    message: 'success',
    data: { username: user.username, email: user.email, token },
  });
});
