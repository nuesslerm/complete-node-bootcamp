const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  /*
  // Solution 1 finished
  // nodeJS will have to load the entire file into memory before sending the data; problem when the file is big and lots of requests are arriving at the server
  
  fs.readFile('test-file.txt', (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });
  */

  /*
  // Solution 2: Streams
  const readable = fs.createReadStream('test-file.txt');
  // response is a writable stream
  readable.on('data', chunk => {
    res.write(chunk);
  });
  readable.on('end', () => {
    res.end();
  });
  readable.on('error', err => {
    console.log(err);
    res.statusCode = 500;
    res.end('File not found!');
  });
  // backpressure is when the responses cannot be sent nearly as fast as the incoming requests
  */

  // Solution 3: Streams, fixing backpressure
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
  // readableSource.pipe(writableDest)
  // easiest way of consuming and writing streams
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening...');
});
