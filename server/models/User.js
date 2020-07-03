//몽구스 모델 가져오기
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const saltRounds = 10; //salt 10자리로 비밀번호를 암호화한다.

const jwt = require("jsonwebtoken");

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
    maxlength: 100,
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

//유저모델에 유저정보를 저장하기 전에 함수 실행하기
userSchema.pre("save", function (next) {
  //index.js 에서 user.save했을 때의 그 넘어온 정보 담기
  var user = this;
  //비밀번호 암호화 시키기
  //1. 솔트생성
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err); //error생기면 NEXT로 가기.. NEXT-> INDEX.JS
      bcrypt.hash(user.password, salt, function (err, hash) {
        //error 안생기면 암호화하기 (클라가넣은 비밀번호, salt, 콜백함수) 넣어주기
        //hash는 암호화된 비밀번호
        // Store hash in your password DB.
        if (err) return next(err);
        user.password = hash; //에러 안나면 유저 패스워드를 해쉬된 비밀번호로 넣기
        next(); //그리고 넘겨주기
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //plainPassword / 암호화된 비밀번호 비교
  //암호화된 비밀번호는 복호화할 수 없으므로 플레인패스워드도 암호화해서 비교해야한다.
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

//토큰생성
userSchema.methods.generateToken = function (cb) {
  var user = this;
  //jsonwebtoken 이용해서 token 생성하기
  console.log("user._id", user._id);
  var token = jwt.sign(user._id.toHexString(), "secretToken");

  // user._id + 'secretToken' = token 합쳐서 토큰을 만드니까
  // -> 'secretToken' -> user._id 이걸 넣으면 유저아이디가 나옴

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

//auth에서 토큰으로 유저찾기
userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  //받은 토큰 복호화
  //user._id + secretToken 으로 token 만든거니까 token이랑 secretToken 넣어서 user._id 찾기
  jwt.verify(token, "secretToken", function (err, decoded) {
    //유저 아이디(decoded) 이용해서 유저를 찾은 다음 클라이언트에서 가져온 토큰과 db의 토큰 일치여부 확인
    //findOne은 몽고디비의 메소드
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};
//스키마 모델로 감싸주기
const User = mongoose.model("User", userSchema);

//이 모델을 다른 파일에서도 쓰기위해 모듈화

module.exports = { User };
