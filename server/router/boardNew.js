const express = require('express');
const router = express.Router();
const db = require('./db');

//게시글 작성
router.post("/api/insert", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const writer = req.body.writer;
    const today = new Date().toISOString().substr(0, 10);

    const sql = `INSERT INTO TABLE1 (title, content, date, writer) values (?,?,"${today}", ?)`;

    //제목이나 본문이 공백일 경우 client로 null 전송하며 쿼리 실행X             
    if (title === "" || content === "") {
        res.send("null!");
        return;
    }

    db.query(sql, [title, content, writer], (err, result) => {
        res.send('Success!');
    });
});

//게시글 수정
router.post("/api/modify", (req, res) => {

    const title = req.body.title;
    const content = req.body.content;
    const idx = req.body.idx;

    const sql = `UPDATE TABLE1 SET title = ?, content = ? WHERE idx = ${idx}`;

    if (title === "" || content === "") {
        res.send("null!");
        return;
    }
    db.query(sql, [title, content], (err, result) => {
        res.send('Success!');
    });

});

module.exports = router;