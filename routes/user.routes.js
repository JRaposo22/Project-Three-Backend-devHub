const router = require('express').Router();
const User = require('../models/User.model');


// profile

router.get('/profile/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const profile = await User.findById(id).populate('hints').populate('jobs');
        console.log(profile);
        res.json(profile);

    } catch (error) {
        res.json(error);
    }
   
})

// edit profile

router.put('/profile/:id', async (req, res, next) => {
    const {username, email} = req.body;

    try {
        const updatedProfile = await User.findByIdAndUpdate(
            id, {username, email, image}, { new: true });

        res.json(updatedProfile);
    } catch (error) {
        res.json(error);
    }
})

//get user by email

router.get('/user/:email', async (req, res, next) => {
    const{email} = req.params;
    try {
        const user = await User.find({email:email})
        res.json(user);
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;
