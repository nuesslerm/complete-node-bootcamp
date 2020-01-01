const fs = require('fs');

setTimeout(() => console.log('Timer 1 finished'), 0);
setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile('test-file.txt', () => {
  console.log('I/O finished');
  console.log('------------');

  setTimeout(() => console.log('Timer 2 finished'), 0);
  setTimeout(() => console.log('Timer 3 finished'), 3000);
  setImmediate(() => console.log('Immediate 2 finished'));
  // setImmediate is executed first because nodeJS waits in the polling phase of the event loop until another timer expires; but setImmediate events are executed immediately during the polling wait phase

  process.nextTick(() => console.log('Process.nextTick'));
});

console.log('Hello from the top-level code');
