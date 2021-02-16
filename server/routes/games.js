const router = require('express').Router();

// get all games
router.route('/').get((req, res) => {
    console.log("Changing");

    res.json("hallooo")
});

// add role
router.route('/add').get((req, res) => {
    console.log("Changing");

    res.json("toegevoegd")
});


module.exports = router;
