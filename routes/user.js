const express = require('express');
const jwt = require('jsonwebtoken');
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

user.post("/login", async (req, res, next) =>{
    const {user_mail, user_password} = req.body;

    if(user_mail && user_password){
        const query = `SELECT * FROM user WHERE user_mail = '${user_mail}' AND user_password = '${user_password}'`;
        const ExistRow = await db.query(query);

        if(ExistRow.length == 1){
            const token = jwt.sign({
                user_id: ExistRow[0].user_id,
                user_name: ExistRow[0].user_name
            }, "debugkey");
    
            return res.status(200).json({code: 200, message: "Autenticacion correcta!, enviando token...", token: token});
        }
        else{
            return res.status(401).json({code: 401, message: "Los datos son incorrectos!"})
        }
    }
    return res.status(500).json({code: 500, message: "Campos incompletos, llenelos correctamente!"})
});

user.get("/", async (req, res, next) =>{
    const query = "SELECT * FROM user"

    const selectedRows = await db.query(query);
    return res.status(200).json({code: 200, message: selectedRows});
});

module.exports = user;