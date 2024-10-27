const express = require("express");
const app = express();

app.get("/admin/etAllData",(req,res)=>{
  const token ="xyz";
  const isAdminAuthorized = token === "xyz";
  if(isAdminAuthorized){
    res.send("All data sent")
  }else{
    res.status(400).send("Unauthorised Request")
  }
}) 

app.get("/admin/deleteUser",(req,res)=>
res.send("User delete sucessfully"))


app.listen(3002, () => {
  console.log("Server successfully listening on the 3002......");
});
