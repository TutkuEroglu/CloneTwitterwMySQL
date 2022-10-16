import React from "react";
import "./Notify.css";
import Navbar from "../../Components/Navbar";
import RightBar from "../../Components/RightPageBar/RightBar";
import NotifyTop from "../../Components/NotifyTop/NotifyTop";

const Notify = () => {
  return (
    <div className="SiteBg">
      <div className="LeftContainer">
        <Navbar />
      </div>
      <div className="MiddleContainer">
        <NotifyTop />
      </div>
      <div className="RightContainer">
        <RightBar />
      </div>
    </div>
  );
};

export default Notify;
