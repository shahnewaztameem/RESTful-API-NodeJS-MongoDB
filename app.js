const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');

const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/bookAPI', { useNewUrlParser: true, useUnifiedTopology: true });

bookRouter.route('/books').get((req, res) => {
  const query = {};
  if (req.query.genre) {
    query.genre = req.query.genre;
  }
  Book.find(query, (error, books) => {
    if (error) {
      return res.send(error);
    }
    return res.json(books);
  });
});
bookRouter.route('/books/:bookId').get((req, res) => {
  Book.findById(req.params.bookId, (error, book) => {
    if (error) {
      return res.send(error);
    }
    return res.json(book);
  });
});

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
