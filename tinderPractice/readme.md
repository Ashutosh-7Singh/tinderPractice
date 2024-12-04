# For validating email and password

- npm i validator

# For encrypting password

- npm i bcryptjs

# For reading cookie

- npm i cookie-parser

# For JWT

- npm i jsonwebtoken

* in the production we hava to expire cookies also so we have to use {httpOnly:true} in this line -> res.cookie("token", token,{httpOnly:true});

# this will expire the cookie in 8 hour -> res.cookie("token", token,{expires:new Date(Date.now()+8\*3600000)});

# we are using express router to handle all the router




-PATCH /profle/password // Forgot password API 
# first it wll validate the given new password is strong to rnot 
# it will take old password ,then new passwod


# /request/review/:status/:requestId

- first login is the toUserId
and status is intrested 
- then the stauts changed to rejected or accepted

// Validate the status
      // Akshay ->Elon
      // loggedInId=toUserId
      // status =interested
      // request Id should be valid

 # Every line Evey code Matter
 # Code never lies

 