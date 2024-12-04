const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const authRouter = express.Router();
const bcryptjs = require("bcryptjs");

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // Encrypt the password
    const passwordHash = await bcryptjs.hash(password, 10);
    console.log(passwordHash);

    // creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    console.log("user", user);

    await user.save();
    res.send("User added sucessfully");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    // Find user by email
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      // User not found
      return res.status(404).send("Invalid Credentials");
    }
    // Compare provided password with the hashed password
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // Create a JWT Token
      const token = await user.getJWT();
      // console.log(token);
      // Add the token to cookie and send response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Successful");
    } else {
      // Invalid password
      return res.status(401).send("Invalid Credentials");
    }
  } catch (err) {
    // Log the error and send a response
    console.error("Error during login:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successfull !!");
});
module.exports = authRouter;
