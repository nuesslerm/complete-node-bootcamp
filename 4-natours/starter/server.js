// database configurations, server error handling, environment variables live in server.js file
// server.js is the entry point/starting point for the API

const dotenv = require('dotenv');
// reads config file from ./config.env
dotenv.config({ path: './config.env' });

const app = require('./app');

// console.log(process.env);

// START SERVER
// const port = process.env.PORT;
const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${3000} or ${process.env.PORT}...`);
});
