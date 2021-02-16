const router = require('express').Router();

// get all games
router.route('/').get((req, res) => {
    console.log("Changing")
});

// add role
router.route('/add').post((req, res) => {
    console.log("Changing")
});


module.exports = router;
