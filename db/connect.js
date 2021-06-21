const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('mongodb connected'))
  .catch(() => console.log('mongodb is not connected'));

module.exports = connectDB;
