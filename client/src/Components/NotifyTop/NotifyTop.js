import React, { useState } from "react";
import "./NotifyTop.css";
import { useSelector, useDispatch } from "react-redux";
import { setNotify } from "../../redux/actions/notify";

const NotifyTop = () => {
  const bar = useState(true);
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(setNotify(false));
  }, 2500);

  const isNotify = useSelector((state) => state?.Notify.isNotification);

  return (
    <>
      <div className="notifyHeader">
        <label className="headerLabel">Bildirimler</label>
        <i class="bi bi-gear headerIcon"></i>
      </div>
      <div className="notifyButtons">
        <div className="notifyLeftBtn">
          <span className={bar ? "notifyLeftActive" : "notifyLeft"}>Tümü</span>
        </div>
        <div className="notifyRightBtn">
          <span className="notifyRight">Bahsedenler</span>
        </div>
      </div>
      {isNotify ? (
        <div className="notifications">
          <div className="notifyDiv">
            <i class="bi bi-heart-fill fillLike"></i>
          </div>
          <label className="notifyLabel">Birisi tweetinizi beğendi!</label>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default NotifyTop;
