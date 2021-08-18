const express = require('express');
const router = express.Router();
const db = require('./db');

const util = require('util');

 
router.post('/api/onLogin', (req, res) => {
    //console.log(`= = = > req : ${util.inspect(req)}`);
    const user_id = req.query.id;
    const user_pw = req.query.password;
    //db에 입력된 id와 동일한 id가 있는지 검사
    const sql1 = 'SELECT COUNT(*) AS result FROM user WHERE id = ?';

    db.query(sql1, user_id, (err, data) => {
        if (!err) {
            if (data[0].result < 1) { //동일한 id가 없다면
                res.send({ 'msg': '일치하는 id가 없습니다.' });
            } else {
                const sql2 = `SELECT
                                CASE (SELECT COUNT(*) FROM user WHERE id = ? AND password = ?) WHEN '0' THEN NULL
                                    ELSE (SELECT id FROM user WHERE id = ? AND password = ?)
                                END AS userId
                                , CASE (SELECT COUNT(*) FROM user WHERE id = ? AND password = ?)
                                    WHEN '0' THEN NULL
                                    ELSE (SELECT password FROM user WHERE id = ? AND password = ?)
                                END AS userPw`;
                const params = [user_id, user_pw, user_id, user_pw, user_id, user_pw, user_id, user_pw]
                db.query(sql2, params, (err, data) => {
                    if (!err) {
                        res.send(data[0]); //{ userId : , userPw : }
                    } else {
                        res.send(err);
                    }
                })
            }
        } else {
            res.send(err)
        }
    })
});

module.exports = router;