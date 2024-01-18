const express = require('express');
const user = express.Router();
const db = require('../config/database');

user.post("/", async (req, res, next) => {
    const { user_name, user_mail, user_password } = req.body;

    console.log(user_name,user_mail, user_password);
    if(user_name && user_mail && user_password){
        let query = "INSERT INTO user (user_name, user_mail, user_password) ";
        query += `VALUES ('${user_name}', '${user_mail}', '${user_password}')`;

        const InsertedRow = await db.query(query);

        return (InsertedRow.affectedRows == 1) ? 
            res.status(201).json({code: 201, message: "Se agrego el usuario correctamente"}):
            res.status(500).json({code: 500, message: "Ocurrio un problema al agregar el usuario!"})
    }
    return res.status(500).json({code:500, message: "Campos imcompletos, llenalos correctamente!"})
});

user.get("/", async (req, res, next) =>{
    const query = "SELECT * FROM user"

    const selectedRows = await db.query(query);
    return res.status(200).json({code: 200, message: selectedRows});
});

module.exports = user;