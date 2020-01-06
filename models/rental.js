const mongoose = require('mongoose');
const Joi = require('joi');
const movieSchema = require('./movie');
const customerSchema = require('./customer');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: customerSchema,
        required: true
    },
    movie: {
        type: movieSchema,
        required: true
    },
    issueDate: {
        type: Date,
        default: Date.now()
    },
    returnDate: {
        type: Date,
        default: Date.now()
    }
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
    const schema = {
        movieId: Joi.string().required(),
        customerId: Joi.string().required(),
        issueDate: Joi.date(),
        returnDate: Joi.date()
    };
  
    return Joi.validate(rental, schema);
  }

  exports.Rental = Rental;
  exports.validate = validateRental;