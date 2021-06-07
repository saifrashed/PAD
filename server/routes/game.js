const router = require('express').Router();
const db     = require("../utils/databaseHelper");

const connectionPool = db.init();

const httpOkCode           = 200;
const badRequestCode       = 400;
const authorizationErrCode = 401;

const express    = require('express');
const fileUpload = require('express-fileupload');

var Client = require('ftp');

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
 * Get a games rule(s)
 */
router.route('/rules/:id').get(async (req, res) => {
    db.handleQuery(connectionPool, {
        query:  "SELECT game_rules.description, game_rules.gameID  FROM games INNER JOIN game_rules ON games.gameID = game_rules.gameID WHERE games.gameID = ?;",
        values: [req.params.id]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
});

/**
 * Sets rating
 */
router.route('/rules/').post(async (req, res) => {
    const {gameID, description} = req.body;

    db.handleQuery(connectionPool, {
        query:  "INSERT INTO game_rules (gameID, description) VALUES (?, ?)",
        values: [gameID, description]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
});

/**
 * Sets rating
 */
router.route('/rules/').delete(async (req, res) => {
    const {gameID} = req.body;

    db.handleQuery(connectionPool, {
        query:  "DELETE FROM game_rules WHERE gameID=?",
        values: [gameID]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
});


/**
 * Get a games material(s)
 */
router.route('/material/:id').get(async (req, res) => {
    db.handleQuery(connectionPool, {
        query:  "SELECT material.materialID, material.description, game_materials.amount FROM games INNER JOIN game_materials ON games.gameID = game_materials.gameID INNER JOIN material ON material.materialID = game_materials.materialID WHERE games.gameID = ?;",
        values: [req.params.id]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
});

/**
 * Get a games materialID
 */
router.route('/material/games/:id').get(async (req, res) => {
    db.handleQuery(connectionPool, {
        query:  "SELECT * FROM games INNER JOIN game_materials ON games.gameID = game_materials.gameID INNER JOIN material ON game_materials.materialID = material.materialID WHERE game_materials.materialID = ?;",
        values: [req.params.id]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
});


/**
 * Get all materials
 */
router.route('/material/').get(async (req, res) => {
    db.handleQuery(connectionPool, {
        query: "SELECT * FROM material"
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
});

/**
 * Get all difficulties
 */
router.route('/difficulty/:id').get(async (req, res) => {
    db.handleQuery(connectionPool, {
        query:  "SELECT difficulty.description AS 'moeilijkheidsgraad', game_difficulty.description AS 'beschrijving' FROM games INNER JOIN game_difficulty ON games.gameID = game_difficulty.gameID INNER JOIN difficulty ON game_difficulty.difficultyID = difficulty.difficultyID WHERE games.gameID = ?;",
        values: [req.params.id]
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
 * Get lessons
 */
router.route('/lessons/:id').get(async (req, res) => {
    db.handleQuery(connectionPool, {
        query:  "SELECT currentLesson.*, (SELECT Count(*) FROM lessons JOIN lesson_games ON lessons.lessonID = lesson_games.lessonID WHERE lessons.lessonID = currentLesson.lessonID) AS amountGames FROM lessons currentLesson WHERE currentLesson.userID = ?",
        values: [req.params.id]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
});

/**
 * Get single lesson
 */
router.route('/lesson/:id').get(async (req, res) => {
    db.handleQuery(connectionPool, {
        query:  "SELECT * FROM lessons WHERE lessonID=?",
        values: [req.params.id]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
});

/**
 * Create lesson
 */
router.route('/lesson/').post(async (req, res) => {
    const {userID, title, description} = req.body;

    db.handleQuery(connectionPool, {
        query:  "INSERT INTO lessons (title, description, userID) VALUES (?, ?, ?)",
        values: [title, description, userID]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
});

/**
 * delete lesson
 */
router.route('/lesson/').delete(async (req, res) => {
    const {userID, lessonID} = req.body;

    db.handleQuery(connectionPool, {
        query:  "DELETE FROM lessons WHERE userID=? AND lessonID=? ",
        values: [userID, lessonID]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));

});

/**
 * Get lessons games
 */
router.route('/lesson/game/:id').get(async (req, res) => {
    db.handleQuery(connectionPool, {
        query:  "SELECT * FROM lessons INNER JOIN lesson_games ON lessons.lessonID = lesson_games.lessonID INNER JOIN games ON lesson_games.gameID = games.gameID WHERE lessons.lessonID = ?",
        values: [req.params.id]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
});

/**
 * Create lesson game
 */
router.route('/lesson/game/').post(async (req, res) => {
    const {lessonID, gameID} = req.body;

    db.handleQuery(connectionPool, {
        query:  "INSERT INTO lesson_games (lessonID, gameID) VALUES (?, ?)",
        values: [lessonID, gameID]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
});

/**
 * get Rating
 */
router.route('/rating/:id').get(async (req, res) => {
    db.handleQuery(connectionPool, {
        query:  "SELECT AVG(rating) AS 'averageRating', COUNT(*) AS 'amountRatings' FROM games INNER JOIN rating ON games.gameID = rating.gameID WHERE games.gameID = ?;",
        values: [req.params.id]
    }, (ratings) => {
        res.status(httpOkCode).json(ratings);
    }, (err) => res.status(badRequestCode).json({reason: err}));


});


router.route('/delete/:id').delete(async (req, res) => {

    db.handleQuery(connectionPool, {
        query:  "DELETE FROM games WHERE gameID=?;",
        values: [req.params.id]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));

});


router.route('/update/').post(async (req, res) => {
    const {gameID, title, description, minPlayers, type, gradeID, materials} = req.body;

    db.handleQuery(connectionPool, {
        query:  "UPDATE games SET `title` = ?, `description` = ?, `minPlayers` = ?, `type` = ?, `gradeID` = ? WHERE gameID = ?",
        values: [title, description, minPlayers, type, gradeID, gameID]
    }, (data) => {

        db.handleQuery(connectionPool, {
            query:  "DELETE FROM game_materials WHERE gameID=?;",
            values: [gameID]
        }, (data) => {

            for (var i = 0; i < materials.length; i++) {
                db.handleQuery(connectionPool, {
                    query:  "INSERT INTO game_materials (gameID, materialID, amount) VALUES (?, ?, ?);",
                    values: [gameID, materials[i], 0]
                }, (data) => {
                    console.log(data);
                });
            }

            res.status(httpOkCode).json(data);

        }, (err) => res.status(badRequestCode).json({reason: err}));

    }, (err) => res.status(badRequestCode).json({reason: err}));

});


router.route('/upload/').post(async (req, res) => {
    // let sampleFile;
    // let uploadPath;
    //
    // if (!req.files || Object.keys(req.files).length === 0) {
    //     return res.status(400).send('No files were uploaded.');
    // }
    //
    // // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    // sampleFile = req.files.sampleFile;
    // uploadPath = __dirname + '/somewhere/on/your/server/' + sampleFile.name;
    //
    // // Use the mv() method to place the file somewhere on your server
    // sampleFile.mv(uploadPath, function(err) {
    //     if (err)
    //         return res.status(500).send(err);
    //
    //     res.send('File uploaded!');
    // });
    //

    console.log(__dirname);
});

router.route('/create/').post(async (req, res) => {
    const {title, description, imageUrl, floorplanUrl, minPlayers, type, gradeID, materials} = req.body;

    db.handleQuery(connectionPool, {
        query:  "INSERT INTO games (`title`,`description`, `imageUrl`, `floorplanUrl`, `minPlayers`,`type`,`gradeID`) VALUES (?,?,?,?,?,?,?)",
        values: [title, description, imageUrl, floorplanUrl, minPlayers, type, gradeID]
    }, (data) => {

        for (var i = 0; i < materials.length; i++) {
            db.handleQuery(connectionPool, {
                query:  "INSERT INTO game_materials (gameID, materialID, amount) VALUES (?, ?, ?);",
                values: [data.insertId, materials[i], 0]
            }, (data) => {
                console.log(data);
            });
        }

        res.status(httpOkCode).json(data);

    }, (err) => res.status(badRequestCode).json({reason: err}));
});


/**
 * Get all games
 */
router.route('/').get(async (req, res) => {

    db.handleQuery(connectionPool, {
        query: "SELECT *, (SELECT AVG(rating) FROM rating WHERE rating.gameID = games.gameID) As 'averageRating' FROM games;"
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
});

/**
 * Get single game
 */
router.route('/:id').get(async (req, res) => {
    console.log(req.params.id);

    /**
     * Get games
     */
    db.handleQuery(connectionPool, {
        query:  "SELECT * FROM games WHERE gameID = ?",
        values: [req.params.id]
    }, (data) => {

        /**
         * Get materials
         */
        db.handleQuery(connectionPool, {
            query:  "SELECT material.materialID, material.description, game_materials.amount FROM games INNER JOIN game_materials ON games.gameID = game_materials.gameID INNER JOIN material ON material.materialID = game_materials.materialID WHERE games.gameID = ?;",
            values: [req.params.id]
        }, (materials) => {

            data[0].materials = materials || [];

            /**
             * Get rules
             */
            db.handleQuery(connectionPool, {
                query:  "SELECT game_rules.description FROM games INNER JOIN game_rules ON games.gameID = game_rules.gameID WHERE games.gameID = ?;",
                values: [req.params.id]
            }, (rules) => {

                data[0].rules = rules || [];

                /**
                 * get ratings
                 */
                db.handleQuery(connectionPool, {
                    query:  "SELECT AVG(rating) AS 'averageRating', COUNT(*) AS 'amountRatings' FROM games INNER JOIN rating ON games.gameID = rating.gameID WHERE games.gameID = ?;",
                    values: [req.params.id]
                }, (ratings) => {

                    data[0].ratings = ratings || [];

                    db.handleQuery(connectionPool, {
                        query:  "SELECT difficulty.description AS 'difficulty', game_difficulty.description FROM games INNER JOIN game_difficulty ON games.gameID = game_difficulty.gameID INNER JOIN difficulty ON game_difficulty.difficultyID = difficulty.difficultyID WHERE games.gameID = ?;",
                        values: [req.params.id]
                    }, (difficulties) => {

                        data[0].difficulties = difficulties || [];

                        res.status(httpOkCode).json(data[0]);
                    }, (err) => res.status(badRequestCode).json({reason: err}));
                }, (err) => res.status(badRequestCode).json({reason: err}));
            }, (err) => res.status(badRequestCode).json({reason: err}));
        }, (err) => res.status(badRequestCode).json({reason: err}));
    }, (err) => res.status(badRequestCode).json({reason: err}));
});


module.exports = router;
