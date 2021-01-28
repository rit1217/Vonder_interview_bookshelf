var ShelfModel = require( "./bookshelfmodel" );
var BookModel = require( "./bookmodel");

const getAllShelfs = async ( req, res ) => {
    try {
        shelfs = await ShelfModel.getAllShelf();
        return res.json( {data: shelfs});
    } catch( error ) {
        console.log( errror );
    }
};

const createShelf = async (req, res ) => {
    try{
        console.log( req.body );
        var newShelf = new ShelfModel.Shelf( req.body );
        data = await ShelfModel.createShelf( newShelf );
        return res.json({ success: true, data });
    } catch( error ){
        console.log( error );
    }
};

const getShelfById = async (req, res) => {
    try{ 
        return res.json( {data: await ShelfModel.getShelfById( req.params.id) });
    } catch (error) {
        console.log( error );
    }
};

const updateShelf = async (req, res) => {
    try {
        data = await ShelfModel.updateShelf( req.params.id, req.body);
        return res.json( { success: true, data});
    } catch (error) {
        console.log( error );
    }
};

const deleteShelf = async (req, res) => {
    try{
        const id = req.params.id;
        var deletingShelf = await ShelfModel.getShelfById( id );
        var books = await BookModel.getAllBook();
        var booknames = deletingShelf.books;
        books.forEach( (book) => {
            booknames.forEach( ( bookname) => {
                if ( book.name == bookname ) {
                    BookModel.deleteBook( book._id );
                }
            });
        });
        await ShelfModel.deleteShelf( id );
        return res.json( { success: true });
    } catch ( error ){
        console.log (error);
    }
};

module.exports = {
    getAllShelfs,
    createShelf,
    getShelfById,
    updateShelf,
    deleteShelf
};