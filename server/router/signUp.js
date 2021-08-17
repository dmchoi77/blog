const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post("/api/signup", (req, res) => {
  
    const name = req.body.name;
    const id = req.body.id;
    let password = req.body.password;
    const sqlQuery = `INSERT INTO USER (name, id, password) VALUES (?, ?, ?)`;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        password = hash;
        db.query(sqlQuery, [name, id, password], (err, result) => {
            if (err !== null) return res.send("ER_DUP_ENTRY");
            res.send("complete");
        })

    })
})

module.exports = router;