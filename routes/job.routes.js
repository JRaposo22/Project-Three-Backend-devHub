const router = require('express').Router();
const mongoose = require('mongoose');
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const Job = require('../models/Job.model');
const User = require('../models/User.model');

// All jobs

router.get('/jobs', async (req, res, next) => {
  try {
    const jobs = await Job.find().populate('createdBy');

    res.json(jobs);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// One Job detail

router.get('/jobs/:id',isAuthenticated , async (req, res, next) => {
  const { id } = req.params;
  console.log(req.payload);

  try {
    const job = await Job.findById(id).populate('createdBy');
    const user = await User.findById(req.payload._id);

    res.json({job, user});
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// Create job

router.post('/jobs', async (req, res, next) => {
  const { title, company, description, image, category, createdBy } = req.body;

  try {
    const job = await Job.create({
      title,
      company,
      description,
      image,
      category,
      createdBy,
    });

    res.json(job);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//approve job

router.put('/jobs/:id/approve', async (req, res, next) => {
  const { id } = req.params;


  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json('The provider id is not valid');
  }

  try {
    
    const updatedJob = await Job.findByIdAndUpdate(id,{ approved: true}, {new:true});

    res.json(updatedJob);
  } catch (error) {
    res.json(error);
  }
});

// update Job

router.put('/jobs/:id', async (req, res, next) => {
  const { id } = req.params;

  const { title, company, description, image, category } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json('The provider id is not valid');
  }

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { title, company, description, image, category },
      { new: true }
    );

    res.json(updatedJob);
  } catch (error) {
    res.json(error);
  }
});



// delete job

router.delete('/jobs/:id', async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json('The provider id is not valid');
  }

  try {
    await Job.findByIdAndRemove(id);

    res.json({message: 'Job deleted successfully'})
  } catch (error) {
    res.json(error);
  }
});



module.exports = router;
