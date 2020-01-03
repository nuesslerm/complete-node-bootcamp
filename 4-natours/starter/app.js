const fs = require('fs');
const express = require('express');

const app = express();

// middleware stands between request and response; alters the request object to eg. include data from body
app.use(express.json());

// http method: get request
// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   // 200 is the default port
//   res.send('You can post to this endpoint...');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// HTTP request: GET
// resource: tours
app.get('/api/v1/tours', (req, res) => {
  // this callback function is referred to as the route handler

  res.status(200).json({
    // uses JSend res formatting specifications
    status: 'success',
    results: tours.length, // also send this when you are responding with an array
    data: {
      // name of resource and endpoint is tours; data argument is contained in tours variable, ie. tours: tours

      // ES6 convention: when key (property) and value (data variable) have the same name you only need to write it once

      tours
    }
  });
});

/*
// responding to URL parameters
optional parameters
app.get('/api/v1/tours/:id/:x?/:y?', (req, res) => {
  console.log(req.params);
  res.status(200).json({
    status: 'success'
  });
});
*/

// responding to URL parameters
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const tour = tours.find(el => el.id === id);

  // if (id > tours.length) {
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
});

// HTTP request: POST
// resource: tours
app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  // we always need to send something (even just a placeholder) to finish the request/response cycle

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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${3000}...`);
});
