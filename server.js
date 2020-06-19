/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('Uncaught rejection! 💥');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connection successful'));

// Start server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}...and in ${env} environment `);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection! 💥');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

