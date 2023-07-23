const data = require("./data.json");

module.exports = getBYyLocation = async (req, res) => {
  try {
    const { assetName, location } = req.params;

    console.info("Name of the Asset : ", assetName);
    console.info("Name of the location : ", location);

    if (!(assetName in data)) {
      const validAssetNames = Object.keys(data).join(", ");
      const errorMessage = `Please enter a valid asset names :  ${validAssetNames}`;
      console.error(errorMessage);

      return res.status(404).json({
        statusCode: 404,
        time: new Date().toISOString(),
        errMessage: errorMessage,
      });
    }

    const foundObjects = data[assetName].filter(
      (obj) =>
        obj?.Location?.toLowerCase().trim() === location?.toLowerCase().trim()
    );

    if (foundObjects.length === 0) {
      const errorMessage = `There is no data for the asset ${assetName} in the location ${location}.`;
      console.error(errorMessage);

      return res.status(404).json({
        statusCode: 404,
        time: new Date().toISOString(),
        errMessage: errorMessage,
      });
    }

    return res.status(200).send(foundObjects);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
