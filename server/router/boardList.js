const express = require('express');
const router = express.Router();
const db = require('./db');

router.get("/api/get", (req, res) => {
    const sqlQuery = "SELECT * FROM TABLE1";
    db.query(sqlQuery, (err, result) => {
        res.send(result);
    });
});

module.exports = router;