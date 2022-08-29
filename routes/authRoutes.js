const express = require("express");
const router = express.Router();
const {logoutUser, signUpUser,signInUser} = require("../controllers/userController")
const protect  = require("../middleware/authMiddleware")

router.post("/signup",signUpUser);
router.post("/signin",signInUser);
router.get("/logout",logoutUser)
router.get("/home",home);
router.get("/list",restaurantList);
router.get("/support",restaurantSupport);


module.exports = router;
