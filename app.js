const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use('/api', bookRouter);



app.listen(PORT);