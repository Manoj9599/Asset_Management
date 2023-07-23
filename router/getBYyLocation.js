const { getDatabase } = require("../db/db");
const http = require("../enum/statusCode");

module.exports = getBYyLocation = async (req, res) => {
  try {
    const { assetName, location } = req.params;

    console.info("Name of the Asset : ", assetName);
    console.info("Name of the location : ", location);

    const db = getDatabase();
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((collection) => collection.name);

    if (!collectionNames.includes(assetName)) {
      const errorMessage = `Please enter a valid asset names :  ${collectionNames}`;
      console.error(errorMessage);

      return res.status(http.NOT_FOUND).json({
        statusCode: http.NOT_FOUND,
        time: new Date().toISOString(),
        errMessage: errorMessage,
      });
    }

    const assetCollection = db.collection(assetName);
    const query = { Location: { $regex: location, $options: "i" } };

    const data = await assetCollection.find(query).toArray();

    if (data?.length === 0) {
      const errorMessage = `There is no data for the asset ${assetName} in the location ${location}.`;
      console.error(errorMessage);

      return res.status(http.NOT_FOUND).json({
        statusCode: http.NOT_FOUND,
        time: new Date().toISOString(),
        errMessage: errorMessage,
      });
    }

    return res.status(http.SUCCESS).json({
      statusCode: http.SUCCESS,
      time: new Date().toISOString(),
      data: data,
    });
  } catch (error) {
    console.error(error);

    return res.status(http.INTERNAL_SERVER_ERROR).json({
      statusCode: http.INTERNAL_SERVER_ERROR,
      time: new Date().toISOString(),
      error: error,
    });
  }
};
