const express      = require("express");
const bodyParser   = require("body-parser");
const morgan       = require("morgan");
const cryptoHelper = require("./utils/cryptoHelper");
const fileUpload   = require("express-fileupload");
const cors         = require('cors');
const app          = express();



app.use(cors());
app.use(express.json());
app.use(morgan("short"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(fileUpload());


// declare routers
const gamesRouter  = require('./routes/games');
const userRouter = require('./routes/user');

// include routers in application
app.use('/games', gamesRouter);
app.use('/user', userRouter);

module.exports = app;

