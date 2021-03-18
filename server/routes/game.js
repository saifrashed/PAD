const router = require('express').Router();
const db     = require("../utils/databaseHelper");

const connectionPool = db.init();

const httpOkCode           = 200;
const badRequestCode       = 400;
const authorizationErrCode = 401;


/**
 * Get all grades
 */
router.route('/grades/').get(async (req, res) => {
    db.handleQuery(connectionPool, {
        query: "SELECT * FROM grades"
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
});


/**
 * Sets rating
 */
router.route('/rating/').post(async (req, res) => {

    const {userID, gameID, rating} = req.body.body;

    console.log(req.body.body);

    await db.handleQuery(connectionPool, {
        query:  "SELECT * FROM rating WHERE userID = ? AND gameID = ?;",
        values: [userID, gameID]
    }, (data) => {

        if (data.length >= 1) {
            db.handleQuery(connectionPool, {
                query:  "UPDATE rating SET rating = ? WHERE userID = ? AND gameID = ?;",
                values: [rating, userID, gameID]
            }, (data) => {
                res.status(httpOkCode).json(data);
            }, (err) => res.status(badRequestCode).json({reason: err}));
        } else {
            db.handleQuery(connectionPool, {
                query:  "INSERT INTO rating (userID, gameID, rating) VALUES (?, ?, ?);",
                values: [userID, gameID, rating]
            }, (data) => {
                res.status(httpOkCode).json(data);
            }, (err) => res.status(badRequestCode).json({reason: err}));
        }
    });
});

/**
 * Get all games
 */
router.route('/').get(async (req, res) => {
    db.handleQuery(connectionPool, {
        query: "SELECT * FROM games;"
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
});

router.route('/:id').get(async (req, res) => {
    console.log(req.params.id)
    db.handleQuery(connectionPool, {
        query:  "SELECT * FROM games WHERE gameID = ?",
        values: [req.params.id]
    }, (data) => {
        res.status(httpOkCode).json(data[0]);
    }, (err) => res.status(badRequestCode).json({reason: err}));
});


module.exports = router;
