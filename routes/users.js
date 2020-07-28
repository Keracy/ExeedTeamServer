const router = require("express").Router();
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const { validateRegister } = require("../validate/validate");
const bcrypt = require("bcryptjs");
require("dotenv/config");

router.post("/register", async (req, res) => {
  const { username, password, phone, email } = req.body;
  const emailExist = await User.findOne({ email: email });
  if (emailExist) return res.send("email exist");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    username: username,
    password: hashedPassword,
    phone: phone,
    email: email,
  });
  try {
    if (!validateRegister(req.body).error) {
      await user.save();
      res.status(200).send(user);
    } else {
      res.send("validation error");
    }
  } catch (err) {
    res.send({ message: err });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const foundedUser = await User.findOne({ username: username });
    const passwordCompare = await bcrypt.compare(
      password,
      foundedUser.password
    );
    if (passwordCompare) {
      const token = JWT.sign(
        { _id: foundedUser._id },
        process.env.TOKEN_SECRET
      );
      const user = { ...foundedUser._doc, authToken: token };
      res.status(200).send(user);
    } else res.status(200).send("auth failed");
  } catch (err) {
    res.status(400).send("Error");
  }
});

router.post("/logged", async (req, res) => {
  const { token, id } = req.body;
  const jwtUser = JWT.verify(token, process.env.TOKEN_SECRET);
  if (jwtUser._id === id) res.send("logged");
  else res.send("");
});

module.exports = router;
