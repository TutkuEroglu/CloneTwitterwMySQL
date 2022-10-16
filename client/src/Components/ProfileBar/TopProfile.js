import React, { useState } from "react";
import "./TopProfile.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileButtons from "../../Lists/ProfileButtons";
import profilPic from "../../Assets/Images/user.png";
import GetUserTweets from "../getUserTweets/getUserTweets";
import Modal from "./Modal";

const TopProfile = () => {
  const [openModal, setOpenModal] = useState(false);
  const visibility = useState(true);

  const { USERNAME, NAME, INFORMATION, LOCATION, WEBSITE, BIRTHDAY } =
    useSelector((state) => state.AUTH);
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/home");
  };

  return (
    <div className="TopProfileContainer">
      <div className="profileHeader">
        <div className="BackButton" onClick={goBack}>
          <i className="bi bi-arrow-left-short backIcon"></i>
        </div>
        <div>
          <span className="usernameLabel">{NAME === "" ? USERNAME : NAME}</span>
          <span className="tweetSpan">1 Tweet</span>
        </div>
      </div>
      <div className="profile">
        <div className="backgroundImage"></div>

        <div className="profileTitle">
          <div className="profileImage">
            <img className="img" src={profilPic} alt="/" />
          </div>
          <div className="editProfile">
            <span
              className="editProfileBtn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => setOpenModal(true)}
            >
              Profili Düzenle
            </span>
          </div>
        </div>

        <div className="profileBiography">
          <span className="profileName">{NAME === "" ? USERNAME : NAME}</span>
          <span className="profileNick">@{USERNAME}</span>
          <span className="profileDesc">
            {INFORMATION === "" ? "" : INFORMATION}
          </span>
          <span className="profileJoin">
            {LOCATION === "" ? (
              ""
            ) : (
              <>
                <i className="bi bi-geo-alt location"></i>
                <span className="profileLocation">{LOCATION}</span>
              </>
            )}
            {WEBSITE === "" ? (
              ""
            ) : (
              <>
                <i className="bi bi-link-45deg webSiteLink"></i>
                <a className="profileLink" href={`${WEBSITE}`}>
                  {WEBSITE}
                </a>
              </>
            )}
            {BIRTHDAY === "" ? (
              ""
            ) : (
              <>
                <i className="bi bi-balloon balloon"></i>{" "}
                <span className="profileBirthDay">
                  Doğum tarihi: {BIRTHDAY}
                </span>
              </>
            )}
            <i className="bi bi-calendar3 calendar"></i>{" "}
            <span className="profileJoinDay">
              Ağustos 2011 tarihinde katıldı
            </span>
          </span>
        </div>

        <label className="ProfileFollow">
          <i className="Follow">246</i> Takip edilen
        </label>
        <label className="ProfileFollowers">
          <i className="Followers">150</i> Takipçi
        </label>

        <div className="profileCategory">
          <Modal open={openModal} onClose={() => setOpenModal(false)} />
          <div className="profileCategoryBtns">
            <span
              className={
                visibility ? "profileCategoryTextActive" : "profileCategoryText"
              }
            >
              Tweetler
            </span>
          </div>
          {ProfileButtons.map((val) => (
            <div className="profileCategoryBtns" key={val.id}>
              {val.text}
            </div>
          ))}
        </div>
      </div>

      <div>
        <GetUserTweets />
      </div>
    </div>
  );
};

export default TopProfile;
