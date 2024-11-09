const mongoose = require("mongoose");
const validator = require("validator"); 
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 4,
    maxlength: 50,
    required: true,
  },
  lastName: {
    type: String,
  },

  password: {
    type: String,
    validatea(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Invalid email address : " + value)
      }
    }
  },
  age: {
    type: Number,
    min:18
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Gender data is not valid");
      }
    },
  },
  emailId: {
    type: String,
    required:true,
    unique: true,
    lowercase: true,
    trim: true,
  validate(value){
    if(!validator.isEmail(value)){
      throw new Error("Invalid email address : " + value )
    }
  }  
  
  },
  photoUrl: {
    type: String,
    default:
      "https://scontent.fblr23-1.fna.fbcdn.net/v/t39.30808-6/429522112_830341109105306_8422625909669211718_n.jpg?stp=dst-jpg_s640x640&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=tgCRAv2qEWYQ7kNvgHMPwPF&_nc_zt=23&_nc_ht=scontent.fblr23-1.fna&_nc_gid=A5lqZlaEEQ51kitFb8s7ogJ&oh=00_AYAUDU8GOWZN0AEXUQsqVhe7pMuw1ytrrj48UuV4hROiWw&oe=67299B8E",
      validate(value){
        if(!validator.isURL(value)){
          throw new Error("Invalid Photo URL : " + value)
        }
      }
  },
  about: {
    type: String,
    default: "this is a default about",
  },
  skill: {
    type: [String],
    default: ["Javascript", "node", "html", "css"],
  },
},
{
  timestamps:true
}
);
const user = mongoose.model("user", userSchema);

module.exports = user;
