import "../Tweets/SendTweet.css";
import React from "react";
import ButtonList from "../../Lists/ButtonLists";
import ProfileImage from "../../Assets/Images/user.png";

const SendTweet = () => {
  return (
    <>
      <div className="SendTweetContainer">
        <div className="TopTweetContainer">
          <img className="UserPicture" src={ProfileImage} alt={"Profile"} />
          <input placeholder="Neler oluyor?" />
        </div>
        <div className="BottomTweetContainer">
          <div className={"IconsWrapper"}>
            {ButtonList.map((val) => (
              <div className="TweetIcons" title={val.text}>
                {val.icon}
              </div>
            ))}
          </div>
          <div className="TweetSendBtn">
            <button type="button" className="btn btn-primary">
              Tweetle
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendTweet;
