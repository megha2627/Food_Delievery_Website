const express = require("express")
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
const router = express.Router();
const User = require("../models/User");
const jwt=require('jsonwebtoken');
const jwtSecret="MyNameIsMegha"
router.post("/createuser",
  body('email').isEmail(),
  body('name').isLength({ min: 5 }),
  body('password', 'Incorrect password').isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);

    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,  // Note: changed from Location to location for consistency
        email: req.body.email,
        password: hashedPassword
      })
      res.json({ success: true });

    }
    catch (error) {
      console.log(error);
      res.json({ success: false });

    }

  })
router.post("/loginuser", [body('email').isEmail(),

body('password', 'Incorrect password').isLength({ min: 5 })],


  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;




    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      const pwdCompare=await bcrypt.compare(req.body.password,userData.password)
      if (!pwdCompare) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      const data={
        user:{
          id:userData.id
        }
      }
      const authToken=jwt.sign(data,jwtSecret)
      return res.json({ success: true ,authToken:authToken});
      // Note: changed from Location to location for consistency


    }
    catch (error) {
      console.log(error);
      res.json({ success: false });

    }

  })
module.exports = router;

