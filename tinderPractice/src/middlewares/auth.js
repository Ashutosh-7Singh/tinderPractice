const adminAuth = (req,res) => {
    console.log("Admin");
    
  const token = "xyz";
  const isAdminAuthorised = token === "xyz";
  if (!isAdminAuthorised) {
    res.status(401).send("Admin unAuthorised");
  } else {
    res.send("Admin aa gya successfully");
  }
};
module.exports ={
    adminAuth
}