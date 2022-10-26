import React, { useEffect } from "react";
import "./getUserTweets.css";
import ProfileImage from "../../Assets/Images/user.png";
import TweetBtnLists from "../../Lists/TweetBtnLists";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  saveUserTweets,
  updateUserTweets,
} from "../../redux/actions/getUserTweetsAction";
import { formatDate } from "../../Utils/dateFormatter";
import { setNotify } from "../../redux/actions/notify";

const GetUserTweets = () => {
  const dispatch = useDispatch();
  const { USERNAME } = useSelector((state) => state?.AUTH);
  const tweets = useSelector((state) => state.USERTWEETS);

  const getUserTweet = async () => {
    try {
      const data = {
        username: USERNAME,
      };
      const res = await Axios.post(
        "http://localhost:3001/api/getUserTweets/",
        data
      );
      if (res?.data?.message === "success") {
        dispatch(saveUserTweets(res?.data?.data));
      } else {
      }
    } catch (e) {
      return e;
    }
  };

  const likeTweet = async (TEXTID) => {
    const index = tweets.findIndex((tweets) => tweets.TEXTID === TEXTID);
    if (tweets[index].ISLIKED === 0) {
      try {
        const data = {
          id: TEXTID,
          isLiked: 1,
        };
        const res = await Axios.post(
          `http://localhost:3001/api/like/${TEXTID}`,
          data
        );
        if (res?.data?.message === "success") {
          dispatch(updateUserTweets(res?.data?.data[0]));
          if (tweets[index].OWNER === USERNAME) {
            dispatch(setNotify(true));
          }
        }
      } catch (e) {
      }
    } else {
      try {
        const data = {
          id: TEXTID,
          isLiked: 0,
        };
        const res = await Axios.post(
          `http://localhost:3001/api/dislike/${TEXTID}`,
          data
        );
        if (res?.data?.message === "success") {
          dispatch(updateUserTweets(res?.data?.data[0]));
        }
      } catch (e) {
      }
    }
  };

  useEffect(() => {
    getUserTweet();
  }, []);

  return (
    <>
      {tweets?.map((val) => (
        <div className="TweetArea" key={val?.TEXTID}>
          <div className="TopArea">
            <img
              className="PictureArea"
              src={ProfileImage}
              alt={"ProfilePic"}
            />
            <div className="TextArea">
              <span className="textUsername">{val?.OWNER}</span>·
              <span className="textDate">
                {formatDate(val?.DATE, "isTodayOrTomorrow")}
              </span>
              <br />
              <span className="textText">{val?.TEXT}</span>
            </div>
          </div>

          <div className="BottomArea">
            {TweetBtnLists?.map((val) => (
              <div className="IconArea" title={val?.text} key={val?.id}>
                {val?.icon}
              </div>
            ))}
            <div
              className="IconArea"
              title={"Beğen"}
              onClick={() => {
                likeTweet(val?.TEXTID);
              }}
            >
              <i
                className={
                  val?.ISLIKED === 0
                    ? "bi bi-heart heart"
                    : "bi bi-heart-fill likedHeart"
                }
              ></i>

              <span
                className={
                  val?.ISLIKED === 0 ? "likeAmount" : "likeAmountActive"
                }
              >
                {val.LIKEAMOUNT === 0 ? "" : val.LIKEAMOUNT}
              </span>
            </div>

            <div className="IconArea" title={"Paylaş"}>
              <i className="bi bi-share share"></i>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GetUserTweets;
