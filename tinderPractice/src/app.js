const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./modals/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcryptjs");

app.use(express.json());

app.post("/singup", async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);
    const {} = req;
    const { firstName, lastName, emailId, password } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    //  console.log("passwordHash",passwordHash);

    // Creating a new instance of the User model
    // const user = new User(req.body); this is not a good to pass every thing in the body
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    // console.log(user);
    await user.save();
    res.send("user added sucessfully");
  } catch (err) {
    res.status(404).json("Error :" + err.message);
  }
});

app.post("/login",async(req,res)=>{
  try {
    const {emailId,password}=req.body; 

    const user= await User.findOne({emailId:emailId})
    if(!user){
      return res.status(404).send("Invalid Credentials");
    }
    const isPasswordValid= await bcrypt.compare(password,user.password);
    if(isPasswordValid){
      res.send("Login Sucessfull")
    }else{
      throw new Error("Invalid Credentials");
    }
     
  } catch (err) {
    res.status(400).send("Error :"+ err.message)
  }
})
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  console.log(data);

  try {
    const ALLOWED_UPDATES = [
      "photoUrl",
      "age",
      "firstName",
      "lastName",
      "about",
      "skill",
      "gender",
    ];
    const isAllowed_data = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isAllowed_data) {
      throw new Error(
        "Update not allowed. Only the following fields are allowed: " +
          ALLOWED_UPDATES.join(", ")
      );
    }
    if (data.skill.length > 10) {
      throw new Error("Skill should be less than or = 10 ");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send("user not found");
    }
    res.send("user updated sucesfully : " + JSON.stringify(user));
  } catch (err) {
    res.status(400).send("Something went wrong :" + err.message);
  }
});

app.get("/user", async (req, res) => {
  const usrEmail = req.body.emailId;
  // get user by email
  try {
    console.log(userEmail);
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      return res.status.send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Some thing went wrong" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Datebase connection extablished....................");
    app.listen(3002, () => {
      console.log("Server sucessfully active on port 3002");
    });
  })
  .catch((err) => {
    console.error("Databse cannot be connected");
  });
