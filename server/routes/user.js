const router = require('express').Router();
const db     = require("../utils/databaseHelper");
const bcrypt = require('bcrypt');

const connectionPool = db.init();

const httpOkCode           = 200;
const badRequestCode       = 400;
const authorizationErrCode = 401;


/**
 * add to favorite
 */
router.route('/favorite').post(async (req, res) => {
    const {gameID, userID} = req.body;

    db.handleQuery(connectionPool, {
        query: "INSERT INTO user_favorites (userID, gameID) VALUES (?,?) ",
        values: [userID,gameID]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));

});

/**
 * delete favorite
 */
router.route('/favorite').delete(async (req, res) => {
    const {gameID, userID} = req.body;

    db.handleQuery(connectionPool, {
        query: "DELETE FROM user_favorites WHERE userID=? AND gameID=? ",
        values: [userID,gameID]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));

});

/**
 * get rating
 */
router.route('/rating').post(async (req, res) => {
    const {gameID, userID} = req.body;

    db.handleQuery(connectionPool, {
        query: "SELECT rating FROM rating WHERE userID=? AND gameID=? ",
        values: [userID,gameID]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));

});

/**
 * Users login
 */
router.route('/login').post(async (req, res) => {
    const {username, password} = req.body;

    db.handleQuery(connectionPool, {
        query:  "SELECT userID, username, password FROM user WHERE username = ?",
        values: [username]
    }, (data) => {

        console.log(data);

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
    const {firstname, lastname, username, password} = req.body;

    console.log(username);

    // encrypt password
    const salt              = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    db.handleQuery(connectionPool, {
        query:  "SELECT userID, username, password FROM user WHERE username = ?",
        values: [username]
    }, (data) => {

        if (data.length) {
            res.status(authorizationErrCode).json({reason: "User already exists"});
        } else {
            db.handleQuery(connectionPool, {
                query:  "INSERT INTO user (firstname, lastname, username, password) VALUES (?,?,?,?)",
                values: [firstname, lastname, username, encryptedPassword]
            }, (data) => {

                db.handleQuery(connectionPool, {
                    query:  "SELECT userID, username, password FROM user WHERE userID = ?",
                    values: [data.insertId]
                }, (newUser) => {
                    res.status(httpOkCode).json({"userID": newUser[0].userID});
                });

            }, (err) => res.status(badRequestCode).json({reason: err}));
        }

    }, (err) => res.status(badRequestCode).json({reason: err}));
});


/**
 * Get single user
 */
router.route('/:id').get(async (req, res) => {
    // get user and associated favorites
    db.handleQuery(connectionPool, {
        query:  "SELECT * FROM user WHERE userID = ?",
        values: [req.params.id]
    }, (user) => {

        // get favorites associated with user
        db.handleQuery(connectionPool, {
            query:  "SELECT gameID, title, description, imageUrl, floorplanUrl, minPlayers, type, gradeID FROM user NATURAL JOIN user_favorites NATURAL JOIN games WHERE userID = ?",
            values: [req.params.id]
        }, (data) => {

            // check if user has favorites
            if (data.length) {
                user[0].favorites = data;
                res.status(httpOkCode).json(user[0]);
            } else {
                res.status(httpOkCode).json(user[0]);
            }
        }, (err) => res.status(httpOkCode).json(user[0]));

    }, (err) => res.status(badRequestCode).json({reason: err}));
});


/**
 * Get all users
 */
router.route('/').get(async (req, res) => {
    db.handleQuery(connectionPool, {
        query: "SELECT * FROM user",
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
});



module.exports = router;
