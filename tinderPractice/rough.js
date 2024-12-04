this is user.js->const mongoose = require("mongoose");
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
const User = mongoose.model("User", userSchema);

module.exports = User; and this is request.js->const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invlaid Status type: " + status });
      }

      // If there is an connection Request is already exist or not
      const existingConnectionRequest = await ConnectionRequest.find({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      // console.log("exitingConnectionRequest",existingConnectionRequest);
      if (existingConnectionRequest) {
        return res.status(400).json({
          messge: "Connection Requrest Already Present",
        });
      }
      const toUser = await User.findById(toUserId);
      console.log("toUser",toUser);

      if (!toUser) {
        return res.status(400).json({
          message: "User not found",
        });
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: "Connection Request Sent Successfully!",
        data,
      });
    } catch (err) {
      res.status(400).send("Error : " + err.message);
    }
  }
);

module.exports = requestRouter; see in the dartabase user is there-> like this ->{
  "_id": {
    "$oid": "674eca0952e50b396c085032"
  },
  "firstName": "Ashutosh",
  "lastName": "Singh",
  "emailId": "ashutosh@gmail.com",
  "password": "$2a$10$SykZuCxd/Tl0wqquKnfPKeRFksXqIHVgwpD/NK0PKqG/ON7hFzQEu",
  "photoUrl": "https://avatars.githubusercontent.com/u/149468363?s=400&u=80f4b7fc8f333b101d881b63b8e273d4f0d1d0fe&v=4",
  "about": "This is a default about user",
  "skill": [],
  "createdAt": {
    "$date": "2024-12-03T09:06:17.603Z"
  },
  "updatedAt": {
    "$date": "2024-12-03T09:06:17.603Z"
  },
  "__v": 0
} and i am giving like this in the postman->http://localhost:7777/request/send/interested/674ec9db52e50b396c08503sdfhs suppose is the toUserId is wrong example this->674ec9db52e50b396c08503sdfhs then the message shuld be come like this ->"User not found but i am geeting ->Error : Cast to ObjectId failed for value "674ec9db52e50b396c08503sdfhs" (type string) at path "fromUserId" for model
"connectionRequest" also i do this ->  console.log("toUser",toUser); and i am getting noting 