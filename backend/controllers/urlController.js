const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const UrlService = require("../services/urlService");

const urlServiceInstance = new UrlService();

// Controller function to get all urls
exports.getAllUrls = catchAsync(async (req, res, next) => {
  try {
    const urls = await urlServiceInstance.getAllUrls();
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
  try {
    const usedSlug = await urlServiceInstance.createUrl(
      slug,
      ios,
      android,
      web
    );
    res.status(200).json({
      status: "success",
      // Construct the url
      url: `${process.env.HOST}:${process.env.PORT}/api/urls/${usedSlug}`,
    });
  } catch (error) {
    console.error(error);
    // Pass it to the error handler
    return next(error);
  }
});

// Controller function to update an url
exports.updateUrl = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;
  var update = req.body;
  // make sure slug is not updated
  delete update.slug;
  try {
    const usedSlug = await urlServiceInstance.updateUrl(slug, update);
    res.status(200).json({
      status: "success",
      // Construct the url
      url: `${process.env.HOST}:${process.env.PORT}/api/urls/${usedSlug}`,
    });
  } catch (error) {
    console.error(error);
    // Pass it to the error handler
    return next(error);
  }
});

// Controller function to get an url link according to device type (ios, android, web)
exports.getUrl = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;
  try {
    const url = await urlServiceInstance.getUrl(slug, req.get("User-Agent"));
    res.status(200).json({
      status: "success",
      url,
    });
  } catch (error) {
    console.error(error);
    // Pass it to the error handler
    return next(error);
  }
});
