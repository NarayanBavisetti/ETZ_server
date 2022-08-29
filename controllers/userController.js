const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userData");

const signUpUser = async (req, res) => {
  const { email, password, } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.json({ message: "plz fill all the fields" });
  }

  try {
    const userexists = await User.findOne({ email });
    if (userexists) {
      return res.status(422).json({ message: "Email already exists" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await new User({
      email,
      password: hashedPassword
    });
    
    const isMatch = await user.save();
    if (isMatch) {
      res.status(201).json({
        _id: user.id,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const signInUser = async (req, res) => {
  let token;
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.json({ message: "plz fill all the fields" });
  }

  try {
    const userexists = await User.findOne({ email });

    // const token = await userexists.generateAuthToken();

    if (!userexists) {
      return res.status(400).json({ message: "invalid credentials e" });
    }
    const isMatch = await bcrypt.compare(password, userexists.password);

    if (isMatch) {
      token = await userexists.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 2589200000),
        httpOnly: true,
      });

      res.status(201).json({
        message: "user signin successfully",
      });
    } else {
      return res.status(400).json({ message: "invalid credentials p" });
    }
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = async (req, res) => {
    res.clearCookie("jwtoken", { path: "/" });
    res.status(200).send("User logout");
  };
  
  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };


module.exports = {
    signUpUser,
    signInUser,
    logoutUser,
  };
  