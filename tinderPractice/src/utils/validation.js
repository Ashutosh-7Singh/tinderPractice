const validator = require("validator");
const bcryptjs = require("bcryptjs");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Plase enter a string Password");
  }
};

const validateEditProfileData = (req) => {
  allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skill",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};

const validateResetPasswordData = async (req, user) => {
  const { oldPassword, newPassword } = req.body;

  // Check if both passwords are provided
  if (!oldPassword || !newPassword) {
    throw new Error("Both old and new passwords are required.");
  }

  // Validate new password strength
  if (!validator.isStrongPassword(newPassword)) {
    throw new Error(
      "New password must be strong. It should include at least 8 characters, 1 lowercase, 1 uppercase, 1 number, and 1 symbol."
    );
  }

  // Verify old password
  const isOldPasswordValid = await bcryptjs.compare(oldPassword, user.password);
  if (!isOldPasswordValid) {
    throw new Error("Old password is incorrect.");
  }
};
module.exports = {
  validateSignUpData,
  validateEditProfileData,
  validateResetPasswordData,
};
