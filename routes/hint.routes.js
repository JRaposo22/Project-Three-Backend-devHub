const router = require('express').Router();
const mongoose = require('mongoose');

const Hint = require('../models/Hint.model');

// All hints

router.get('/hints', async (req, res, next) => {
  try {
    const hints = await Hint
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
