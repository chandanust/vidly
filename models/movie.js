const mongoose = require('mongoose');
const {genreSchema} = require('./genre');
const Joi = require('joi');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        default: 0
    },
    dailyRentalRates: {
        type: Number,
        required: true,
        default: 0
    }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number(),
        dailyRentalRates: Joi.number()
    };
  
    return Joi.validate(movie, schema);
  }

  exports.Movie = Movie;
  exports.validate = validateMovie;
  exports.movieSchema = movieSchema;