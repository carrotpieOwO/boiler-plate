const express = require("express");
const app = express();
const port = 5000;

const config = require("./config/key");

//유저모델 가져오기
const { User } = require("./models/User");

//바디파서 가져오기
const bodyParser = require("body-parser");

//바디파서 설정
//1. application/x-www-form-urlencoded 타입 가져올 수 있게 함
app.use(bodyParser.urlencoded({ extended: true }));
//2. json 타입 가져올 수 있게
app.use(bodyParser.json());

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

//post method
//라우트의 end-point를 /register 로
app.post("/register", (req, res) => {
  // 회원가입에 필요한 정보들을 클라이언트에서 가져와서 db에 넣어주기

  //1. 유저 인스턴스 생성 - req.body받아서 생성
  const user = new User(req.body);

  //save는 몽고디비에서 오는 메소드
  //콜백함수로 클라이언트에 에러있으면 뿌려주기
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
