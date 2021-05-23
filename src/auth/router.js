'use strict';

// App Dependencies 3rd Party
const express = require( 'express' );
const bcrypt = require( 'bcrypt' );

// Access user-model
const Users = require ( './models/users-model.js' );
const middleware = require ( './middleware/basic.js' );

// App setup
const route = express.Router();


// Route Handler For SignUp
route.post( '/signup', async ( req, res ) => {
  try {
    req.body.password = await bcrypt.hash( req.body.password, 10 );
    const user = new Users( req.body );
    const record = await user.save( req.body );
    res.status( 200 ).json( record );
  } catch ( e )
  {
    res.status( 403 ).send( 'Error Creating User' );
  }
} );


// Route Handler For SignIn
route.post( '/signin', middleware, async ( req, res ) => {
  try {
    // 1st Find the user in the database by username
    const user = await Users.findOne( { username: req.user.username } );
    // 2nd Compare the plaintext password we now have against the encrypted password in the db
    const valid = await bcrypt.compare( req.user.password, user.password );
    if ( valid ) {
      res.status( 200 ).json( user );
    }
    else {
      throw new Error( 'Invalid User' );
    }
    // 3rd Either we're valid or we throw an error
  } catch ( error )
  {
    res.status( 403 ).send( 'Invalid Login' );
  }

} );


module.exports = route;
