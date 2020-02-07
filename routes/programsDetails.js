const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validate = require('../middleware/validate');
const validateObjId = require('../middleware/validateObjId');
const {ProgramDetails, validateProgramDetails} = require('../models/programDetails');
const { Program } = require('../models/program');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
      const programDetails = await ProgramDetails.find()
      .sort('programId');
      res.send(programDetails);  
});

// router.get('/:id', validateObjId, async (req, res) => {
//     const semester = await Branch.findById(req.params.id)
//     if (!semester) return res.status(404).send('The Semester with the given ID was not found.');

//     res.send(semester);
//   });

  router.post('/', [auth, validate(validateProgramDetails)], async (req, res) =>{

    const branches = await ProgramDetails.addBranchDetails(req.body.branchs)
    const semesters = await ProgramDetails.addSemesterDetails(req.body.semesters)
    const program = await Program.findById(req.body.programId)
    if(!program) return res.status(400).send('Invalid ProgramId')

    const programDetails = new ProgramDetails({
      programId: program._id,
      code: program.programCode,
      shortName: program.programShortName,
      branchs: branches,
      semesters: semesters
    });
    await programDetails.save();
    res.send(programDetails) 
  });

  

//   router.delete('/:id', [auth, admin, validateObjId], async (req, res) => {
//     const semester = await Semester.findByIdAndRemove(req.params.id);
//     if (!semester) return res.status(404).send('The Semester with the given ID was not found.');
  
//     res.send(semester);
//   });

module.exports = router;