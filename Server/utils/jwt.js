const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL || "15m";
const REFRESH_TOKEN_TTL = process.env.REFRESH_TOKEN_TTL || "10d";

function generateAccessToken(user, brandId) {
  return jwt.sign(
    { id: user._id, email: user.email, brandId },
    process.env.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_TTL }
  );
}

function generateRefreshToken(user, brandId) {
  return jwt.sign(
    { id: user._id, email: user.email, brandId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_TTL }
  );
}
function generateInviteToken(email, brandId){
  return jwt.sign(
    { email, brandId, role: "editor" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}
function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}
function verifyInviteToken(token){
  return jwt.verify(token, process.env.JWT_SECRET);
}


module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateInviteToken,
  verifyInviteToken
};
