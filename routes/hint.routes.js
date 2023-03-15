const router = require('express').Router();
const mongoose = require('mongoose');

const Hint = require('../models/Hint.model');
const User = require('../models/User.model');
const { isAuthenticated } = require("../middleware/jwt.middleware.js");


// All hints

router.get('/hints',isAuthenticated , async (req, res, next) => {
  try {
    const hints = await Hint.find().populate('createdBy');
    const user = await User.findById(req.payload._id);

    res.json({hints, user}); 
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});


// one hint detail

router.get('/hints/:id', isAuthenticated, async (req, res, next) => {
    const { id } = req.params;
    console.log(req.payload);


    try {
        const hint = await Hint.findById(id).populate('createdBy');
        const user = await User.findById(req.payload._id);

        res.json({hint, user});
      } catch (error) {
        console.log(error);
        res.json(error);
    }
})

// create hint

router.post('/hints/', async (req, res, next) => {
    const {title, description, category} = req.body;

    try {
        const hint = await Hint.create({title, description, category});

        res.json(hint);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})



//approve hint

router.put('/hint/:id/approve', async (req, res, next) => {
  const { id } = req.params;


  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json('The provider id is not valid');
  }

  try {
    
    const updatedHint = await Hint.findByIdAndUpdate(id,{ approved: true}, {new:true});

    res.json(updatedHint);
  } catch (error) {
    res.json(error);
  }
});

// update hint

router.put('/hints/:id', async (req, res, next) => {
    const { id } = req.params;

    const {title, description, category} = req.body;

      try {
        const updatedHint = await Hint.findByIdAndUpdate(id, {title, description, category}, { new: true });

        res.json(updatedHint);
      } catch (error) {
        res.json(error);
      }
})

// delete hint

router.delete('/hints/:id', async (req, res, next) => {
    const { id } = req.params;
    
      try {
        await Hint.findByIdAndRemove(id);
    
        res.json({message: 'Job deleted successfully'})
      } catch (error) {
        res.json(error);
      }
});


module.exports = router;