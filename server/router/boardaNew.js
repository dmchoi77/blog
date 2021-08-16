const express = require('express');
const router = express.Router();


router.post("/api/insert", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const today = new Date().toISOString().substr(0, 10);
    const sqlQuery = `INSERT INTO TABLE1 (title, content, date) values (?,?,"${today}")`;

    //제목이나 본문이 공백일 경우 client로 null 전송하며 쿼리 실행X             
    if (title === "" || content === "") {
        res.send("null!");
        return;
    }

    db.query(sqlQuery, [title, content], (err, result) => {
        res.send('Success!');
    });
});

module.exports = router;