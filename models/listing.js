const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: [String], // Allow array of strings
    required: true, // Optional: Make it required
  },
  price: Number,
  location: String,
  country: String,
  reviews: [{ type:Schema.Types.ObjectId, ref: 'Review' }],
 
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // category:{
  //   type:string,
  //   enum:["mountains","arctic","farm",'"deserts']
  // }

});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;