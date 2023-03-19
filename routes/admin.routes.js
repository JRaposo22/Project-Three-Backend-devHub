const express = require("express");
const router = express.Router();
const Job = require('../models/Job.model');
const Hint = require('../models/Hint.model');

//Route that displays jobs to approve to admins
router.get('/jobs-approval', async (req, res, next) => {

    try {
        const jobs = await Job.find({approved:false});
        res.json(jobs)
    } catch (error) {
        console.log(error);
    }
});

//Route to the approve of a specific job
router.put('/jobs-approval/:id', async (req, res, next) => {

    const {id} = req.params;

    try {
        const job = await Job.findByIdAndUpdate(id,{approved:true}, {new:true})
        res.json(job)
    } catch (error) {
        console.log(error);
    }
});

//Route that displays hints to approve to admins
router.get('/hints-approval', async (req, res, next) => {

    try {
        const hints = await Hint.find({approved:false});
        res.json(hints)
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;