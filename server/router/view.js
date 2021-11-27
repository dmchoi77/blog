const express = require('express');
const { Board } = require('../models/Board');
const router = express.Router();

router.get("/api/articles/:idx", (req, res) => {
    const params = req.query.idx; //전달 받은 parameter 값

    Board.find({ index: params })
        .exec((err, data) => {
            // console.log(data)
            return res.json(data)
        })
});

//조회수 관리
router.put("/api/articles/views/:idx", (req, res) => {
    const params = req.body;

    Board.findOneAndUpdate({ "index": params.index },
        { '$inc': { view: 1 } } //조회수 1씩 증가
        , (err, data) => {
            return res.json(data)
        })
});

module.exports = router;