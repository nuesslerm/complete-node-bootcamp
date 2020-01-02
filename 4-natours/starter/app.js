const fs = require('fs');
const express = require('express');

const app = express();

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
      tours // ES6 convention: when key (property) and value (data variable) have the same name you only need to write it once
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${3000}...`);
});
