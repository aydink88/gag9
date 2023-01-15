const fs = require("fs");

const errorHandler = (err, req, res, next) => {
  if (req.file && req.file.path !== "uploads/images/default.png") {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(err);
  }

  let error = { ...err };

  error.message = err.message;

  console.log(err);

  if (err.message === "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email") {
    error.message = "Email already registered";
    error.statusCode = 422;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
