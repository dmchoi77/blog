const express = require('express');
const router = express.Router();
const mysql = require('mysql');



const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "board"
});

router.get("/api/get", (req, res) => {
    const sqlQuery = "SELECT * FROM TABLE1";
    db.query(sqlQuery, (err, result) => {
        res.send(result);
    });
});

module.exports = router;