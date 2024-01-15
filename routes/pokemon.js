const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/", (req, res, next) => { 
    return res.status(200).json(req.body);
});

pokemon.get("/", async (req, res, next) => {
    const pokemon = await db.query("SELECT * FROM pokemon")
    return res.status(200).json(pokemon);
});

pokemon.get("/:id([0-9]{1,4})", async (req, res, next) =>{
    const id = req.params.id
    const pokemons = await db.query("SELECT * FROM pokemon");
    console.log(pokemons.length);
    return (id >= 0 && id <= pokemons.length) ?
        res.status(200).json(await db.query("SELECT * FROM pokemon WHERE pok_id="+id+";")) :
        res.status(404).send("No se encontro ningun pokemon con ese ID, ingresa uno de 1 a " +pokemons.length);
});

pokemon.get("/:name([A-Za-z]+)", async (req, res, next) =>{
    const name = req.params.name.toLowerCase();
    const PokemonSelected = await db.query("SELECT * FROM pokemon WHERE pok_name='"+name+"';");

    return (PokemonSelected.length > 0) ? 
        res.status(200).send(PokemonSelected) : 
        res.status(404).send('Pokemon no encontrado!'); 
});

module.exports = pokemon;