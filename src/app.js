const express= require("express");

const app=express();

app.use("/test",(req,res)=>{
    res.send("test from server 3002")
})

app.use("/hello",(req,res)=>{
    res.send("this is form hello pro 3002");
})

app.listen(3002,()=>{
    console.log("Server listening on port 3002");
    
})