const mongoose = require("mongoose");

const mobileSchema = mongoose.Schema({
  primary: {
    type: String,
    trim: true,
    required: [true, "Please enter an URL primary"],
  },
  fallback: {
    type: String,
    trim: true,
    required: [true, "Please enter an URL fallback"],
  },
});

const urlSchema = mongoose.Schema({
  slug: {
    type: String,
    required: [true, "Please enter a slug"],
    unique: [true, "A URL slug must be unique"],
    trim: true, // Remove all the white space in the beginning or end of the field
  },
  web: {
    type: String,
    trim: true,
    required: [true, "Please enter a web URL"],
  },
  ios: {
    type: mobileSchema,
    default: () => ({}),
    required: [true, "Please enter an iOS URL"],
  },
  android: {
    type: mobileSchema,
    default: () => ({}),
    required: [true, "Please enter an android URL"],
  },
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
