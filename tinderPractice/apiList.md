# DevTinder API's

authRouter
-POST /signup
-POST /login
-POST /logout

profileRouter
-GET /profile
-PATCH /profile/edit(here we are not edit the email and password)
-PATCH /profile/password


connectionRequestRouter
 
 # request API's
-POST  /requrest/send/status/:usrId

# status should be 
- intrested
- ignored



# review API's
-POST  /requrest/send/status/:usrId

# status 
- accepted
- rejected



userRouter
-GET /user/connection
-GET /user/recieved
-GET /user/feed - Get you the profile of other users on platfrom 


Status: ignore ,intrested,accepted,rejected
