const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

//MIDDLEWARES
app.use(cors());
app.use(express.json());

//IMPORT ROUTES
const authRoutes = require('./routes/auth');
const urlRoutes = require('./routes/url');

//ROUTE MIDDLEWARES
app.use('/auth', authRoutes);
app.use('/', urlRoutes);

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