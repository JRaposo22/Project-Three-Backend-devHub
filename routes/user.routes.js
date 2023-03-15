const router = require('express').Router();
const User = require('../models/User.model');
const fileUploader = require('../config/cloudinary.config');
const { isAuthenticated } = require('../middleware/jwt.middleware');


// profile

router.get('/profile', isAuthenticated, async (req, res, next) => {
    /* const { id } = req.params; */
    console.log(req.payload)

    try {
/*         const profile = await User.findById(req.payload._id).populate('hints').populate('jobs');
 */        /* console.log(profile); */
        res.json(req.payload);

    } catch (error) {
        res.json(error);
    }
   
})

// edit profile

router.put('/profile/:id', fileUploader.single('imageUrl'), async (req, res, next) => {
    const {username, email, currentImage} = req.body;
    let imageUrl

    if(req.file) imageUrl = req.file.path;
    else imageUrl = currentImage

    try {
        const updatedProfile = await User.findByIdAndUpdate(
            id, {username, email, imageUrl}, { new: true });

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
