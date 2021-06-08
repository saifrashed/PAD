const router = require('express').Router();
const db     = require("../utils/databaseHelper");

const connectionPool = db.init();

const httpOkCode           = 200;
const badRequestCode       = 400;
const authorizationErrCode = 401;

/**
 * Get all games
 */
router.route('/upload').post(async (req, res) => {


    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(badRequestCode).json({reason: "No files were uploaded."});
    }

    let mainImg = req.files.mainImg;
    let floorplanImg = req.files.floorplanImg;


    console.log(mainImg);
    console.log(floorplanImg);

    console.log(req.body.mainImgUrl);
    console.log(req.body.floorplanImgUrl);

    mainImg.mv(wwwrootPath + req.body.mainImgUrl, function (err) {
        if (err) {
            return res.status(badRequestCode).json({reason: err});
        }
    });

    floorplanImg.mv(wwwrootPath + req.body.floorplanImgUrl, function (err) {
        if (err) {
            return res.status(badRequestCode).json({reason: err});
        }
    });

    // return res.status(httpOkCode).json("OK");

    res.redirect("https://gym-7.hbo-ict.cloud/#landing");

});


/**
 * Statistic function providing average rating
 */
router.route('/average-rating/').get(async (req, res) => {
    db.handleQuery(connectionPool, {
        query: "SELECT AVG(rating) as 'averageRating' FROM rating",
        values: [req.params.id]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
});

/**
 * Statistic function providing amount of users
 */
router.route('/amount-users/').get(async (req, res) => {
    db.handleQuery(connectionPool, {
        query: "SELECT COUNT(*) as 'amountUsers' FROM user",
        values: [req.params.id]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
});

/**
 * Statistic function providing amount of favorites
 */
router.route('/amount-favorites/').get(async (req, res) => {
    db.handleQuery(connectionPool, {
        query: "SELECT COUNT(*) as 'amountFavorites' FROM user_favorites",
        values: [req.params.id]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => res.status(badRequestCode).json({reason: err}));
});





module.exports = router;
