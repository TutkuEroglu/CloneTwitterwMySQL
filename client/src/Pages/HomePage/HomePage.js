import "./HomePage.css";
import React from "react";
import Navbar from "../../Components/Navbar";
import SendTweet from "../../Components/SendTweet/SendTweet";
import Tweets from "../../Components/AllTweets/Tweets";
import RightBar from "../../Components/RightPageBar/RightBar";

const HomePage = () => {
  return (
    <div className="SiteBg">
      <div className="LeftContainer">
        <Navbar />
      </div>
      <div className="MiddleContainer">
        <SendTweet />
        <Tweets />
      </div>
      <div className="RightContainer">
        <RightBar />
      </div>
    </div>
  );
};

export default HomePage;
