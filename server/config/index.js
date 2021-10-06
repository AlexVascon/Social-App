// We reuse this import in order to have access to the `body` property in requests
const express = require("express");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path')

// ℹ️ Responsible for the messages you see in the terminal as requests are coming in
// https://www.npmjs.com/package/morgan
const logger = require("morgan");

// ℹ️ Needed when we deal with cookies (we will when dealing with authentication)
// https://www.npmjs.com/package/cookie-parser
const cookieParser = require("cookie-parser");

const cors = require("cors"); // <== IMPORT

// Middleware configuration
module.exports = (app) => {
  // Because this is a server that will accept requests from outside and it will be hosted ona server with a `proxy`, express needs to know that it should trust that setting.
  // Services like heroku use something called a proxy and you need to add this to your server
  
  app.set("trust proxy", 1);

  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000"],
    })
  );


  // In development environment the app logs
  app.use(logger("dev"));

  // To have access to `body` property in the request
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(
    session({
      secret: 'whatever',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000
      },
      store: MongoStore.create({
        mongoUrl: `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
      })
    })
  );

  if(process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
  }
};