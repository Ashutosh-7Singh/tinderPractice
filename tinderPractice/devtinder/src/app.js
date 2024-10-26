const express = require("express");
const app = express();

app.use("/user", 
    (req, res,next) => {
  console.log("Hmadeling the route handler");
//   res.send("first route handler")
next()
},
(req,res)=>{
    console.log("handeling the second route handler");
    res.send("2nd route handler")
    
},
(req,res)=>{
  console.log("handeling the second route handler");
  res.send("2nd route handler")
  
},
(req,res)=>{
  console.log("handeling the second route handler");
  res.send("2nd route handler")
  
});

app.listen(3002, () => {
  console.log("Server successfully listening on the 3002......");
});
