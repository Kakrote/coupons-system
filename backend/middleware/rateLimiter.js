const rateLimit = require("express-rate-limit");

const claimLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 15 minutes me max 5 requests allow hongi
  message: "Too many requests! Please try again later.",
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
  keyGenerator: (req) => req.headers["x-forwarded-for"] || req.ip // ✅ Fix for Proxy IP detection
});

module.exports = claimLimiter;
