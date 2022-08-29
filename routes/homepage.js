const express = require("express");
const router = express.Router();

router.get("/", (req,res) => {
    res.send('home');
});
router.get("/list",restaurantList);
router.get("/support",restaurantSupport);
router.get("/menu", menuList)
router.get("/logout",logoutUser);


router.post("/signup",signUpUser);
router.post("/signin",signInUser);

module.exports = router;