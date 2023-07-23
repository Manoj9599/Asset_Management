const http = require("../enum/statusCode");
require("dotenv").config();
const basicAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send("Authorization header missing");
  }

  const encodedCred = authHeader.split(" ")[1];
  const decodedCred = Buffer.from(encodedCred, "base64").toString();
  const [username, password] = decodedCred.split(":");

  if (username === process.env.NAME && password === process.env.PASSWORD) {
    return next();
  } else {
    return res.status(http.UNAUTHORIZED).json({
      timeStamp: new Date().toISOString(),
      statusCode: http.UNAUTHORIZED,
      errMessage: "Invalid credentials",
    });
  }
};

module.exports = basicAuth;
