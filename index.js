'use strict';

// Read Environment
require( 'dotenv' ).config();

// Access mongoose
const mongoose = require( 'mongoose' );

// Access server.js file
const server = require( './src/server.js' );

// Start listening and connect to mongoose
// MONGOOSE_URI = mongodb://localhost:27017/people
mongoose
  .connect( process.env.MONGOOSE_URI,
    { useNewUrlParser: true, useUnifiedTopology: true } )
  .then( () => {
    server.start( process.env.PORT );
  } )
  .catch( ( e ) => {
    console.log( 'CONNECTION_ERROR', e.mssage );
  } );
