const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const randomString = require("../utils/randomString");
const Url = require("../models/urlModel");

// Controller function to get all urls
exports.getAllUrls = catchAsync(async (req, res, next) => {
  try {
    const urls = await Url.find();
    res.status(200).json({
      status: "success",
      urls,
    });
  } catch (error) {
    console.error(error);
    // Pass it to the error handler
    return next(new AppError("Something went wrong!", 500));
  }
});

// Controller function to create a new url
exports.createUrl = catchAsync(async (req, res, next) => {
  const { slug, ios, android, web } = req.body;
  var usedSlug = undefined;
  try {
    var existingUrl = undefined;
    if (slug) {
      // Find by slug
      existingUrl = await Url.findOne({ slug });
      // Check if it already exists
      if (existingUrl) {
        // Pass it to the error handler
        return next(new AppError("Slug already exists", 409));
      }
      usedSlug = slug;
    } else {
      var foundInUrls = true;
      var randomSlug = undefined;
      while (foundInUrls) {
        // Generate random slug
        randomSlug = randomString(8);
        // Find by slug
        existingUrl = await Url.findOne({ slug: randomSlug });
        if (!existingUrl) {
          foundInUrls = false;
        }
      }
      usedSlug = randomSlug;
    }
    const newUrl = new Url({ slug: usedSlug, ios, android, web });
    await newUrl.save();
    res.status(200).json({
      status: "success",
      // Construct the url
      url: `${process.env.HOST}:${process.env.PORT}/${usedSlug}`,
    });
  } catch (error) {
    console.error(error);
    // Pass it to the error handler
    return next(new AppError("Something went wrong!", 500));
  }
});

// Controller function to update an url
exports.updateUrl = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;
  const update = req.body;
  try {
    const updatedUrl = await Url.findOneAndUpdate({ slug }, update, {
      new: true,
    });
    // Check if it exists
    if (!updatedUrl) {
      // Pass it to the error handler
      return next(new AppError("Short link not found", 409));
    }
    res.status(200).json({
      status: "success",
      // Construct the url
      url: `${process.env.HOST}:${process.env.PORT}/${updatedUrl.slug}`,
    });
  } catch (error) {
    console.error(error);
    // Pass it to the error handler
    return next(new AppError("Something went wrong!", 500));
  }
});

// Controller function to update an url
exports.getUrl = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;
  const update = req.body;
  try {
    const updatedUrl = await Url.findOneAndUpdate({ slug }, update, {
      new: true,
    });
    // Check if it exists
    if (!updatedUrl) {
      // Pass it to the error handler
      return next(new AppError("Short link not found", 409));
    }
    res.status(200).json({
      status: "success",
      // Construct the url
      url: `${process.env.HOST}:${process.env.PORT}/${updatedUrl.slug}`,
    });
  } catch (error) {
    console.error(error);
    // Pass it to the error handler
    return next(new AppError("Something went wrong!", 500));
  }
});
