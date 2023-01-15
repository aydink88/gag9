const jwt = require("jsonwebtoken");
const AppError = require("./app-error");
const asyncHandler = require("./async-handler");

module.exports = asyncHandler((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  if (!req.headers.authorization) {
    return next(new AppError("Authentication failed.", 403));
  }

  const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  req.userData = {
    id: decodedToken.id,
    username: decodedToken.username,
    email: decodedToken.email,
    role: decodedToken.role,
  };
  console.log(req.userData);
  next();
});
