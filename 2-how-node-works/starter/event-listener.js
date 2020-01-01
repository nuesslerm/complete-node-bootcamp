http = require('http');

const server = http.createServer();
server.on('request', (req, res) => {
  console.log('Request received');
  res.end('Request received');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
});
