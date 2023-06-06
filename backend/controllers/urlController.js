const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/appError");
const Url = require("../models/urlModel");

exports.getAllUrls = catchAsync(async (req, res, next) => {
  try {
    const shortLinks = await Url.find();
    res.status(200).json({
      status: "success",
      shortLinks,
    });
  } catch (error) {
    console.error(error);
    return next(new AppError("Something went wrong!", 500));
  }
});
