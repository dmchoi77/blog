const express = require('express');
const router = express.Router();
const db = require('./db');

//게시글 작성
router.post("/api/insert", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const writer = req.body.writer;
    const today = new Date().toISOString().substr(0, 10);

    const sql = `INSERT INTO TABLE1 (title, content, date, writer,view) values (?,?,"${today}", ? , 1)`;

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

//게시글 삭제
router.post("/api/delete", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const idx = req.body.idx;

    const sql = 'DELETE FROM table1 WHERE title = ? and content = ? and idx = ?';

    db.query(sql, [title, content, idx], (err, result) => {
        res.send('Success!');
    });
});


//댓글 불러오기
router.get("/api/reply", (req, res) => {
    const content_idx = req.query.idx;
    const sql = 'SELECT * FROM REPLY WHERE content_idx = ?';

    db.query(sql, content_idx, (err, result) => {
        res.send(result);
    });
})

//댓글 등록
router.post("/api/reply/insert", (req, res) => {
    const content_idx = req.body.content_idx;
    const user_name = req.body.name;
    const content = req.body.content;
    const reply_idx = req.body.replyIdx;

    const sql = 'INSERT INTO REPLY (content_idx, reply_idx, user_name, content) values (?,?,?,?)';
    db.query(sql, [content_idx, reply_idx, user_name, content], (err, result) => {
        res.send('Success!');
    })
})

//댓글 삭제
router.post("/api/reply/delete", (req,res)=>{
    const content_idx = req.body.content_idx;
    const reply_Idx = req.body.replyIdx;

    const sql = 'DELETE FROM reply WHERE content_idx = ? and reply_idx = ?';
    db.query(sql,[content_idx,reply_Idx],(err,result)=>{
        res.send('Success!');
    })
})

module.exports = router;