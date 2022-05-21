const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { name, email, phone } = req.body;
  const accessToken = jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  // is user already exist
  const _user = await User.findOne({ email });
  if (_user) {
    res.json({
      accessToken,
      _user,
    });
  } else {
    // create new user
    const newUser = new User({
      name,
      email,
      phone,
    });
    // save user
    const _user = await newUser.save();

    // if user create failed
    if (!_user) return res.json({ message: "User Register Failed." });

    res.json({
      accessToken,
      _user,
    });
  }
});

// login user
router.post("/login", async (req, res) => {
  const { email } = req.body;
  const _user = await User.findOne({ email });
  if (!_user) return res.json({ message: "User don't Exist." });

  const accessToken = jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  res.json({
    _user,
    accessToken,
  });
});

module.exports = router;
