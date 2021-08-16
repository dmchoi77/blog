const express = require('express');
const router = express.Router();


router.post("/api/signup", (req, res) => {
    const name = req.body.name;
    const id = req.body.id;
    const password = req.body.password;

    const sqlQuery = `INSERT INTO USER (name, id, password) VALUES (?, ?, ?)`;

    db.query(sqlQuery, [name, id, password], (err, result) => {
        res.send('Sign up!');
    })
})

module.exports = router;