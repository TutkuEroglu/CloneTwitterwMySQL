import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/actions";
import { delTweets } from "../../redux/actions/getTweetsAction";

const Navbar = () => {
  const { USERNAME } = useSelector((state) => state.AUTH);
  const isNotify = useSelector((state) => state?.Notify.isNotification);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signOut());
    dispatch(delTweets());
    navigate("/login");
  };

  const profile = () => {
    navigate(`/${USERNAME}`);
  };

  const notify = () => {
    navigate("/notifications");
  };

  return (
    <>
      <div className="SideBarButtons" onClick={() => navigate("/home")}>
        <div className="SideBarIcons">
          <i className="bi bi-house-door"></i>
        </div>
        <div className="SideBarNames">Anasayfa</div>
      </div>
      <div className="SideBarButtons" onClick={notify}>
        <div className="SideBarIcons">
          <i className="bi bi-bell"></i>
          {isNotify ? <i className="bi bi-circle-fill notify"></i> : ""}
        </div>
        <div className="SideBarNames">Bildirimler</div>
      </div>
      <div className="SideBarButtons">
        <div className="SideBarIcons">
          <i className="bi bi-envelope"></i>
        </div>
        <div className="SideBarNames">Mesajlar</div>
      </div>
      <div className="SideBarButtons" onClick={profile}>
        <div className="SideBarIcons">
          <i className="bi bi-person"></i>
        </div>
        <div className="SideBarNames">Profil</div>
      </div>
      <div className="SideBarButtons" onClick={logout}>
        <div className="SideBarIcons">
          <i className="bi bi-box-arrow-right"></i>
        </div>
        <div className="SideBarNames">Çıkış Yap</div>
      </div>
    </>
  );
};

export default Navbar;
