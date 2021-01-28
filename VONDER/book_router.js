var express = require( "express" );
var router = express.Router();

var bookService = require( "./bookservice" );

router.route( "" )
    .get( async (req, res) => {
        return await bookService.getAllBooks( req, res );
    })
    .post( async (req, res) => {
        return await bookService.createBook( req, res );
    });

router.route( "/:id")
    .get( async( req, res ) => {
        return await bookService.getBookById( req, res );
    })
    .put( async( req, res) => {
        return await bookService.updateBook( req, res );
    })
    .delete( async( req, res ) => {
        return await bookService.deleteBook( req, res );
    });

router.route( "/name/:name")
    .get( async( req, res ) => {
        return await bookService.getBookByName( req, res );
    });

router.route( "/category/:category")
    .get( async( req, res ) => {
        return await bookService.getBookByCategory ( req, res );
    });
module.exports = router;