//const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const pokemon = require('./routes/pokemon')
const morgan = require('morgan')

/*
    Verbs in HTTP
    GET - Obtain resources
    POST - Save resources
    PATCH - Modify a little part of a resource
    PUT - Modify a complete resource 
    DELETE - delete a resource
*/

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res, next) => {
    return res.status(200).send('Bienvenido a la Pokedex!'); 
});

app.use("/pokemon", pokemon);

app.listen(process.env.PORT || 3000, () =>{
    console.log("Server is running now!");
});