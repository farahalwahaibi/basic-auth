'use strict';

// App Dependencies 3rd Party
const express = require( 'express' );
const cors = require( 'cors' );
const mongoose = require( 'mongoose' );

// Access module that export
const notFoundHandler = require( './middleware/404.js' );
const errorHandler = require( './middleware/500.js' );
const router = require( './auth/router.js' );

// App Setup
const app = express();

// Global middleware
app.use( cors() );
// Process JSON input and put the data on req.body
app.use( express.json() );
// Process FORM input and put the data on req.body
app.use( express.urlencoded( { extended: true } ) );
// Access '/Signup', '/Signin' Route
app.use( router );

// Home route
app.get( '/',( req,res )=>{
  res.send( 'Hello World!!!' );
} );

// Global middleware for error handler
app.use( '*', notFoundHandler );
app.use( errorHandler );

//export server and listening
module.exports = {
  server: app,
  start: ( port ) => {
    const PORT = port || 4000;
    app.listen( PORT, () => console.log( `the server is up on ${PORT}` ) );
  },
};
