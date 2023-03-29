const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const router = express.Router();
const CreateBlog = require('../schema/registerSchema')
//const LoginBlog = require("../schema/loginSchema")
const cors = require('cors');
const bodyparser = require("body-parser");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const usermail;
router.use(bodyparser.json());
router.use(cors());
// const JWT_SECRET="asdfghjkl";
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      state,
      address,
      district,
      pincode
    } = req.body;

    const existingUser = await CreateBlog.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({
        status: "Failed-user",
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new CreateBlog({
      name,
      email,
      password: hashedPassword,
      phone,
      state,
      address,
      district,
      pincode
    });
    await user.save();
    res.status(200).json({
      status: "success",
      message: "User successfully registered",
      user
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: error.message
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await CreateBlog.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    let token;

    if (!process.env.JWT_SECRET) {
      console.log("JWT_SECRET not set");
      token = jwt.sign(
        { userId: user._id, email: user.email },
        'defaultSecret',
        { expiresIn: '1h' }
      );
    } else {
      token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
    }

    res.status(200).json({
      message: 'Authentication successful',
      token,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
