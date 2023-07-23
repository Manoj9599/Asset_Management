const express = require("express"),
  app = express(),
  cors = require("cors"),
  http = require("./enum/statusCode"),
  basicAuth = require("./auth/auth"),
  { connectToMongo } = require("./db/db"),
  getBYyLocation = require("./router/getBYyLocation");

require("dotenv").config();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectToMongo();

app.get("/", async (req, res) => {
  return res.status(http.SUCCESS).json({
    timeStamp: new Date().toISOString(),
    statusCode: http.SUCCESS,
    message: "Welcome to Asset Management System",
  });
});

app.get("/api/:assetName/:location", basicAuth, getBYyLocation);

app.use((req, res, next) => {
  if (req.path === "/") {
    return next();
  } else {
    const error = new Error("Not valid route");
    error.status = http.NOT_FOUND;
    return next(error);
  }
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    errMessage: err.message,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`BE server running at http://localhost:${process.env.PORT}/...`);
});
