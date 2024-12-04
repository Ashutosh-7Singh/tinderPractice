const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },
    lastName: {
      type: String,
      trim: true,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,

      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Not a Strong password. Password must include at least 8 characters, 1 lowercase, 1 uppercase, 1 number, and 1 symbol."
          );
        }
      },
    },
    age: {
      type: Number,
      // required: true,
      trim: true,
      min: 18,
    },

    gender: {
      type: String,
      // required: true,
      trim: true,
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a valid gender type`,
      },

      // validate(value) {
      //   if (!["Male", "Female", "Others"].includes(value)) {
      //     throw new Error(
      //       "Gender data is not valid It should be'Male','Female' or 'Others'"
      //     );
      //   }
      // },
    },

    photoUrl: {
      type: String,
      default:
        "https://avatars.githubusercontent.com/u/149468363?s=400&u=80f4b7fc8f333b101d881b63b8e273d4f0d1d0fe&v=4",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo URL  " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about user",
    },
    skill: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ firstName: 1, lastName: 1 });

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "7d",
  });
  return token;
};
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcryptjs.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};
const User = new mongoose.model("User", userSchema);

module.exports = User;
