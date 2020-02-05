const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validate = require('../middleware/validate');
const validateObjId = require('../middleware/validateObjId');
const {Semester, validateSemester} = require('../models/semester');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
      const semesters = await Semester.find()
      .sort('semesterShortName');
      res.send(semesters);  
});

router.get('/:id', validateObjId, async (req, res) => {
    const semester = await Branch.findById(req.params.id)
    if (!semester) return res.status(404).send('The Semester with the given ID was not found.');

    res.send(semester);
  });

  router.post('/', [auth, validate(validateSemester)], async (req, res) =>{
    let semester = new Semester({
        semesterCode: req.body.semesterCode,
        semesterShortName: req.body.semesterShortName,
        semesterFullName: req.body.semesterFullName,
        semesterNameInHindi: req.body.semesterNameInHindi
    });
    await semester.save();
    res.send(semester);
  });

  router.delete('/:id', [auth, admin, validateObjId], async (req, res) => {
    const semester = await Semester.findByIdAndRemove(req.params.id);
    if (!semester) return res.status(404).send('The Semester with the given ID was not found.');
  
    res.send(semester);
  });

module.exports = router;