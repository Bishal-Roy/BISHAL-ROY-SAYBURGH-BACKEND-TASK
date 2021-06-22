const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config();

//connecting mongodb
require('./db/connect');

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/blog', blogRoutes);

app.get('/', (req, res) => {
  res.status(200).send('API is running...');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
