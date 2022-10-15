var express = require('express');
var router = express.Router();

// controllers
const index = require("../controllers/index");
const auth = require("../controllers/auth");
const users = require("../controllers/users");

// Get Home Page
router.get('/', index);

// Get Sign up Page
router.get("/sign-up", auth.getSignUp);

// Post Sign up Page
router.post("/sign-up", auth.postSignUp);

// Get Log in Page
router.get("/log-in", auth.getLogIn);

// Post Log in Page
router.post("/log-in", auth.postLogIn);

// Get Log out page
router.get("/log-out", auth.getLogOut);

// Get Create Message
router.get("/create-message", users.getCreateMessage);

// Post Create Message
router.post("/create-message", users.postCreateMessage);

// Get Become Member
router.get("/member", users.getBecomeMember);

// Post Become Member
router.post("/member", users.postBecomeMember);

// Get Become Admin
router.get("/admin", users.getBecomeAdmin);

// Post Become Admin
router.post("/admin", users.postBecomeAdmin);

// Get Delete Message
router.get("/delete/:id", users.getDeleteMessage);

module.exports = router;
