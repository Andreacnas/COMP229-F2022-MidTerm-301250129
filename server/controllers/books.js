// books.js - Date: Oct 26th, 2022
// Name: Andrea Cavalcanti Nascimento - Student Number: 301250129
//Favourite Book List (Mid-Term test)

// define the book model
import books from '../models/books.js';
import booksModel from '../models/books.js';

/* GET books List page. READ */
export function displayBookList(req, res, next) {
    // find all books in the books collection
    booksModel.find((err, booksCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Book List', page: 'books/list', books: booksCollection });
    }).sort({"name":1});//Sort list by name
}

//  GET the Book Details page in order to add a new Book
export function displayAddPage(req, res, next) {

    /*****************
    * ADD CODE HERE *
    *****************/

     res.render('index', { title: 'Add Book', page: 'books/add', books: {} });
}

// POST process the Book Details page and create a new Book - CREATE
export function processAddPage(req, res, next) {

    /*****************
     * ADD CODE HERE *
     *****************/

    let newBook = booksModel({
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price
    });

    booksModel.create(newBook, (err, Books) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('./list')//after adding a book redirect to book list
    })
}

// GET the Book Details page in order to edit an existing Book
export function displayEditPage(req, res, next) {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id;

     booksModel.findById(id, (err, books) => {
         if(err){
             console.error(err);
             res.end(err);
         }
         
         res.render('index', { title: 'Edit Book', page: 'books/edit', books: books });
     });   
        
    }

// POST - process the information passed from the details form and update the document
export function processEditPage(req, res, next) {
    /*****************
    * ADD CODE HERE *
    *****************/

     let id = req.params.id;

     let newBook = booksModel({
        _id: req.body.id,
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price
    });

    //update in mongodb
    booksModel.updateOne({_id: id }, newBook, (err, Books) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('../list')//after editing a book redirect to book list
    })
}

// GET - process the delete by user id
export function processDelete(req, res, next) {
    /*****************
  * ADD CODE HERE *
  *****************/

let id = req.params.id;

booksModel.deleteOne({_id: id}, (err) => {
    if(err){
        console.error(err);
        res.end(err);
    }

    res.redirect('../list')//after removing a book redirect to book list
})
}