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
 * Get a games material(s)
 */
router.route('/material/:id').get(async (req, res) => {
    db.handleQuery(connectionPool, {
        query:  "SELECT material.materialID, material.description FROM games INNER JOIN game_materials ON games.gameID = game_materials.gameID INNER JOIN material ON material.materialID = game_materials.materialID WHERE games.gameID = ?;",
        values: [req.params.id]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
});

/**
 * Get a games materialID
 */
router.route('/materialID/:id').get(async (req, res) => {
    db.handleQuery(connectionPool, {
        query:  "SELECT game_materials.materialID FROM games INNER JOIN game_materials ON games.gameID = game_materials.gameID INNER JOIN material ON game_materials.materialID = material.materialID WHERE games.gameID = ?",
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
router.route('/lesson/:id').get(async (req, res) => {
    db.handleQuery(connectionPool, {
        query:  "SELECT currentLesson.*, (SELECT Count(*) FROM lessons JOIN lesson_games ON lessons.lessonID = lesson_games.lessonID WHERE lessons.lessonID = currentLesson.lessonID) AS amountGames FROM lessons currentLesson WHERE currentLesson.userID = ?",
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
        query: "DELETE FROM lessons WHERE userID=? AND lessonID=? ",
        values: [userID,lessonID]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));

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
            query:  "SELECT material.materialID, material.description FROM games INNER JOIN game_materials ON games.gameID = game_materials.gameID INNER JOIN material ON material.materialID = game_materials.materialID WHERE games.gameID = ?;",
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
