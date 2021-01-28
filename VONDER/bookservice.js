var BookModel = require( "./bookmodel" );
var ShelfModel = require( "./bookshelfmodel");
var mongoose = require( "mongoose");

const getAllBooks = async ( req, res ) => {
    try {
        books = await BookModel.getAllBook();
        shelfs = await ShelfModel.getAllShelf();
        if ( shelfs.length == 0 )
            console.log( "yayay" );
        return res.json( {data: books});
    } catch( error ) {
        console.log( errror );
    }
};

const createBook = async (req, res ) => {
    try{
        var { name, description, category, price } = req.body;
        var newBook = new BookModel.Book( {name, description, category, price,
        bookshelfId: mongoose.Schema.Types.ObjectId(),
        position: -1} );
        books = await BookModel.getAllBook();
        var insert = true;
        books.forEach( (book) => {
            if ( book.name == newBook.name ) {
                insert = false;
            }
        })
        if ( insert == false ) return res.json( {success: false});
        data = await BookModel.createBook( newBook );
        shelfs = await ShelfModel.getAllShelf();
        console.log( shelfs.length );
        let needNewShelf = true;
        let shelfToInsert = {};
        for ( i = 0; i < shelfs.length; i++ ) {
            if ( shelfs[i].freeSlot != -1 ) {
                shelfToInsert = shelfs[i];
                needNewShelf = false;
                break;
            }
        }
        if ( needNewShelf) {
            var newShelf = ShelfModel.Shelf( { books: [data.name, "", "", "", ""], freeSlot: 2} );
            var shelfData = await ShelfModel.createShelf( newShelf);
            BookModel.updateBook( data._id, { bookshelfId: shelfData._id } );
            BookModel.updateBook( data._id, { position: 1 } );
        } else {
            shelfToInsert.books[ shelfToInsert.freeSlot - 1 ] = data.name;
            var position = shelfToInsert.freeSlot;
            BookModel.updateBook( data._id, { bookshelfId: shelfToInsert._id } );
            BookModel.updateBook( data._id, { position: position } );
            if ( shelfToInsert.freeSlot == 5 ) shelfToInsert.freeSlot = -1;
            else {
                for ( i = 0; i < shelfToInsert.books.length; i++ ) {
                    if ( shelfToInsert.books[i] == "" ) {
                        shelfToInsert.freeSlot = i + 1;
                        break;
                    }
                }
            }
            ShelfModel.updateShelf( shelfToInsert._id, { books: shelfToInsert.books,
                freeSlot: shelfToInsert.freeSlot} );
        }
        return res.json({ success: true, inserted: data.name });
    } catch( error ){
        console.log( error );
    }
};

const getBookById = async (req, res) => {
    try{ 
        return res.json( {data: await BookModel.getById( req.params.id) });
    } catch (error) {
        console.log( error );
    }
};

const getBookByName = async ( req, res ) =>{
    try{
        books = await BookModel.getAllBook();
        var selectedBook = null
        books.forEach( (book) => {
            if ( book.name == req.params.name ) {
                selectedBook = book;
            }
        })
        if ( selectedBook == null ) {
            return res.json( { success: false });
        } else {
            return res.json( { data: selectedBook});
        }

    } catch ( error ){
        console.log( error );
    }
};

const getBookByCategory = async ( req, res ) => {
    try{
        var resultArray = [];
        books = await BookModel.getAllBook();
        books.forEach( (book) => {
            if ( book.category == req.params.category ) {
                resultArray.push ( book );
            }
        });
        return res.json( { data: resultArray });

    } catch ( error ) {
        console.log( error );
    }
};

const updateBook = async (req, res) => {
    try {
        data = await BookModel.updateBook( req.params.id, req.body);
        return res.json( { success: true, data});
    } catch (error) {
        console.log( error );
    }
};

const deleteBook = async (req, res) => {
    try{
        const id = req.params.id;
        var deletingBook = await BookModel.getById( id );
        var shelf = await ShelfModel.getShelfById( deletingBook.bookshelfId );
        console.log( shelf );
        shelf.books.splice( deletingBook.position - 1, 1, "");
        if ( deletingBook.position < shelf.freeSlot)
            shelf.freeSlot = deletingBook.position;
        ShelfModel.updateShelf( shelf._id, { books: shelf.books, freeSlot: shelf.freeSlot});
        await BookModel.deleteBook( id );
        return res.json( { success: true });
    } catch ( error ){
        console.log (error);
    }
};

module.exports = {
    getAllBooks,
    getBookByName,
    getBookByCategory,
    createBook,
    getBookById,
    updateBook,
    deleteBook
};