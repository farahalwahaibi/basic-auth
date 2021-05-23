'use strict';

// Require base-64
const base64 = require( 'base-64' );

// Middleware function
async function middleware( req,res,next ){
  // req.headers.authorization is : "Basic sdkjdsljd=" ,To get username and password from this :

  // 1st Turn that string into an array by splitting on ' '
  let basicHeaderParts = req.headers.authorization.split( ' ' ); // ['Basic', 'sdkjdsljd=']
  // 2nd Pop off the last value
  let encodedString = basicHeaderParts.pop(); // sdkjdsljd=
  // 3rd Decode that encoded string so it returns to user:pass
  let decodedString = base64.decode( encodedString ); // "username:password"
  // 4th Split on ':' to turn it into an array and Pull username and password from that array
  let [username, password] = decodedString.split( ':' ); // username, password
  req.user = { username, password };
  next();


}


// Export Middleware
module.exports = middleware ;
