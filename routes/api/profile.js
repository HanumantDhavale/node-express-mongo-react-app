const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route GET api/profile/me
// @desc Current user profile
// @access Private

router.get('/me', auth, async (req, res)=>{
    try{
        console.log(req.body);
        const profile = await Profile.findOne({user : req.user.id}).populate('user', ['name','avatar']);
        if(!profile){
            return res.status(400).json({msg : 'No profile for this user'});
        }
        res.json(profile);
    }
    catch(err){
        console.log(err.message);
        res.send("Server Error");    
    }
    res.send("Profile Route");
});

module.exports = router;