const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/bookModel');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const bookRouter = require('./routes/bookRouter')(Book);

const port = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/bookAPI', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
