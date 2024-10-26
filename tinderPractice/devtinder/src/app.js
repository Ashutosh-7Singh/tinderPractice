const express= require("express");

const app=express();

app.use("/user",(req,res)=>{
    res.send("test from server 3002")
})

app.get("/user",(req,res)=>{
    res.send({firstName:"Ashutosh Singh",lastName:"Moni Singh"});
})
app.post("/user",(req,res)=>{
    res.send("User data saved sucessfully")
})

app.delete("/user",(req,res)=>{
    res.send("User deleted sucessfully ")
})
app.listen(3002,()=>{
    console.log("Server listening on port 3002");
    
})