const express = require("express");
const app = express();
const port = 5000;

const config = require("./config/key");

//유저모델 가져오기
const { User } = require("./models/User");

//auth 가져오기
const { auth } = require("./middleware/auth");

//바디파서 가져오기
const bodyParser = require("body-parser");

//쿠키파서 가져오기
const cookieParser = require("cookie-parser");

//바디파서 설정
//1. application/x-www-form-urlencoded 타입 가져올 수 있게 함
app.use(bodyParser.urlencoded({ extended: true }));
//2. json 타입 가져올 수 있게
app.use(bodyParser.json());

//쿠키파서 사용가능하게
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

//get method
app.get("/", (req, res) => res.send("Hello World!"));

app.get("/api/hello", (req, res) => {
  res.send("안녕하세요");
});

//post method
//라우트의 end-point를 /register 로
app.post("/api/users/register", (req, res) => {
  // 회원가입에 필요한 정보들을 클라이언트에서 가져와서 db에 넣어주기

  //1. 유저 인스턴스 생성 - req.body받아서 생성
  const user = new User(req.body);

  //
  //save는 몽고디비에서 오는 메소드
  //콜백함수로 클라이언트에 에러있으면 뿌려주기
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

//로그인 라우터
app.post("/api/users/login", (req, res) => {
  //1. DB에서 요청된 email 찾기
  // 유저모델을 가져와서 findOne(몽고디비에서 제공하는 메소드) 이용
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSucess: false,
        message: "존재하지 않는 이메일입니다.",
      });
    }
    //2. DB에서 email, password 매칭여부 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSucess: false,
          message: "비밀번호가 일치하지 않습니다.",
        });

      //3. 비밀번호 맞으면 유저를 위한 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 쿠키, 로컬스토리지 등에 저장할 수 있는데 쿠키에 저장하도록 설정
        res
          .cookie("x_auth", user.token) //x_auth는 저장될 쿠키 이름
          .status(200)
          .json({ loginSucess: true, userId: user._id });
      });
    });
  });
});

//auth 라우터
// auth middleware 추가 : 엔드포인트에서 리퀘스트를 받은 다음 콜백펑션 하기 전에 중간에 처리하는 것
app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    //원하는 정보만 선택해서 클라로 전달
    //auth에서 유저정보를 req에 담아 줬기 때문에 바로 사용 가능
    _id: req.user._id,
    // 0: 일반유저 0아니면: 관리자
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    //이렇게 정보를 주면 어떤 페이지에서든 해당 유저정보 이용 가능
  });
});

//로그아웃 라우터
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
