const mongoose = require('mongoose');
const Joi = require('joi');

const branchSchema = new mongoose.Schema({
    branchCode: String,
    branchShortName: String,
    branchFullName: String,
    branchCategory: String,
    branchNameInHindi: String
  });
  
  const Branch = mongoose.model('Branch', branchSchema);

  function validateBranch(branch) {
  const schema = {
    branchCode: Joi.string().min(2).required(),
    branchShortName: Joi.string().min(2).required(),
    branchFullName: Joi.string(),
    branchCategory: Joi.string(),
    branchNameInHindi: Joi.string()
  };

  return Joi.validate(branch, schema);
}

module.exports.Branch = Branch;
module.exports.branchSchema = branchSchema;
module.exports.validateBranch = validateBranch;