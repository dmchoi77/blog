const express = require('express');
const router = express.Router();

const { Comment } = require("../models/Comment");

//댓글 저장
router.post("/api/comments", (req, res) => {
    const comment = new Comment(req.body);

    comment.save((err, comment) => {

        if (err) return res.json({ success: false, err })
        Comment.find({ '_id': comment._id })
            .populate("writer")
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                res.status(200).json({ success: true, result })
                console.log(result)
            })
    })
})
//댓글 조회
router.get("/api/comments", (req, res) => {
    const params = req.query.idx;
    Comment.find({ 'postId': params })
        .populate("writer")
        .exec((err, comments) => {
            if (err) return res.json({ success: false, err })
            res.status(200).json({ success: true, comments })
        })
})

//댓글 삭제
router.delete("/api/comments", (req, res) => {

    Comment.deleteMany({ $or: [{ "_id": req.body._id }, { "responseTo": req.body._id }] }
        , (err, data) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        })
});

module.exports = router;