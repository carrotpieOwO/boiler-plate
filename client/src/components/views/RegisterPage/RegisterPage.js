import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";

function RegisterPage(props) {
  const dispatch = useDispatch();

  //state 만들기 , email , password
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  //onChange함수 만들기
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Email", Email);
    console.log("Passwd", Password);

    //여기서 확인해주고 넘어가기
    if (Password !== ConfirmPassword) {
      return alert("비밀번호가 같지 않습니다.");
    }

    //서버에 보내기 axios
    let body = {
      email: Email,
      name: Name,
      password: Password,
    };

    //리덕스 - dispatch(action, )
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        //리액트에서의 페이지 이동법
        //history 는 react-router dom 을 사용하기 때문에 임포트하고
        // 익스포트할때 라우터돔으로 감싸줘야 한다.
        props.history.push("/login");
      } else {
        alert("Error");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button type="submit">join</button>
      </form>
    </div>
  );
}

//라우터돔으로 페이지 감싸주기
export default withRouter(RegisterPage);
