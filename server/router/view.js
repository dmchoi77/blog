const express = require('express');
const router = express.Router();
const db = require('./db');

router.get("/api/view", (req, res) => {
    const params = req.query.idx; //전달 받은 parameter 값
    const sqlQuery = "SELECT idx, title, content, date, writer, view FROM TABLE1 WHERE idx = ? and visible = 1";
    db.query(sqlQuery, params, (err, data) => {
        if (!err) res.send(data);
        else res.send(err);
    });
});

//조회수 관리
router.put("/api/view", (req, res) => {
    const index = req.body.index;
    const view = req.body.view + 1;
    const sql = "UPDATE TABLE1 SET view = ? WHERE idx = ?";
    db.query(sql, [view, index], (err, result) => {
        res.send('Success!');
    });
});
module.exports = router;