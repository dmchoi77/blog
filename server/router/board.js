const express = require('express');
const router = express.Router();
const { Board } = require('../models/Board');
const cookieParser = require('cookie-parser')


router.get("/api/board/list", (req, res) => {
    Board.find({})
        .exec((err, data) => {
            // console.log(data)
            return res.json(data)
        })
});

//게시글 작성
router.post("/api/board/post", (req, res) => {
    const board = new Board(req.body)

    board.save((err, boardInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
});

//인덱스 조회
router.get('/api/board', (req, res) => {
    Board.find().sort({ index: -1 })
        .exec(function (err, data) {
            if (data.length > 0) return res.json(data[0].index)
            else return res.json(0)
        })
})

//게시글 수정
router.put("/api/board/:index", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const idx = req.body.index;

    Board.findOneAndUpdate({ "index": idx },
        {
            'title': title,
            'content': content
        }, (err, data) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        })
});

// //게시글 삭제
router.delete("/api/board/:index", (req, res) => {
    const idx = req.body.idx;

    Board.remove({ "index": idx }
        , (err, data) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        })
});

module.exports = router;