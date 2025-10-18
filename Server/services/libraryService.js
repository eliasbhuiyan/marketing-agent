const LibrarySchema = require("../models/LibrarySchema");

const saveImageToLibrary = async (brand, image, type) => {
  if (!brand || !image || !type)
    throw new Error(
      "brand, image and type are required to save image to library"
    );

  const library = new LibrarySchema({
    brand,
    image,
    type,
  });
  await library.save();
};

module.exports = {
  saveImageToLibrary,
};
