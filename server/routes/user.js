const router = require('express').Router();
const db     = require("../utils/databaseHelper");
const bcrypt = require('bcrypt');

const connectionPool = db.init();

const httpOkCode           = 200;
const badRequestCode       = 400;
const authorizationErrCode = 401;

/**
 * Users login
 */
router.route('/login').post(async (req, res) => {
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


/**
 * Users Register
 */
router.route('/register').post(async (req, res) => {
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


module.exports = router;
