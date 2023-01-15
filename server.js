const express = require("express");
const path = require("path");
const morgan = require("morgan");
const errorHandler = require("./utils/error-handler");

const app = express();

console.log(process.env.NODE_ENV);

//ENV VARIABLES
if (process.env.NODE_ENV!=="production") {
  require("dotenv").config();

}

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));
app.use(morgan("dev"));

// CORS ALLOW
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, enctype"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT");

  next();
});

app.use(express.static(path.join(__dirname, "client", "dist")));
//Serve static folder for uploads
app.use("/uploads", express.static(path.join("uploads")));


//ROUTES
app.use("/api/posts", require("./routes/post"));
app.use("/api/users", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));

app.get("/*", (req, res) => {
  res.send(path.join("client", "dist", "index.html"));
});

// app.all('*', (req, res, next) => {
//   res.status(404).json({ message: `Can't find ${req.originalUrl} on this server!` });
// });

//Catch errors with last middlaware
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => console.log("server running ", process.env.PORT));
