const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validate = require('../middleware/validate');
const validateObjId = require('../middleware/validateObjId');
const {Program, validateProgram} = require('../models/program');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const programs = await Program.find().sort('programCode');
    res.send(programs);
});

router.get('/:id', validateObjId, async (req, res) => {
    const program = await Program.findById(req.params.id)
    if (!program) return res.status(404).send('The program with the given ID was not found.');
    res.send(program);
  });

router.post('/', [auth, validate(validateProgram)], async (req, res) => {
  let program = new Program({
    programCode: req.body.programCode,
    programShortName: req.body.programShortName,
    programFullName: req.body.programFullName,
    programCategory: req.body.programCategory,
    programNameInHindi: req.body.programNameInHindi
 });
  program = await program.save();
  res.send(program);
});

router.delete('/:id', [auth, admin, validateObjId], async (req, res) => {
  const program = await Program.findByIdAndRemove(req.params.id);
  if (!program) return res.status(404).send('The program with the given ID was not found.');

  res.send(program);
});

// router.put('/:id', async (req, res) => {
//   const { error } = validate(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);
  
//   const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name}, {
//     new: true
//   });
  
//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
//   res.send(genre);
// });





module.exports = router;