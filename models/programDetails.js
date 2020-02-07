const mongoose = require('mongoose');
const Joi = require('joi');
const { Branch } = require('../models/branch');
const { Semester } = require('../models/semester');
const programDetailsSchema = new mongoose.Schema({
    programId: String,
    code: String,
    shortName: String,
    branchs: [{
        _id: mongoose.Types.ObjectId,
        branchCode: String,
        branchShortName: String
    }],
    semesters: [{
        _id: mongoose.Types.ObjectId,
        semesterCode: Number,
        semesterShortName: String,
        fullMarks: Number
    }]
  });

  programDetailsSchema.statics.addBranchDetails = async function(branches) {
    let branchList = [];
    try{
        for(i = 0; i < branches.length; i++){
            let branch = await Branch.findById(branches[i]._id)
            if(!branch) console.log('Invalid Branch ID')
            branchList.push({
                _id: branch._id,
                branchCode: branch.branchCode,
                branchShortName: branch.branchShortName
            });
        }
    }catch(ex){
        console.log(ex.message)
    }
      return branchList;
  };

  programDetailsSchema.statics.addSemesterDetails = async function(semesters) {
    let semesterList = [];
    try{
        for(i = 0; i < semesters.length; i++){
            let semester = await Semester.findById(semesters[i]._id)
            if(!semester) console.log('Invalid Semester ID')
            semesterList.push({
                _id: semester._id,
                semesterCode: semester.semesterCode,
                semesterShortName: semester.semesterShortName,
                fullMarks: semesters[i].fullMarks
            });
        }
    }catch(ex){
        console.log(ex.message)
    }
      return semesterList;
  };
  
  const ProgramDetails = mongoose.model('ProgramDetails', programDetailsSchema);

  function validateProgramDetails(programDetails) {
      const branchSchema = {
          _id: Joi.string().required()
      }
      const semesterSchema ={
          _id: Joi.string().required(),
          fullMarks: Joi.number()
      }
  const schema = {
      programId: Joi.string().required(),
      branchs: Joi.array().items(branchSchema).min(1).required(),
      semesters: Joi.array().items(semesterSchema).min(1).required()
  };

  return Joi.validate(programDetails, schema);
}

exports.ProgramDetails = ProgramDetails;
exports.validateProgramDetails = validateProgramDetails;