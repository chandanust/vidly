const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
 
  const userSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    email:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
      },
      password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
      },
      role: String,
      userLevel: Number
  });

  userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, role: this.role, userLevel: this.userLevel }, config.get('jwtPrivateKey'));
    return token;
  };

  const User = mongoose.model('User', userSchema);

  function validateUser(user) {
    const schema = {
      name: Joi.string().min(5).max(55).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
      role: Joi.string().required(),
      userLevel: Joi.number().required()
    };
  
    return Joi.validate(user, schema);
  }

  exports.User = User;
  exports.validate = validateUser;