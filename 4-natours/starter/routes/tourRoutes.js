const express = require('express');
const tourController = require('../controllers/tourController');
// import with destructuring
// const {
//   getAllTours,
//   getTour,
//   createTour,
//   updateTour,
//   deleteTour
// } = require('./../contollers/tourController');

// ROUTES
const router = express.Router();

// route: '/api/v1/tours'
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

// route: '/api/v1/tour/:id'
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
