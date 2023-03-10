const express = require("express");
const router = express.Router();
const Job = require('../models/Job.model');
const Hint = require('../models/Hint.model');

router.get('/jobs-approval', async (req, res, next) => {

    try {
        const jobs = await Job.find({approved:false});
        res.json(jobs)
    } catch (error) {
        console.log(error);
    }
});

router.put('/jobs-approval/:id', async (req, res, next) => {

    const {id} = req.params;

    try {
        const job = await Job.findByIdAndUpdate(id,{approved:true}, {new:true})
        res.json(job)
    } catch (error) {
        console.log(error);
    }
});

router.get('/hints-approval', async (req, res, next) => {

    try {
        const hints = await Hint.find({approved:false});
        res.json(hints)
    } catch (error) {
        console.log(error);
    }
});

router.put('/hints-approval/:id', async (req, res, next) => {

    const {id} = req.params;

    try {
        const hint = await Hint.findByIdAndUpdate(id,{approved:true}, {new:true})
        res.json(hint)
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;