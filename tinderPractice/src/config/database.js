const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    // "mongodb+srv://namasteDev:bxbR19qc9HHcuCy6@namastenode.shhjx.mongodb.net/devTinder"
    "mongodb+srv://namasteDev:bxbR19qc9HHcuCy6@namastenode.shhjx.mongodb.net/practicedevTinder"
  );
};

module.exports = {
  connectDB,
};
