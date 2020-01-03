// app.js is usually only used for middleware and declarations

const express = require('express');
const morgan = require('morgan');

const app = express();

// 1. ROUTER IMPORT
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 2. MIDDLEWARE (initiated with app.use())
app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3. ROUTER MOUNTS (special middleware)

// we import both routers and then mount the routers on the two routes below
app.use('/api/v1/tours', tourRouter); // sub-app tourRouter
app.use('/api/v1/users', userRouter); // sub-app userRouter

// 4. START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${3000}...`);
});
