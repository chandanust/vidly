const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validate = require('../middleware/validate');
const { Program } = require('../models/program');
const {Branch, validateBranch} = require('../models/branch');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const filter = req.header('filter');  
  if(filter){
      const branchs = await Branch.find({filter}).sort('branchShortName');
      res.send(branchs);
    } else{
      const branchs = await Branch.find().sort('programId');
      res.send(branchs);  
    }
});

router.get('/:id', async (req, res) => {
    let objectId = mongoose.Types.ObjectId;
    if(!objectId.isValid(req.params.id)) return res.status(400).send('invalid Branch Id');
    
    const branch = await Branch.findById(req.params.id)
    if (!branch) return res.status(404).send('The branch with the given ID was not found.');
    res.send(branch);
  });

  router.post('/', [auth, validate(validateBranch)], async (req, res) =>{
    const program = await Program.findById(req.body.programId)
    if(!program) return res.status(400).send('Invalid Program Id');

    let branch = new Branch({
      program:{
        programId: program._id,
        programShortName: program.programShortName
      },
      branchCode: req.body.branchCode,
      branchShortName: req.body.branchShortName,
      branchFullName: req.body.branchFullName,
      branchCategory: req.body.branchCategory,
      branchNameInHindi: req.body.branchNameInHindi
    });
    await branch.save();
    res.send(branch);
  });


module.exports = router;