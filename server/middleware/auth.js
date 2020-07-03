const { User } = require("../models/User");

let auth = (req, res, next) => {
  //인증 처리 하는 곳
  // 1. 클라이언트 쿠키에서 토큰 가져오기
  let token = req.cookies.x_auth;

  // 2. 토큰을 복호화해서 db에서 유저찾기
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    // 해당 정보를 index에서 사용할 수 있도록 req에 넣어줌
    req.token = token;
    req.user = user;
    //미들웨어에서 게속 갈수 있게 next 함수
    // next함수 안넣어주면 미들웨어에서 갖혀있게됨
    next();
  });
  // 3. 유저가 있으면 인증 ok

  // 4. 유저가 없으면 인증 no
};

module.exports = { auth };
