const EventEmitter = require('events');
const http = require('http');

class Sale extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sale();

myEmitter.on('newSale', () => {
  console.log('There was a new sale');
}); // observer that observes the event
myEmitter.on('newSale', () => {
  console.log('Costumer name: Jonas');
}); // observer that observes the event
myEmitter.on('newSale', stock => {
  console.log(`There are now ${stock} items left in stock.`);
}); // observer that observes the event

myEmitter.emit('newSale', 9); // object that emits the event

/////////////////////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request received');
  console.log(req.url);
  res.end('Request received');
});

server.on('request', (req, res) => {
  console.log('Another request 😁');
  res.end('Another request 😁');
});

server.on('close', () => {
  console.log('Server closed');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for requests...');
});
