const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcrypt');


router.post('/api/onLogin', (req, res) => {

    const user_id = req.query.id;
    const user_pw = req.query.password;
    //db에 입력된 id와 동일한 id가 있는지 검사
    const sql = 'SELECT * FROM user WHERE Id = ?';

    db.query(sql, user_id, (err, data) => {
        if (!err) {
            if (!data[0]) { //동일한 id가 없다면
                res.send({ 'msg': '일치하는 id가 없습니다.' });
            } else {
                const match = bcrypt.compareSync(user_pw, data[0].password);
                if (match) { //입력 비밀번호와 DB 비밀번호가 서로 같으면
                    res.send(data[0]);
                } else if (!match) { //일치하는 아이디는 있는데 비밀번호가 서로 틀리면
                    res.send({ 'msg': '비밀번호가 일치하지 않습니다.' });
                }
            }
        } else {
            res.send(err)
        }
    })
});

module.exports = router;