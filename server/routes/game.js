const router = require('express').Router();
const db     = require("../utils/databaseHelper");

const connectionPool = db.init();

const httpOkCode           = 200;
const badRequestCode       = 400;
const authorizationErrCode = 401;

/**
 * Get all games
 */
router.route('/').get(async (req, res) => {
    db.handleQuery(connectionPool, {
        query: "SELECT * FROM games"
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
});


module.exports = router;
