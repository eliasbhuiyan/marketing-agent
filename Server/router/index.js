const express = require('express');
const multer = require('multer');
const passport = require('passport');
const { googleCallback, userProfile, logoutUser, refreshAccessToken, setActiveBrand } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const { generalLimiter, aiLimiter, authLimiter } = require('../middleware/rateLimiter');
const { createOrUpdateBrandSettings, getBrandSettings, inviteTeamMember } = require('../controllers/brandSettingsController');
const { checkRole } = require('../middleware/roleMiddleware');
const upload = multer()
const router = express.Router();

// Apply general rate limiting to all routes
router.use(generalLimiter);

router.get('/', (req, res) => {
  res.redirect(process.env.CLIENT_URL)
});

// Google OAuth with auth rate limiting
router.get("/google", authLimiter, passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", authLimiter, passport.authenticate("google", { session: false }), googleCallback);

// Authentication routes with appropriate rate limiting
router.get("/auth/profile", authLimiter, authMiddleware, userProfile);
router.post("/auth/logout", logoutUser);
router.post("/auth/refresh", refreshAccessToken);
router.post("/auth/brand", authMiddleware, setActiveBrand);

// Brand routes
router.get("/brand", authMiddleware, getBrandSettings)
router.post("/brand", authMiddleware, createOrUpdateBrandSettings)
router.post("/inviteamember", authMiddleware, inviteTeamMember)

router.use((req, res)=>{
    res.status(404).send("Page not found!")
})

module.exports = router;
