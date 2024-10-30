const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./modals/user");

app.use(express.json());

app.post("/singup", async (req, res) => {
  // Creating a new instance of the User modal
  const user = new User(req.body);
  console.log(user);
  try {
    await user.save();
    res.send("user added sucessfully");
  } catch {
    res.status(404).send("Error saving the user :" + err.message);
  }
});

// get user by email
app.get("/getUserByEmail", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const userData = await User.find({ emailId: userEmail });
    if (userData.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(userData);
    }
  } catch {
    res.status(400).send("Some thing went wring");
  }
});

app.get("/getSingleUserByEmail", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch {
    res.status(400).send("some thing went Wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  console.log(userId);

  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    if (!user) {
      res.status(404).send("User not Found");
    } else {
      res.send(user);
    }
  } catch {
    res.status(404).send("Someting went wrong");
  }
});

app.patch("/updateUser", async (req, res) => {
  const userId = req.body.userId;
  const user = req.body;
  console.log(user);
  
  try {
    await User.findByIdAndUpdate({ _id: userId }, user);
    res.send("User updated sucessfully"+ user);
  } catch (err) {
    res.status(404).send("Some thing went wrong");
  }
});
// get alll user form the dataBase
// app.get("/feedUser",(req,ers)=>{
//   const feedUser=req.body
// })

connectDB()
  .then(() => {
    console.log("Database connection established.......");
    app.listen(3002, () => {
      console.log("Server sucessfully  active on prot 3002");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected");
  });
