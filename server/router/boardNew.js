const express = require('express');
const router = express.Router();
const db = require('./db');

router.post("/api/insert", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const writer = req.body.writer;
    const today = new Date().toISOString().substr(0, 10);
    const sqlQuery = `INSERT INTO TABLE1 (title, content, date, writer) values (?,?,"${today}", ?)`;

    //제목이나 본문이 공백일 경우 client로 null 전송하며 쿼리 실행X             
    if (title === "" || content === "") {
        res.send("null!");
        return;
    }

    db.query(sqlQuery, [title, content, writer], (err, result) => {
        res.send('Success!');
    });
});

module.exports = router;