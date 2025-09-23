const express = require("express");
const multer = require("multer");
const passport = require("passport");
const {
  googleCallback,
  userProfile,
  logoutUser,
  refreshAccessToken,
  setActiveBrand,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const {
  generalLimiter,
  aiLimiter,
  authLimiter,
} = require("../middleware/rateLimiter");
const {
  createOrUpdateBrandSettings,
  getBrandSettings,
  inviteTeamMember,
  acceptInvitation,
  deleteTeamMember,
} = require("../controllers/brandSettingsController");
const { checkRole } = require("../middleware/roleMiddleware");
const {
  getIntegrations,
  getIntegrationDetails,
  initiateOAuth,
  handleOAuthCallback,
  disconnectIntegration,
  publishContent,
  publishContentEnhanced,
  publishToMultiplePlatforms,
  getPostingStats,
  getBrandPosts,
  cancelScheduledPost,
  getQueueStats,
  testConnection,
} = require("../controllers/integrationController");
const {
  posterDesignController,
  posterCaptionGenerator,
} = require("../controllers/posterDesignController");
const {
  captionGenerator,
  BlogHeadingImages,
  BlogGenerator,
  KeywordHashtagGenerator,
  productDescriptionGenerator,
} = require("../controllers/contentCopywritingController");
const {
  getTrends,
  refreshTrends,
} = require("../controllers/trendAnalyzerController");
const { scriptWriterController } = require("../controllers/youtubeMarketingController");

const upload = multer();
const router = express.Router();

// Apply general rate limiting to all routes
router.use(generalLimiter);

router.get("/", (req, res) => {
  res.redirect(process.env.CLIENT_URL);
});

// Google OAuth with auth rate limiting
router.get(
  "/google",
  authLimiter,
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  authLimiter,
  passport.authenticate("google", { session: false }),
  googleCallback
);

// Authentication routes with appropriate rate limiting
router.get("/auth/profile", authLimiter, authMiddleware, userProfile);
router.post("/auth/logout", logoutUser);
router.post("/auth/refresh", refreshAccessToken);
router.post("/auth/brand", authMiddleware, setActiveBrand);

// Brand routes
router.get("/brand", authMiddleware, getBrandSettings);
router.post("/brand", authMiddleware, createOrUpdateBrandSettings);
router.post("/inviteamember", authMiddleware, inviteTeamMember);
router.get("/acceptinvite/:token", acceptInvitation);
router.post("/removemember", authMiddleware, deleteTeamMember);

// AI routes ===>
router.post(
  "/posterdesign",
  upload.fields([
    { name: "productImg", maxCount: 1 },
    { name: "modelImg", maxCount: 1 },
  ]),
  posterDesignController
);
// Poster Caption
router.post("/postercaption", authMiddleware, posterCaptionGenerator);

// Normal Caption Generator
router.post("/captiongenerator", authMiddleware, captionGenerator);
router.post("/blogheadings", authMiddleware, BlogHeadingImages);
router.post("/bloggenerator", authMiddleware, BlogGenerator);

router.post(
  "/keywordhashtaggenerator",
  authMiddleware,
  KeywordHashtagGenerator
);
router.post(
  "/productdescription",
  authMiddleware,
  productDescriptionGenerator
);
// Trend analyzer routes
router.get("/trends", authMiddleware, getTrends);

// Youtube routes
router.post("/generatescript", authMiddleware, scriptWriterController);


// Integration routes
router.get("/integrations", authMiddleware, getIntegrations);
router.get("/integrations/:platform", authMiddleware, getIntegrationDetails);
router.post("/integrations/:platform/connect", authMiddleware, initiateOAuth);
router.get("/integrations/callback/:platform", handleOAuthCallback);
router.delete("/integrations/:platform", authMiddleware, disconnectIntegration);
router.post("/integrations/:platform/publish", authMiddleware, publishContent);
router.post("/integrations/:platform/test", authMiddleware, testConnection);

// Enhanced posting routes
router.post("/posts/publish", authMiddleware, publishContentEnhanced);
router.post(
  "/posts/publish-multiple",
  authMiddleware,
  publishToMultiplePlatforms
);
router.get("/posts/stats", authMiddleware, getPostingStats);
router.get("/posts", authMiddleware, getBrandPosts);
router.delete("/posts/:postId/cancel", authMiddleware, cancelScheduledPost);

// Queue management routes
router.get("/queue/stats", authMiddleware, getQueueStats);

router.use((req, res) => {
  res.status(404).send("Page not found!");
});

module.exports = router;
