const express = require("express");
const router = express.Router();
const Job = require('../models/Job.model');

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
        const job = await Job.findByIdAndUpdate({approved:true})
        res.json(jobs)
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;