const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 30,
  },
  id: {
    type: String,
    unique: 1,
    maxlength: 10,
  },
  pwd: {
    type: String,
    minlength: 5,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    // 유효성 검사
    type: String,
  },
});
//save 하기 전에
userSchema.pre("save", function (next) {
  let user = this;

  if (user.isModified("pwd")) {
    //비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.pwd, salt, function (err, hash) {
        if (err) return next(err);
        user.pwd = hash; //plain password를 hash로 교체
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.pwd, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  let user = this;
  const userId = user._id.toHexString();
  //jsonwebtoken을 이용해서 token을 생성하기
  let token = jwt.sign({ _id: userId }, SECRET_KEY, { expiresIn: "10m" });
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  let user = this;

  //토큰을 decode
  jwt.verify(token, SECRET_KEY, function (err, decoded) {
    //유저 아이디를 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 token과 DB에 보관된 token이 일치하는지 확인
    user.findOne(
      {
        _id: decoded,
        token: token,
      },
      function (err, user) {
        if (err) return cb(err);
        cb(null, user);
      }
    );
  });
};
const User = mongoose.model("User", userSchema);

module.exports = { User };
