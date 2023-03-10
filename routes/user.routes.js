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




module.exports = router;
