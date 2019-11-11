const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require("../../models/User");

// @route GET api/auth
// @desc Login
// @access Private

router.get('/', auth, async (req, res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.log(err.message);
        res.send('Server Error');
    }
});

router.post('/',[
    check('email', 'Required valid email').isEmail(),
    check('password', 'Required a password field').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
    if(!user){
        return res.json({errors : [{msg : "Invalid credintials"}]});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.json({errors : [{msg : "Invalid credintials"}]});
    }
    const payload = {
        user : {
            id : user.id
        }
    };

    jwt.sign(
        payload, 
        config.get('jwtSecrete'),
        {expiresIn : 360000},
        (err, token)=>{
            if(err) throw err;
            res.json({token : token});
        });
    }catch(err){
        console.log(err.message);
        res.send('Server Error');
    }
});

module.exports = router;