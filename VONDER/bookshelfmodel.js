var mongoose = require( "mongoose" );
var Schema = mongoose.Schema;
var BookshelfSchema = Schema (
    {
        books: [{type: String }] ,
        freeSlot: { type: Number }
    },
    {
        collection: "BOOKSHELFS"
    }
);

var Shelf = mongoose.model( "Shelf", BookshelfSchema);

const createShelf = async newShelf => {
    return await newShelf.save();
};

const getShelfById = async id => {
    return await Shelf.findById( id ).lean();
};

const getAllShelf = async () => {
    return await Shelf.find()
    .lean();
};

const updateShelf = async (id, newData) => {
    return await Shelf.findByIdAndUpdate( id, newData ).lean();
}

const deleteShelf = async (id, newData) => {
    return await Shelf.findByIdAndDelete( id ).lean();
};

module.exports = {
    Shelf,
    createShelf,
    getShelfById,
    getAllShelf,
    updateShelf,
    deleteShelf
};

