const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1. MIDDLEWARE
app.use(express.json());

app.use(morgan('dev'));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware 👋');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2. ROUTE HANDLERS/CONTROLLERS (special middleware)
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

  res.status(204).json({
    status: 'success',
    data: null
  });
};

const getAllUsers = (req, res) => {
  // 500 = internal server error
  res.status(500).json({
    status: 'error',
    message: 'this route not yet defined'
  });
};

const getUser = (req, res) => {
  // 500 = internal server error
  res.status(500).json({
    status: 'error',
    message: 'this route not yet defined'
  });
};

const createUser = (req, res) => {
  // 500 = internal server error
  res.status(500).json({
    status: 'error',
    message: 'this route not yet defined'
  });
};

const updateUser = (req, res) => {
  // 500 = internal server error
  res.status(500).json({
    status: 'error',
    message: 'this route not yet defined'
  });
};

const deleteUser = (req, res) => {
  // 500 = internal server error
  res.status(500).json({
    status: 'error',
    message: 'this route not yet defined'
  });
};

// 3. ROUTES (special middleware)
// modular tour router will be used as middleware
const tourRouter = express.Router(); // created sub-application
const userRouter = express.Router();

app.use('/api/v1/tours', tourRouter); // mounting the router
// tourRouter middleware only runs on '/api/v1/tours', so we have to specify relative paths from there
app.use('/api/v1/users', userRouter);

// route: '/api/v1/tours'
tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour);

// route: '/api/v1/tour/:id'
tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// route: '/api/v1/users
userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// route: '/api/v1/users/:id
userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// 4. START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${3000}...`);
});
