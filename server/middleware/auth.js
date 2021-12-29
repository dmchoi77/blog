const { User } = require("../models/User");

let auth = (req, res, next) => {
  //클라이언트 쿠기에서 토큰을 가져온다

  const token = req.headers["x_auth"];
  // console.log(token)
  //토큰을 복호화한 후 유저를 찾는다
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true,
      });

    req._id = user._id;
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
