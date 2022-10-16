import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Login/LoginPage";
import HomePage from "../Pages/HomePage/HomePage";
import ProfilePage from "../Pages/Profile/ProfilePage";
import { useSelector } from "react-redux";
import Notify from "../Pages/Notify/Notify";

const Routing = () => {
  const { isLoggedIn, USERNAME } = useSelector((state) => state.AUTH);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (isLoggedIn === false) {
      setIsAuthorized(false);
    } else if (isLoggedIn === true) {
      setIsAuthorized(true);
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      {isAuthorized ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path={"/home"} exact element={<HomePage />} />
          <Route path={`/${USERNAME}`} exact element={<ProfilePage />} />
          <Route path={"/notifications"} exact element={<Notify />} />
        </Routes>
      ) : (
        <Routes>
          <Route path={"/"} exact element={<LoginPage />} />
          <Route path="*" element={<p>Path not resolved</p>} />
          <Route path={"/login"} exact element={<LoginPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default Routing;
