const express = require("express");
  const {connectDB}= require("./config/database")
const app = express();
const User = require("./modals/user")

app.post("/singup",async (req,res)=>{
  // Creating a new instance of the User modal
  const user=new User ({
    firstName:"Ashutosh",
    lastName:"Suigh",
    age:"88",
    email:"ashukmr@gmail.com",
    password:"ashu@1234",

  });
  try{
    await user.save();
    res.send("user added sucessfully")
  }catch{
    res.status(404).send("Error saving the user :"+err.message);
  }
 
});
 

connectDB()
.then(()=>{
    console.log("Database connection established.......");
    app.listen(3002, () => {
      console.log("Server sucessfully  active on prot 3002");
    });
}).catch((err)=>{
    console.error("Database cannot be connected");
    
})

