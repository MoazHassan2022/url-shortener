const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  slug: {
    type: String,
    required: [true, "Please enter a slug"],
    unique: [true, "A URL slug must be unique"],
    trim: true, // Remove all the white space in the beginning or end of the field
  },
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
