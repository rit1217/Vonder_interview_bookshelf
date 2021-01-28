const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

var BookSchema = Schema (
    {
        name: { type: String },
        description: { type: String },
        category: { type: String },
        price: { type: Number },
        bookshelfId: {type: Schema.Types.ObjectId},
        position: { type: Number}
    },
    {
        collection: "BOOKS"
    }
);

var Book = mongoose.model( "Book", BookSchema);

const createBook = async newBook => {
    return await newBook.save();
};

const getById = async id => {
    return await Book.findById( id ).lean();
};

const getAllBook = async () => {
    return await Book.find().lean();
};

const updateBook = async (id, newData) => {
    return await Book.findByIdAndUpdate( id, newData ).lean();
}

const deleteBook = async (id, newData) => {
    return await Book.findByIdAndDelete( id ).lean();
};

module.exports = {
    Book,
    getById,
    createBook,
    getAllBook,
    updateBook,
    deleteBook
};