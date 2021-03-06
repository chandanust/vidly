const error = require('../middleware/error');
const express = require('express');
const movies = require('../routes/movies');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const returns = require('../routes/returns');
const programs = require('../routes/programs');
const branchs = require('../routes/branchs');
const semesters = require('../routes/semesters');
const programsDetails = require('../routes/programsDetails');


module.exports = function(app){
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/returns', returns);
    app.use('/api/programs', programs);
    app.use('/api/branchs', branchs);
    app.use('/api/semesters', semesters);
    app.use('/api/programDetails', programsDetails);
    app.use(error);
};