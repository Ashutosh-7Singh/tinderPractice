const express = require("express");
const app = express();

app.get(
  "/user",(req,res)=>{
    console.log("Handling the sencond route");
    res.send("second route handler");
    
  }
)
app.get(
  "/user",(req,res,next)=>{
    console.log("Handling the route user 1!!");
    res.send("first route handler");
    next()
  }
)


app.listen(3002, () => {
  console.log("Server successfully listening on the 3002......");
});
