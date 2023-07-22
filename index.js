const express = require("express"),
  cors = require("cors"),
  app = express(),
  getBYyLocation = require("./router/getBYyLocation");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/:assetName/:location", getBYyLocation);

app.listen(`3000`, () => {
  console.log(`BE server running at 3000...`);
});
