'user strict';

// App Dependencies
const mongoose = require( 'mongoose' );

// Create a mongoose model
const usersSchema = mongoose.Schema( {
  username: { type: String, required: true },
  password: { type: String, required: true },
} );
const Users = mongoose.model( 'users', usersSchema );

// Export model
module.exports = Users ;
