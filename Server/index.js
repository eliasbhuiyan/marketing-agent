require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router');
const passport = require("passport");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
require("./config/passport");
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(router);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log(err));

app.listen(8000,()=>{
  console.log("Server is running");
})