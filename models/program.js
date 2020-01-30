const mongoose = require('mongoose');
const Joi = require('joi');

const programSchema = new mongoose.Schema({
    programCode: {type: String, required: true},
    programShortName: String,
    programFullName: String,
    programCategory: String,
    programNameInHindi: String
  });
  
  const Program = mongoose.model('Program', programSchema);

  function validateProgram(program) {
  const schema = {
    programCode: Joi.string().min(3).required(),
    programShortName: Joi.string().min(3).required(),
    programFullName: Joi.string(),
    programCategory: Joi.string(),
    programNameInHindi: Joi.string()
  };

  return Joi.validate(program, schema);
}

module.exports.Program = Program;
module.exports.programSchema = programSchema;
module.exports.validateProgram = validateProgram;