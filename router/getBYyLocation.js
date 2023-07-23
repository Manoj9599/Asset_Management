const data = require("./data.json");

module.exports = getBYyLocation = async (req, res) => {
  try {
    const { assetName, location } = req.params;
      console.log(assetName,'assetName')
    console.log(location,'location')
    const foundObjects = data[assetName].filter(
      (obj) => obj?.Location?.toLowerCase().trim() === location?.toLowerCase().trim()
    );

    return res.status(200).send(foundObjects);
  } catch (error) {
    return res.status(500).send(error);
  }
};
