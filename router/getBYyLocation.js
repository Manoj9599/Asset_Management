const data = require("./data.json");

module.exports = getBYyLocation = async (req, res) => {
  try {
    const { assetName, location } = req.params;

    console.log(assetName, "Name of the Asset");
    console.log(location, "Name of the location");

    const hasMobile = data.hasOwnProperty(assetName);

    if (!hasMobile) {
      return res
        .status(404)
        .send(`Please enter the valid asset name : ${Object.keys(data)}`);
    }

    const foundObjects = data[assetName].filter(
      (obj) =>
        obj?.Location?.toLowerCase().trim() === location?.toLowerCase().trim()
    );

    console.log(
      `There is no data for the asset ${assetName} and  location ${location}`
    );

    if (foundObjects?.length === 0) {
      return res
        .status(404)
        .send(
          `There is no data for the asset ${assetName} and  location ${location}`
        );
    }

    return res.status(200).send(foundObjects);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
