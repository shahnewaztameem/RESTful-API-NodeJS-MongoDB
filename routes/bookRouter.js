const express = require('express');

const bookRouter = express.Router();
function routes(Book) {
  bookRouter.route('/books')
    .post((req, res) => {
      const book = new Book(req.body);
      book.save();
      return res.status(201).json(book);
    })
    .get((req, res) => {
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
  return bookRouter;
}
module.exports = routes;
