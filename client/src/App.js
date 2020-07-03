import React from "react";
import logo from "./logo.svg";
import "./App.css";
//리액트 라우터 돔 임포트
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// 페이지들 불러오기
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
