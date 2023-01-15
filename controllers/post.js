const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const asyncHandler = require('../utils/async-handler');
const knex = require('../database/config');
const AppError = require('../utils/app-error');

// Get all posts /api/posts - GET
exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await knex('posts').select('*');
  res.status(200).json({
    message: 'success',
    data: posts,
  });
});

//Get single post /api/posts/:pid (primary key id)
exports.getSinglePost = asyncHandler(async (req, res) => {
  const [post] = await knex('posts')
    .innerJoin('users', 'posts.userId', '=', 'users.id')
    .where({ 'posts.id': req.params.pid })
    .select('posts.*', 'users.username', 'users.email', 'users.role');
  res.status(200).json({
    message: 'success',
    data: post,
  });
});

// //Create a post /api/posts - POST
exports.createPost = asyncHandler(async (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    let oldpath = files.image.path;
    let newpath = path.join(__dirname, '..', 'uploads', 'images') + '/' + files.image.name;

    fs.copyFile(oldpath, newpath, function (err) {
      if (err) console.log(err);
    });
    fs.unlink(oldpath, (err) => {
      if (err) console.log(err);
    });

    const data = {
      category: fields.category,
      title: fields.title,
      image: `/uploads/images/${files.image.name}`,
      upvotes: 0,
      downvotes: 0,
      userId: req.userData.id,
    };

    const post = await knex('posts').insert(data).returning('*');
    res.status(201).json({
      message: 'success',
      data: post,
    });
  });
});

//Update a post /api/posts/:pid
exports.updatePost = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const filteredBody = filterObj(req.body, 'title', 'image', 'category');

  const [post] = await knex('posts').where({ id: req.params.pid });

  if (post.userId !== req.userData.id && req.userData.role !== 'admin') {
    return next(new AppError('Not your post', 403));
  }

  const updatedObj = { ...post };
  Object.keys(filteredBody).forEach((el) => {
    updatedObj[el] = filteredBody[el];
  });

  const [updatedPost] = await knex('posts')
    .where({ id: post.id })
    .update(updatedObj, ['id', 'title', 'category', 'image']);

  res.status(200).json({
    message: 'success',
    data: updatedPost,
  });
});

//Delete a post /api/posts/:pid
exports.deletePost = asyncHandler(async (req, res, next) => {
  const [post] = await knex('posts').where({ id: req.params.pid });

  if (post.userId !== req.userData.id && req.userData.role !== 'admin') {
    return next(new AppError('Not your post', 403));
  }

  console.log(post);

  await knex('posts').where({ id: req.params.pid }).del();
  res.status(204).json({
    message: 'success',
    data: 'post deleted',
  });
});

// Upvote a post /api/posts/upvote/:pid PUT
exports.upvotePost = asyncHandler(async (req, res) => {
  const post = await knex('posts').where({ id: req.params.pid }).increment('upvotes', 1);

  res.status(200).json({
    message: 'success',
    data: post,
  });
});

// Downvote a post /api/posts/downvote/:pid PUT
exports.downvotePost = asyncHandler(async (req, res) => {
  const post = await knex('posts').where({ id: req.params.pid }).increment('downvotes', 1);

  res.status(200).json({
    message: 'success',
    data: post,
  });
});

//filter req.body for allowed fields
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
