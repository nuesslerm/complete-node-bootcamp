const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1. MIDDLEWARE
// built-in express middleware
app.use(express.json()); // parse HTTP body

// 3rd party middleware
app.use(morgan('dev'));

// custom middleware function
app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  // never forget to use next() in middleware
  next();
});

app.use((req, res, next) => {
  // example: we have a route handler that needs to know when the request happens
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2. ROUTE HANDLERS (special middleware)
// separated handler function of the route
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const tour = tours.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  // without middleware app.use(express.json()); we couldn't use the req.body in JS format
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id'
    });
  }

  // 204 = no content
  res.status(204).json({
    status: 'success',
    data: null
  });
};

// HTTP request: GET
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);

// HTTP request: POST
// app.post('/api/v1/tours', createTour);

// HTTP request: PATCH
// app.patch('/api/v1/tours/:id', updateTour);

// HTTP request: DELETE
// app.delete('/api/v1/tour/:id', deleteTour);

// 3. ROUTES (special middleware)
// specified the actions for both routes
// route: '/api/v1/tours'
app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

// route: '/api/v1/tour/:id'
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// 4. START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${3000}...`);
});
