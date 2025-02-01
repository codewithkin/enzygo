### Methodology
Traditionally, most applications used passwords + emails as their main authentication methods. 

This was great at the time but with the advancement of technology, auth providers and developers are recommending we switch to more secure and easy to use options such as email sign ins. 

Users do not have to remember a password or worry about it getting leaked.

### Why Email sign in ?
Since the project, Anzygo is not meant to get too complicated, i decided to choose an auth method that is both simple and powerful...hence why I chose email sign in.

### How it works
Inside of the server folder I created a User model. This user model describes what the user object will look like as well as what fields and methods they will have 

## Verification token
When the user first signs up, we take their email and username, validate them (that is....making sure they aren't already taken) and then create a new user

The verification token servers to authenticate the user on every request.

When a user is first created, we take their email and them encrypt it into a random string using jsonwebtoken and the "sign" function.

## How does it do that ?
After a user is successfully created, we sent a "cookie" with the "verification-key" token there. This is the random string generated before. The cookie is stored on the frontend and sent with every request 

On each request, we verify the verification token, that is, we use jsonwebtoken's "verify" function compare it with the one in the database and if they match...the user can continue their request otherwise...they get a 401 Error: "Invalid token"

### Session token
The session token is special because it is an encrypted string that contains the user's email, username and other information.

The reason I did this is so that we can get the user's info and display it to them on the frontend.

So the frontend received the session token (string), decrypts it and displays the information (for example: their username) to them. This is the purpose of the session token.