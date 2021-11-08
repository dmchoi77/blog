const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');
const cookieParser = require('cookie-parser')

router.post("/api/signup", (req, res) => {
    //회원가입시 필요한 정보를 클라이언트에서 가져오면 
    //DB에 넣어준다.
    const user = new User(req.body)
    //정보들을 user model에 저장
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

router.post('/api/login', (req, res) => {

    //요청된 아이디를 DB에 있는지 찾는다
    User.findOne({ id: req.body.id }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "해당하는 아이디가 없습니다."
            })
        }
        //요청된 아이디가 DB에 있다면 비밀번호가 일치하는지 확인
        user.comparePassword(req.body.pwd, (err, isMatch) => {

            if (!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 일치하지 않습니다." })

            //비밀번호 일치하면 토큰을 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                //token을 쿠키에 저장한다. 
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id })
            })
        })
    })
});

router.get('/api/user/auth', auth, (req, res) => {
    //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 true
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true, //role = 1 일반 유저, 0 관리자
        isAuth: true,
        name: req.user.name,
        role: req.user.role,
    })
})

router.get('/api/user/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id },
        { token: "" }
        , (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        })
})

module.exports = router;