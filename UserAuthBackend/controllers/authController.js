const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const secret = "CrazySecret";

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });
    res.status(201).json({ token, user: { username, email, id: user._id } });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ error: "Incorrect email or password" });
      return;
    }
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });
    // if successful request then send token and user details without password
    res.status(200).json({
      token,
      user: { username: user.username, email: user.email, id: user._id },
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
  console.log("hit");
};
