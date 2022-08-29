const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userData");

const signUpUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ message: "plz fill all the feilds" });
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
      password: hashedPassword,
    });

    const isMatch = await user.save();
    if (isMatch) {
      res.status(201).json({
        _id: user.id,
        email: user.email,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const signInUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ message: "plz fill all the feilds" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.status(201).json({
        _id: user.id,
        email: user.email,
        message: "user signin successfully",
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ message: "invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User logout");
};

//Generate token
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
