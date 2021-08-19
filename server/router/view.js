const express = require('express');
const router = express.Router();
const db = require('./db');

router.get("/api/view", (req, res) => {
    const params = req.query.idx; //전달 받은 parameter 값
    const sqlQuery = "SELECT idx, title, content, date, writer FROM TABLE1 WHERE idx = ?";
    db.query(sqlQuery, params, (err, data) => {
        if(!err) res.send(data);
        else res.send(err);
    });
});

module.exports = router;