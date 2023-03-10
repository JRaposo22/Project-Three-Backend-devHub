const router = require('express').Router();
const mongoose = require('mongoose');

const Hint = require('../models/Hint.model');

// All hints

router.get('/hints', async (req, res, next) => {
  try {
    const hints = await Hint.find().populate('createdBy');

    res.json(hints);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});


// one hint detail

router.get('/hints/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const hint = await Hint.findById(id).populate('createdBy');

        res.json(hint);
    } catch (error) {
        consol.log(error);
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

// update hint

router.put('/hints/:id', async (req, res, next) => {
    const { id } = req.params;

    const {title, description, category} = req.body;

      try {
        const updatedHint = await Hint.findByIdAndUpdate(id, {title, description, category});

        res.json(updatedHint);
      } catch (error) {
        res.json(error);
      }
})

// delete hint

router.delete('/hints/:id', async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.json('The provider id is not valid');
      }
    
      try {
        await Hint.findByIdAndRemove(id);
    
        res.json({message: 'Job deleted successfully'})
      } catch (error) {
        res.json(error);
      }
});


module.exports = router;