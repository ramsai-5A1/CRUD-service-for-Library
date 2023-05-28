const express = require('express');
const router = express.Router();

let dataBase = [];

//Creating and Inserting a new book into a Database
router.post("/addBook", (req, res) => {
    const {id, name, price} = req.body;
    let currObject = {id, name, price};
    dataBase.push(currObject);
    console.log(dataBase);
    res.status(201).json(currObject);
});

//Reading all the records from Database
router.get("/books", (req, res) => {
    if(dataBase.length == 0) {
        res.status(201).send("No Books Present within the Library");
    }
    res.json(dataBase);
});

//Updating a single record from Database based on ID
router.get("/book/:id", (req, res) => {
    let userId = req.params.id;
    let book = dataBase.find((book) => book.id === userId);
    if(!book) {
        res.status(404).json({message: "Book Not Found"});
    }
    res.status(201).json(book);
});

//Deleting the book from Database
router.delete("/book/:id", (req, res) => {
    const userId = req.params.id;
    const index = dataBase.findIndex((book) => book.id === userId);
    if(index == -1) {
        res.status(404).send("Book Not Found");
    }

    let tempDatabase = dataBase.slice(0, index);
    tempDatabase = [...tempDatabase, ...dataBase.slice(index + 1, dataBase.length)];

    dataBase = [...tempDatabase];
    res.status(201).send("Successfully Deleted");
});

module.exports = router;