const express = require('express');
const router = express.Router();
const db = require('./db');
const upload = require('../fileupload');
const multer = require('multer');

//인덱스 조회
router.get("/api/board/index", [], (req, res) => {
    const sql = `SELECT MAX(idx) AS 'index' FROM table1`;

    db.query(sql, (err, result) => {
        res.send(result);
    })
})

//게시글 작성
router.post("/api/board/post", (req, res) => {
    const index = req.body.index;
    const title = req.body.title;
    const content = req.body.content;
    const writer = req.body.writer;
    const url = req.body.url;
    const today = new Date().toISOString().substr(0, 10);

    const sql = `INSERT INTO TABLE1 values (?,?,?,"${today}",?,?,1,1)`;

    //제목이나 본문이 공백일 경우 client로 null 전송하며 쿼리 실행X             
    if (title === "" || content === "") {
        res.send("null");
        return;
    }

    db.query(sql, [index, title, content, writer, url], (err, result) => {
        res.send('Success!');
    });
});

//게시글 수정
router.put("/api/board/modify/:index", (req, res) => {
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
router.delete("/api/board/delete/:index", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const idx = req.body.idx;

    const sql = 'UPDATE TABLE1 SET visible = 0 WHERE title = ? and content = ? and idx = ?';

    db.query(sql, [title, content, idx], (err, result) => {
        res.send('Success!');
    });
});

// //댓글 불러오기
// router.get("/api/board/:index/replies", (req, res) => {
//     const content_idx = req.query.idx;
//     const sql = 'SELECT * FROM REPLY WHERE content_idx = ?';

//     db.query(sql, content_idx, (err, result) => {
//         res.send(result);
//     });
// })

// //댓글 등록
// router.post("/api/board/:index/replies/:replyIdx", (req, res) => {
//     const content_idx = req.body.content_idx;
//     const user_name = req.body.name;
//     const content = req.body.content;
//     const reply_idx = req.body.replyIdx;

//     const sql = 'INSERT INTO REPLY (content_idx, reply_idx, user_name, content) values (?,?,?,?)';
//     db.query(sql, [content_idx, reply_idx, user_name, content], (err, result) => {
//         res.send('Success!');
//     })
// })

// //댓글 삭제
// router.delete("/api/board/:index/replies/delete/:replyIdx", (req, res) => {
//     const content_idx = req.body.content_idx;
//     const reply_Idx = req.body.replyIdx;

//     const sql = 'DELETE FROM reply WHERE content_idx = ? and reply_idx = ?';
//     db.query(sql, [content_idx, reply_Idx], (err, result) => {
//         res.send('Success!');
//     })
// })

//s3에 업로드한 url을 클라이언트로 전송
router.post("/api/image", (req, res, next) => {

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return next(err);
        } else if (err) {
            return next(err);
        }
        // const sql = 
        return res.send(req.file.location);
    });
});

module.exports = router;