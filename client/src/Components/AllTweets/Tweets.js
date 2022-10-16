import React, { useEffect } from "react";
import "../AllTweets/Tweets.css";
import ProfileImage from "../../Assets/Images/user.png";
import TweetBtnLists from "../../Lists/TweetBtnLists";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { saveTweets, UpdateTweets } from "../../redux/actions/getTweetsAction";
import { formatDate } from "../../Utils/dateFormatter";
import { setNotify } from "../../redux/actions/notify";

const Tweets = () => {
  const dispatch = useDispatch();
  const tweets = useSelector((state) => state?.TWEETS);
  const { USERNAME } = useSelector((state) => state?.AUTH);

  const getTweet = async () => {
    try {
      const res = await Axios.get("http://localhost:3001/api/getTweets/");
      dispatch(saveTweets(res?.data));
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
          console.log(res?.data?.data[0]);
          dispatch(UpdateTweets(res?.data?.data[0]));
          if (tweets[index].OWNER === USERNAME) {
            dispatch(setNotify(true));
          }
        }
      } catch (e) {
        console.log(e);
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
          dispatch(UpdateTweets(res?.data?.data[0]));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    getTweet();
  }, []);

  return (
    <>
      {tweets?.map((val) => (
        <div className="TweetContain" key={val?.TEXTID}>
          <div className="TopContain">
            <img
              className="PictureContain"
              src={ProfileImage}
              alt={"PictureContain"}
            />
            <div className="TextContain">
              <span className="textUsernameContain">{val?.OWNER}</span>·
              <span className="textDateContain">
                {formatDate(val?.DATE, "isTodayOrTomorrow")}
              </span>
              <br />
              <span className="textTextContain">{val?.TEXT}</span>
            </div>
          </div>

          <div className="BottomContain">
            {TweetBtnLists?.map((val) => (
              <div className="IconContain" title={val?.text} key={val?.id}>
                {val?.icon}
              </div>
            ))}
            <div
              className="IconContain"
              title={"Beğen"}
              onClick={() => {
                likeTweet(val?.TEXTID);
              }}
            >
              <i
                className={
                  val?.ISLIKED === 0
                    ? "bi bi-heart heartContain"
                    : "bi bi-heart-fill likedHeartContain"
                }
              ></i>

              <span
                className={
                  val?.ISLIKED === 0
                    ? "likeAmountContain"
                    : "likeAmountActiveContain"
                }
              >
                {val.LIKEAMOUNT === 0 ? "" : val.LIKEAMOUNT}
              </span>
            </div>

            <div className="IconContain" title={"Paylaş"}>
              <i className="bi bi-share shareContain"></i>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Tweets;
