const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const Book = require('./models/bookModel');

const bookRouter = express.Router();
bookRouter.route('/books')
  .post((req, res) => {
      const book = new Book(req.body);

      console.log(book);
      res.json(book);
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

app.use('/api', bookRouter);


app.get('/books', (req, res) => {
  res.send({
    data: `welcome to my api`
  })
});

app.listen(PORT);