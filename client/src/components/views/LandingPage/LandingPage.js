import React, { useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

function LandingPage(props) {
  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response.data));
  }, []);

  //복잡한게 아니기 때문에 리덕스 사용하지않고 axios 로 바로 보내기
  const onClickHandler = () => {
    axios.get(`api/users/logout`).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("failed to logout");
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
      <h2>시작 페이지</h2>

      <button onClick={onClickHandler}>LogOut</button>
    </div>
  );
}

export default withRouter(LandingPage);
