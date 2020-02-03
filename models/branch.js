const mongoose = require('mongoose');
const Joi = require('joi');

const branchSchema = new mongoose.Schema({
    program: {
        programId: String,
        programShortName: String
    },
    branchCode: String,
    branchShortName: String,
    branchFullName: String,
    branchCategory: String,
    branchNameInHindi: String
  });
  
  const Branch = mongoose.model('Branch', branchSchema);

  function validateBranch(branch) {
  const schema = {
    programId: Joi.string().required(),
    branchCode: Joi.string().min(3).required(),
    branchShortName: Joi.string().min(3).required(),
    branchFullName: Joi.string(),
    branchCategory: Joi.string(),
    branchNameInHindi: Joi.string()
  };

  return Joi.validate(branch, schema);
}

module.exports.Branch = Branch;
module.exports.branchSchema = branchSchema;
module.exports.validateBranch = validateBranch;