import React from "react";
import "./RightBar.css";
import offerList from "../../Lists/OfferList";
import topicInterestList from "../../Lists/topicInterestList";

const RightBar = () => {
  return (
    <>
      <div className="searchBar">
        <input
          type="text"
          className="bi bi-search searchInput"
          placeholder="Twitter'da Ara"
        />
        <label className="bi bi-search searchIcon"></label>
      </div>
      <div className="likeOffer">
        <label className="offerHeader">Bunları beğenebilirsin</label>
        {offerList.map((val, key) => (
          <div className="offerChoice" key={val.id}>
            <img className="offerUserPic" src={val.src} alt={"offerUserPic"} />
            <label className="offerUserName">
              {val.username}
              <p className="offerUserTag">{val.usertag}</p>
            </label>
            <button className="offerFollowButton">Takip et</button>
          </div>
        ))}
        <label className="offerMore">Daha fazla göster</label>
      </div>
      <div className="topicInterest">
        <div className="topicHeader">İlgini çekebilecek gündemler</div>
        <div className="topicChoice">
          {topicInterestList.map((val, key) => (
            <div className="topicInfo" key={val.id}>
              <span className="topicLocation">{val.location}</span>
              <span className="topicName">{val.tag}</span>
              <span className="topicTweetNumber">{val.number}</span>
            </div>
          ))}
        </div>
        <label className="topicMore">Daha fazla göster</label>
      </div>
    </>
  );
};

export default RightBar;
