const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const inspirationsRoutes = require('./api/routes/inspirations');
const bookmarksRoutes = require('./api/routes/bookmarks');

mongoose.connect('mongodb://admin:admin@inspireu-shard-00-00-j8htx.mongodb.net:27017,inspireu-shard-00-01-j8htx.mongodb.net:27017,inspireu-shard-00-02-j8htx.mongodb.net:27017/test?ssl=true&replicaSet=inspireU-shard-0&authSource=admin');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});
app.use('/inspirations', inspirationsRoutes);
app.use('/bookmarks', bookmarksRoutes);

app.use((req, res, next)=>{
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next)=>{
  res.status(error.status || 500);
  res.json({
    error:{
      message: error.message
    }
  });
});

module.exports = app;
