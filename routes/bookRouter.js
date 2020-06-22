/*  eslint-disable no-param-reassign  */

const express = require('express');
const booksController = require('../controllers/booksController');

const bookRouter = express.Router();
function routes(Book) {
  const controller = booksController(Book);
  bookRouter.route('/books')
    .post(controller.post)
    .get(controller.get);

  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (error, book) => {
      if (error) {
        return res.send(error);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  bookRouter.route('/books/:bookId')
    .get((req, res) => res.json(req.book))
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      req.book.save((error) => {
        if (error) {
          return res.send(error);
        }
        return res.json(book);
      });
    })
    .patch((req, res) => {
      const { book } = req;
      //  eslint-disable-next-line no-underscore-dangle
      if (req.body._id) {
        //  eslint-disable-next-line no-underscore-dangle
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        book[key] = value;
      });
      req.book.save((error) => {
        if (error) {
          return res.send(error);
        }
        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove((error) => {
        if (error) {
          return res.send(error);
        }
        return res.sendStatus(204);
      });
    });
  return bookRouter;
}
module.exports = routes;
