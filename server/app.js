/**
 * Server application - contains all server config and api endpoints
 *
 * @author Pim Meijer
 */
const express      = require("express");
const bodyParser   = require("body-parser");
const morgan       = require("morgan");
const corsConfig   = require("./utils/corsConfigHelper");
const app          = express();
const fileUpload   = require("express-fileupload");

//logger lib  - 'short' is basic logging info
app.use(morgan("short"));

//parsing request bodies from json to javascript objects
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS config - Cross Origin Requests
app.use(corsConfig);

//File uploads
app.use(fileUpload());

// ------ ROUTES - add all api endpoints here ------

// routers
const generalRouter = require('./routes/general');
const userRouter    = require('./routes/user');
const gameRouter    = require('./routes/game');

// routes
app.use('/general', generalRouter);
app.use('/user', userRouter);
app.use('/game', gameRouter);

//------- END ROUTES -------

module.exports = app;

