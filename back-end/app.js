const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

//MIDDLEWARES
app.use(cors());
app.use(express.json());

//IMPORT ROUTES
const postsRoute = require('./routes/posts');
const authRoutes = require('./routes/auth');

//ROUTE MIDDLEWARES
app.use('/posts', postsRoute);
app.use('/auth', authRoutes);

//ROUTES 
app.get('/', (req, res) => {
  res.send('We are on home');
});

//DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { 
    useCreateIndex: true, 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  },
  console.log('Connected to DB!')
);

//LISTEN TO THE SERVER 
app.listen(3000);