const router         = require('express').Router();
const db             = require("../utils/databaseHelper");
const connectionPool = db.init();

/**
 * Test mail
 * @type {Router|router}
 */
router.route('/login').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.handleQuery(connectionPool, {
        query:  "SELECT username, password FROM user WHERE username = ? AND password = ?",
        values: [username, password]
    }, (data) => {
        if (data.length === 1) {
            //return just the username for now, never send password back!
            res.status(200).json({"username": data[0].username});
        } else {
            //wrong username
            res.status(500).json({reason: "Wrong username or password"});
        }

    }, (err) => res.status(400).json({reason: err}));
});


/**
 * Test mail
 * @type {Router|router}
 */
router.route('/upload').post((req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({reason: "No files were uploaded."});
    }

    let sampleFile = req.files.sampleFile;

    sampleFile.mv(wwwrootPath + "/uploads/test.jpg", function (err) {
        if (err) {
            return res.status(400).json({reason: err});
        }

        return res.status(200).json("OK");
    });
});


/**
 * Test mail
 * @type {Router|router}
 */
router.route('/room_example').post((req, res) => {
    db.handleQuery(connectionPool, {
            query:  "SELECT id, surface FROM room_example WHERE id = ?",
            values: [req.body.id]
        }, (data) => {
            //just give all data back as json
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );
});


module.exports = router;
