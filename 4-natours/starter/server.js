// database configurations, server error handling, environment variables live in server.js file
// server.js is the entry point/starting point for the API

const app = require('./app');

// START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${3000}...`);
});
