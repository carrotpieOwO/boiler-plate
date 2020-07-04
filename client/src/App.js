import React from "react";
import logo from "./logo.svg";
import "./App.css";
//리액트 라우터 돔 임포트
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// 페이지들 불러오기
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          //auth로 컴포넌트 감싸주기
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
