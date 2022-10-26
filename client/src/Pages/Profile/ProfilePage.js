import React from "react";
import "./ProfilePage.css";
import Navbar from "../../Components/Navbar";
import TopProfile from "../../Components/ProfileBar/TopProfile";
import RightBar from "../../Components/RightPageBar/RightBar";

const ProfilePage = () => {
  return (
    <div className="SiteBg">
      <div className="LeftContainer">
        <Navbar />
      </div>
      <div className="MiddleContainer">
        <TopProfile />
      </div>
      <div className="RightContainer">
        <RightBar />
      </div>
    </div>
  );
};

export default ProfilePage;
