const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});

    // Map through the data and modify the `image` field if needed
    initData.data = initData.data.map((obj) => {
      // Ensure the `image` field is a string (URL) or adjust as per schema
      const imageUrl = obj.image?.url || obj.image; // Handle `image` as object or string
      if (!imageUrl) {
        console.warn(`Skipping entry with missing image: ${JSON.stringify(obj)}`);
        return null; // Skip entries without a valid image
      }

      return {
        ...obj,
        owner: "6795c3fcb8aab37f213cf7d9",
        image: imageUrl, // Assign the `url` as the `image` field
      };
    });

    // Filter out any `null` entries (e.g., invalid data)
    const validData = initData.data.filter((item) => item !== null);

    // Insert valid data into the database
    await Listing.insertMany(validData);
    console.log("Data was initialized");
  } catch (error) {
    console.error("Error initializing the database:", error.message);
  }
};

initDB();
