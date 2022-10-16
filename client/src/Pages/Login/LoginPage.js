import "../Login/LoginPage.css";
import React, { useState } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/actions/index";
import { useNavigate } from "react-router-dom";
import loginBg from "../../Assets/Images/login.png";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();
    try {
      const data = {
        username: userName,
        password: password,
      };
      const response = await Axios.post("http://localhost:3001/login", data);
      if (response?.data?.message) {
        setLoginStatus(response?.data?.message);
        console.log(loginStatus);
      } else {
        console.log(response?.data[0]);
        dispatch(signIn(response?.data[0]));
        navigate("/home");
      }
    } catch (e) {
      return e;
    }
  };

  return (
    <div className="LoginPage">
      <div className="loginLeftContainer">
        <i className="bi bi-twitter twitterBg"></i>
        <img className="loginBg" src={loginBg} alt="loginBg" />
      </div>

      <div className="loginRightContainer">
        <i className="bi bi-twitter loginHeader"></i>
        <label className="loginLabel">Şu anda olup bitenler</label>
        <span className="loginSpan">Twitter'a bugün katıl.</span>

        <div className="form-floating userNameForm">
          <input
            type="email"
            className="form-control loginInput"
            id="floatingInput"
            placeholder="name@example.com"
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor="floatingInput" className="loginforLabel">
            Kullanıcı adı
          </label>
        </div>
        <div className="form-floating passwordForm">
          <input
            type="password"
            className="form-control loginInput"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword" className="loginforLabel">
            Şifre
          </label>
        </div>
        <div className="loginButtonContainer">
          <button className="loginBtn" onClick={Login}>
            Giriş yap
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
