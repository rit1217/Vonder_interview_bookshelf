var express = require( "express" );
var cors = require( "cors" );
var mongoose = require( "mongoose" );
const bodyParser = require( "body-parser" );

// connect MongoDB Atlas
var mongo_uri = "mongodb+srv://rit:1234@cluster0.2eqpa.mongodb.net/VONDER-BOOKSHELF?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect( mongo_uri, { 
    auth: { authSource: "admin" },
    user: "rit",
    pass: "1234",
    useNewUrlParser: true,
     useUnifiedTopology: true}).then (
    () => {
        console.log( "[success] task 2 : connected to the database ");
    },
    error => {
        console.log( "[failed] task 2 " + error );
        process.exit();
    }
);

// create express for path
var app = express();

app.use( cors() );

// convert JSON to transfer data with MongoDB Atlas
app.use( bodyParser.urlencoded({ extended: true}));
app.use( bodyParser.json());

var port = process.env.PORT || 5000;
app.listen( port, () => {
    console.log( '[success] task 1 : listening on port ' + port );
});

// first page of api express (localhost:5000/)
app.get( '/', (req, res) => {
    res.status( 200 ).send( 'fist page of api express');
});

// path for MongoDB
var bookPath = require( "./book_router" );
app.use( "/api/book", bookPath );
var shelfPath = require( "./bookshelf_router" );
app.use( "/api/bookshelf", shelfPath );

// invalid path error
app.use( (req, res, next) => {
    var err = new Error( "Invalid path!");
    err.status = 404;
    next( err );
});