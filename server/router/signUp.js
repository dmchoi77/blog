// const express = require('express');
// const router = express.Router();
// const db = require('./db');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// const { User } = require('../models/User')


// router.post("/api/signup", (req, res) => {

//     // const name = req.body.name;
//     // const id = req.body.id;
//     // let password = req.body.password;
//     // const sqlQuery = `INSERT INTO USER (name, id, password) VALUES (?, ?, ?)`;

//     // bcrypt.hash(password, saltRounds, (err, hash) => {
//     //     password = hash;
//     //     db.query(sqlQuery, [name, id, password], (err, result) => {
//     //         if (err !== null) return res.send("ER_DUP_ENTRY");
//     //         res.send("complete");
//     //     })
//     // })

//     //회원가입시 필요한 정보를 클라이언트에서 가져오면 
//     //DB에 넣어준다.
//     const user = new User(req.body)
//     //정보들을 user model에 저장
//     user.save((err, userInfo) => {
//         if (err) return res.json({ success: false, err })
//         return res.status(200).json({
//             success: true
//         })
//     })
// })

// module.exports = router;