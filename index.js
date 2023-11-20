const express = require('express');
const app = express();

/*
    Verbs in HTTP
    GET
    POST
    PATCH
    PUT 
    DELETE
*/

app.get("/", (req, res, next) => {
    res.status(200);
    res.send("Welcome to this page!"); 
});

app.get("/:name", (req, res, next) => {
    console.log(req.params.name)
    res.status(200);
    res.send("Hello " + req.params.name + "!")
})

app.listen(process.env.PORT || 3000, () =>{
    console.log("Server is running now!");
});