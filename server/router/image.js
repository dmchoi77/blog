const express = require('express');
const router = express.Router();
const upload = require('../fileupload');
const multer = require('multer');

//s3에 업로드한 url을 클라이언트로 전송
router.post("/api/image", (req, res, next) => {

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return next(err);
        } else if (err) {
            return next(err);
        }
        return res.send(req.file.location);
    });
});

module.exports = router;