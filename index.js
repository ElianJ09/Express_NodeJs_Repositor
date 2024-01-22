//Dependencies used in the proyect
const express = require('express');
const app = express();
const morgan = require('morgan');
// const bodyParser = require('body-parser'); //This dependencie was added in express 4.17+
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

//routes used in the proyect (./routes)
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');

//Middleware in the proyect (./middleware)
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index')
const corsControl = require('./middleware/cors');

/*
    Verbs in HTTP
    GET - Obtain resources
    POST - Save resources
    PATCH - Modify a little part of a resource
    PUT - Modify a complete resource 
    DELETE - delete a resource
*/

app.use(corsControl);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);

app.use("/user", user );
app.use(auth);
app.use("/pokemon", pokemon);
app.use(notFound);

app.listen(process.env.PORT || 3000, () =>{
    console.log("Server is running now!");
});