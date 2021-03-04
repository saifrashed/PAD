/**
 * Server application - contains all server config and api endpoints
 *
 * @author Pim Meijer
 */
const express      = require("express");
const bodyParser   = require("body-parser");
const morgan       = require("morgan");
const db           = require("./utils/databaseHelper");
const cryptoHelper = require("./utils/cryptoHelper");
const corsConfig   = require("./utils/corsConfigHelper");
const app          = express();
const fileUpload   = require("express-fileupload");
const bcrypt       = require('bcrypt');

//logger lib  - 'short' is basic logging info
app.use(morgan("short"));

//init mysql connectionpool
const connectionPool = db.init();

//parsing request bodies from json to javascript objects
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS config - Cross Origin Requests
app.use(corsConfig);

//File uploads
app.use(fileUpload());

// ------ ROUTES - add all api endpoints here ------
const httpOkCode           = 200;
const badRequestCode       = 400;
const authorizationErrCode = 401;


app.post("/user/login", async (req, res) => {
    const {email, password} = req.body;

    db.handleQuery(connectionPool, {
        query:  "SELECT userID, email, password FROM user WHERE email = ?",
        values: [email]
    }, (data) => {

        const correctPassword = bcrypt.compare(password, data[0].password); // updated

        if (data.length === 1 && correctPassword) {
            //return just the username for now, never send password back!
            res.status(httpOkCode).json({"userID": data[0].userID});
        } else {
            //wrong username
            res.status(authorizationErrCode).json({reason: "Wrong username or password"});
        }

    }, (err) => res.status(badRequestCode).json({reason: err}));
});

app.post("/user/register", async (req, res) => {
    const {firstname, lastname, email, password} = req.body;

    // encrypt password
    const salt              = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    db.handleQuery(connectionPool, {
        query:  "SELECT userID, email, password FROM user WHERE email = ?",
        values: [email]
    }, (data) => {

        if (data.length) {
            res.status(authorizationErrCode).json({reason: "User already exists"});
        } else {
            db.handleQuery(connectionPool, {
                query:  "INSERT INTO user (firstname, lastname, email, password) VALUES (?,?,?,?)",
                values: [firstname, lastname, email, encryptedPassword]
            }, (data) => {

            }, (err) => res.status(badRequestCode).json({reason: err}));
        }

    }, (err) => res.status(badRequestCode).json({reason: err}));
});


app.post("/upload", function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(badRequestCode).json({reason: "No files were uploaded."});
    }

    let sampleFile = req.files.sampleFile;

    sampleFile.mv(wwwrootPath + "/uploads/test.jpg", function (err) {
        if (err) {
            return res.status(badRequestCode).json({reason: err});
        }

        return res.status(httpOkCode).json("OK");
    });
});
//------- END ROUTES -------

module.exports = app;

