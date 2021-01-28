var express = require( "express" );
var router = express.Router();

var shelfService = require( "./bookshelfservice" );

router.route( "" )
    .get( async (req, res) => {
        return await shelfService.getAllShelfs( req, res );
    })
    .post( async (req, res) => {
        return await shelfService.createShelf( req, res );
    });

router.route( "/:id")
    .get( async( req, res ) => {
        return await shelfService.getShelfById( req, res );
    })
    .put( async( req, res) => {
        return await shelfService.updateShelf( req, res );
    })
    .delete( async( req, res ) => {
        return await shelfService.deleteShelf( req, res );
    });

module.exports = router;