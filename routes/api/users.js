const express = require('express');
const router = express.Router();

// @route GET api/users
// @desc Login, Register
// @access Public
router.get('/', (req, res)=>{
    res.send('Router Api');
})

module.exports = router;