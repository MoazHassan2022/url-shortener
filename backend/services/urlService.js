const AppError = require("../utils/appError");
const Url = require("../models/urlModel");
const randomString = require("../utils/randomString");

/**
 * Service class to handle Url manipulations.
 */
class UrlService {
  constructor() {}

  // function to get all urls
  getAllUrls = async () => {
    const urls = await Url.find();
    return urls;
  };

  // function to create an url
  createUrl = async (slug, ios, android, web) => {
    var usedSlug = undefined;
    var existingUrl = undefined;
    if (slug) {
      // Find by slug
      existingUrl = await Url.findOne({ slug });
      // Check if it already exists
      if (existingUrl) {
        // Pass it to the error handler
        throw new AppError("Slug already exists", 409);
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
    return usedSlug;
  };

  // function to create an url
  updateUrl = async (slug, update) => {
    const updatedUrl = await Url.findOneAndUpdate({ slug }, update, {
      new: true,
    });
    // Check if it exists
    if (!updatedUrl) {
      // Pass it to the error handler
      throw new AppError("Url link not found", 409);
    }
    return slug;
  };

  // function to get an url
  getUrl = async (slug, userAgent) => {
    const wantedUrl = await Url.findOne({ slug });
    // Check if it exists
    if (!wantedUrl) {
      // Pass it to the error handler
      throw new AppError("Url not found", 404);
    }
    // Default, it is a web url
    var url = wantedUrl.web;
    // Check if it is an android device
    if (userAgent.includes("Android")) {
      url = wantedUrl.android.primary;
    }
    // Check if it is an ios device
    else if (
      userAgent.includes("iPhone") ||
      userAgent.includes("iPad") ||
      userAgent.includes("iPod") ||
      userAgent.includes("Macintosh")
    ) {
      url = wantedUrl.ios.primary;
    }
    return url;
  };
}

module.exports = UrlService;
