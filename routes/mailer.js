const router     = require('express').Router();

/**
 * Test mail
 * @type {Router|router}
 */
router.route('/test').post((req, res) => {
    console.log("Test")
});


module.exports = router;
