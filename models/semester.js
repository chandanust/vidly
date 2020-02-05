const mongoose = require('mongoose');
const Joi = require('joi');

const semesterSchema = new mongoose.Schema({
    semesterCode: {type: Number, required: true},
    semesterShortName: String,
    semesterFullName: String,
    semesterNameInHindi: String
  });
  
  const Semester = mongoose.model('Semester', semesterSchema);

  function validatesemester(semester) {
  const schema = {
    semesterCode: Joi.number().required(),
    semesterShortName: Joi.string().required(),
    semesterFullName: Joi.string(),
    semesterNameInHindi: Joi.string()
  };

  return Joi.validate(semester, schema);
}

exports.Semester = Semester;
exports.validateSemester = validatesemester;