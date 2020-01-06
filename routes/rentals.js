
const {Customer} = require('../models/customer');
const {Movie} = require('../models/movie');
const {Rental, validate} = require('../models/rental');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-issueDate');
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send(error.details[0].message);

  let rental = new Rental({ 
    customer: {
        _id: customer._id,
        name: customer.name
    },  
    movie: {
        _id: movie._id,
        title: movie.title
    }  
    });
  rental = await rental.save();
  res.send(rental);
});

// router.get('/:id', async (req, res) => {
//   const movie = await Movie.findById(req.params.id)
//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');
//   res.send(genre);
// });

module.exports = router;