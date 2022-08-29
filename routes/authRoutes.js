const express = require("express");
const router = express.Router();
const {logoutUser, signUpUser,signInUser} = require("../controllers/userController")
const protect  = require("../middleware/authMiddleware")

router.post("/signup",signUpUser);
router.post("/signin",signInUser);
router.get("/logout",logoutUser)


module.exports = router;
