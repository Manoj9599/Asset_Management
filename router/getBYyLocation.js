const data = require("./data.json");

module.exports = getBYyLocation = async (req, res) => {
  try {
    const { assetName, location } = req.params;

    console.log("Name of the Asset : ", assetName);
    console.log("Name of the location : ", location);

    const hasMobile = data.hasOwnProperty(assetName);

       if (!hasMobile) {
        console.log(`Please enter the valid asset name : ${Object.keys(data)}`);
      return res.status(404).json({
        statusCode: 404,
        time: new Date().toISOString(),
        errMessage: `Please enter the valid asset name : ${Object.keys(data)}`,
      });
    }


    const foundObjects = data[assetName].filter(
      (obj) =>
        obj?.Location?.toLowerCase().trim() === location?.toLowerCase().trim()
    );

    if (foundObjects?.length === 0) {
      console.log(
        `There is no data for the asset ${assetName} belongs to the location ${location}`
      );
      return res.status(404).json({
        statusCode: 404,
        time: new Date().toISOString(),
        errMessage: `There is no data for the asset ${assetName} belongs to the location ${location}`,
      });
    }

    return res.status(200).send(foundObjects);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
