import "./SendTweet.css";
import React, { useState } from "react";
import ButtonList from "../../Lists/ButtonLists";
import ProfileImage from "../../Assets/Images/user.png";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { newTweets } from "../../redux/actions/getTweetsAction";

const SendTweet = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { USERNAME } = useSelector((state) => state.AUTH);

  const tweet = async (e) => {
    e.preventDefault();
    try {
      const data = {
        username: USERNAME,
        text: text,
      };
      const response = await Axios.post(
        "http://localhost:3001/api/create",
        data
      );
      if (response?.data) {
        if (response?.data?.message === "success") {
          dispatch(newTweets(response?.data?.data[0]));
        } else {
        }
      }
    } catch (e) {
      return e;
    }
    setText("");
  };

  return (
    <>
      <div className="SendTweetContainer">
        <div className="TopTweetContainer">
          <img className="UserPicture" src={ProfileImage} alt={"Profile"} />
          <input
            placeholder="Neler oluyor?"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </div>
        <div className="BottomTweetContainer">
          <div className={"IconsWrapper"}>
            {ButtonList.map((val) => (
              <div className="TweetIcons" title={val.text} key={val.id}>
                {val.icon}
              </div>
            ))}
          </div>
          <div className="TweetSendBtn">
            <button type="button" className="btn btn-primary" onClick={tweet}>
              Tweetle
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendTweet;
