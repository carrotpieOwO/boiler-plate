//몽구스 모델 가져오기
const mongoose = require("mongoose");

//몽구스 이용해서 스키마 생성
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //space 없애는 역할
    unique: 1, //유니크 설정
  },
  password: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    //유효성 검사위해 생성
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

//스키마 모델로 감싸주기
const User = mongoose.model("User", userSchema);

//이 모델을 다른 파일에서도 쓰기위해 모듈화

module.exports = { User };
