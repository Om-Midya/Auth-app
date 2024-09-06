const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddlewares");

router.get("/profile", protect, (req, res) => {
  res
    .status(200)
    .json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      },
    });
});

module.exports = router;
