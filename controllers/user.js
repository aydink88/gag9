const bcrypt = require('bcryptjs');
const asyncHandler = require('../utils/async-handler');
const AppError = require('../utils/app-error');
const knex = require('../database/config');

// Get all users /api/users GET
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await knex('users').select('*');
  if (!users) {
    return next(new AppError('No user found', 404));
  }
  res.json(users);
});

// Get single user /api/users/:uid GET
exports.getSingleUser = asyncHandler(async (req, res, next) => {
  const [user] = await knex('users').select('*').where({ id: req.params.uid });
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.json(user);
});

// Creating user for admin /api/users/ POST
exports.createUser = asyncHandler(async (req, res, next) => {
  if (req.userData.role !== 'admin') {
    return next(new AppError('unauthorized', 403));
  }

  const { username, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 8);

  const newUser = await knex('users')
    .insert({ username, email, hashedPassword, role })
    .returning('*');
  res.status(201).json(newUser);
});

// update user for admin /api/users/:uid PUT
exports.updateUser = asyncHandler(async (req, res, next) => {
  if (req.userData.role !== 'admin') {
    return next(new AppError('unauthorized', 403));
  }

  const [user] = await knex('users').select('*').where({ id: req.params.uid });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const updateObj = {};
  Object.keys(req.body).forEach((el) => {
    user[el] = req.body[el];
  });

  await knex('users').update(updateObj);

  res.json(updateObj);
});

// delete user for admin /api/users/:uid DELETE
exports.deleteUser = asyncHandler(async (req, res, next) => {
  if (req.userData.role !== 'admin') {
    return next(new AppError('You are not authorized', 403));
  }
  await knex('users').where({ id: req.params.uid }).del();
  res.status(204).json({ success: true, data: 'user deleted' });
});
