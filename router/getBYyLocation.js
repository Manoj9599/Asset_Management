const data = require("./data.json");

module.exports = getBYyLocation = async (req, res) => {
  try {
    const { assetName, location } = req.params;

    const foundObjects = data[assetName].filter(
      (obj) => obj.Location.trim() === location.trim()
    );

    return res.status(200).send(foundObjects);
  } catch (error) {
    return res.status(500).send(error);
  }
};
