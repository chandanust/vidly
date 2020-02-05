const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validate = require('../middleware/validate');
const validateObjId = require('../middleware/validateObjId');
const { Program } = require('../models/program');
const {Branch, validateBranch} = require('../models/branch');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
      const branchs = await Branch.find()
      .sort('branchShortName');
      res.send(branchs);  
});

router.get('/:id', validateObjId, async (req, res) => {
    branch = await Branch.findById(req.params.id)
    if (!branch) return res.status(404).send('The branch with the given Branch ID was not found.');

    res.send(branch);
  });

  router.post('/', [auth, validate(validateBranch)], async (req, res) =>{
    let branch = new Branch({
      branchCode: req.body.branchCode,
      branchShortName: req.body.branchShortName,
      branchFullName: req.body.branchFullName,
      branchCategory: req.body.branchCategory,
      branchNameInHindi: req.body.branchNameInHindi
    });
    await branch.save();
    res.send(branch);
  });

  router.delete('/:id', [auth, admin, validateObjId], async (req, res) => {
    const branch = await Branch.findByIdAndRemove(req.params.id);
    if (!branch) return res.status(404).send('The Branch with the given ID was not found.');
  
    res.send(branch);
  });


module.exports = router;