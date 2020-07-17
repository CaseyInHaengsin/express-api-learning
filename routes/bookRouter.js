const express = require('express');


function routes(Book){
    const bookRouter = express.Router();
    bookRouter.route('/books')
  .post((req, res) => {
      const book = new Book(req.body);
      book.save();
      console.log(book);
      res.status(201).json(book);
  })

  .get((req, res) => {
    Book.find((err, books) => {
      if (err) {
        return res.end(err);
      }

      return res.json(books);
    });

  })
bookRouter.route('/books')
  .get((req, res) => {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }


    Book.find(query, (err, books) => {
      if (err) {
        return res.end(err);
      }

      return res.json(books);
    });

  })

bookRouter.route('/books/:bookId')
  .get((req, res) => {

    Book.findById(req.params.bookId, (err, books) => {
      if (err) {
        return res.end(err);
      }

      return res.json(books);
    });

  })

    return bookRouter;

}


module.exports = routes;
