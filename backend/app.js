const express = require("express");
const morgan = require("morgan");
const urlRouter = require("./routes/urlRoutes");
const globalErrorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");
const useragent = require("useragent");
const AppError = require("./utils/appError");

const app = express();

// MIDDLEWARES

app.use(cors());
app.options("*", cors());

// Set security HTTP headers
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
  })
);

// Store the platform information in the 'platform' property of the request object
app.use((req, res, next) => {
  const agent = useragent.parse(req.headers["user-agent"]);
  req.platform = agent.os.family.toLowerCase();
  next();
});

// Development logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Body parser, reading date from body into req.body
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss()); // prevent dangerous of html and javascript code in the request

// Write down the date the reqest was made
app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleString();
  next();
});

// Limit requests from same IP address
const limiter = rateLimit({
  max: 5000,
  windowMs: 60 * 60 * 1000, // Ms: milliseconds, this will allow the same IP address to perform only 5000 request per hour
  message:
    "Too many requests from this IP address, please try again in an hour!",
});
app.use("/api", limiter); // limit only api requests

// ROUTES
app.use("/api/urls", urlRouter);

// Any route that is not defined will be handled by this middleware
app.all("*", (req, res, next) => {
  next(
    new AppError(
      `This URL: ${req.originalUrl} is not found on this server`,
      404
    )
  );
});

// Error handler middleware
app.use(globalErrorHandler);
module.exports = app;
