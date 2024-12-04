const express = require("express");
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();
const {validateEditProfileData} = require("../utils/validation");
const { validateResetPasswordData } = require("../utils/validation");
const bcryptjs = require("bcryptjs");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid data provided for profile editing.");
    }
    const loggedInUser = req.user;

    // Check if emailId or password are being updated
    // if ("emailId" in req.body || "password" in req.body) {
    //   return res.status(400).send("Email and password cannot be edited.");
    // }
    // console.log("before edit the response-", loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    // console.log("After edit the response -", loggedInUser)
    await loggedInUser.save();

    res.send(`${loggedInUser.firstName} ,Your profile updated sucessfully `);
  } catch (err) {
    console.error("Error details :",err)
    res.status(400).send({
      message:"Something went wrong while updateing the profile",
      error:err.message,

    })
  }
});

profileRouter.patch("/profile/passwordReset007", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    // Check if both oldPassword and newPassword are provided
    if (!oldPassword || !newPassword) {
      return res.status(400).send({ message: "Both old and new passwords are required." });
    }

    // Validate new password strength
    if (!validator.isStrongPassword(newPassword)) {
      return res.status(400).send({
        message: "New password must be strong. It should include at least 8 characters, 1 lowercase, 1 uppercase, 1 number, and 1 symbol.",
      });
    }

    const loggedInUser = req.user;

    // Verify old password
    const isOldPasswordValid = await bcryptjs.compare(oldPassword, loggedInUser.password);
    if (!isOldPasswordValid) {
      return res.status(401).send({ message: "Old password is incorrect." });
    }

    // Hash the new password
    const hashedNewPassword = await bcryptjs.hash(newPassword, 10);

    // Update the password
    loggedInUser.password = hashedNewPassword;
    await loggedInUser.save();

    res.send({ message: "Password reset successfully." });
  } catch (err) {
    console.error("Error during password reset:", err.message);
    res.status(500).send({
      message: "Something went wrong while resetting the password.",
      error: err.message,
    });
  }
});


profileRouter.patch("/profile/passwordReset", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // Perform validation
    await validateResetPasswordData(req, loggedInUser);

    // Hash the new password
    const hashedNewPassword = await bcryptjs.hash(req.body.newPassword, 10);

    // Update the password
    loggedInUser.password = hashedNewPassword;
    await loggedInUser.save();

    res.send({ message: "Password reset successfully." });
  } catch (err) {
    console.error("Error during password reset:", err.message);
    res.status(400).send({
      message: "Something went wrong while resetting the password.",
      error: err.message,
    });
  }
});


module.exports = profileRouter;

