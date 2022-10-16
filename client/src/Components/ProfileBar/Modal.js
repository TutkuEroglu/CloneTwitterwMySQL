import React, { useState } from "react";
import "./Modal.css";
import profilPic from "../../Assets/Images/user.png";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../redux/actions";

const Modal = ({ open, onClose }) => {
  const { USERID, NAME, INFORMATION, LOCATION, WEBSITE, BIRTHDAY } =
    useSelector((state) => state.AUTH);
  const dispatch = useDispatch();

  const [name, setName] = useState(NAME);
  const [information, setInformation] = useState(INFORMATION);
  const [location, setLocation] = useState(LOCATION);
  const [webSite, setWebSite] = useState(WEBSITE);
  const [visibility, setVisibility] = useState(true);
  const birthdayArray = BIRTHDAY.split(" ");
  const [selectedDay, setSelectedDay] = useState(birthdayArray[0]);
  const [selectedMonth, setSelectedMonth] = useState(birthdayArray[1]);
  const [selectedYear, setSelectedYear] = useState([birthdayArray[2]]);
  const dayOptions = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const monthOptions = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];
  const yearOptions = [
    1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
    2002, 2003, 2004, 2005,
  ];

  const SaveInfo = async (e) => {
    e.preventDefault();
    try {
      const date = selectedDay + " " + selectedMonth + " " + selectedYear;
      const data = {
        USERID: USERID,
        NAME: name,
        INFORMATION: information,
        LOCATION: location,
        WEBSITE: webSite,
        BIRTHDAY: date,
      };
      const response = await Axios.post(
        "http://localhost:3001/api/profileinfo",
        data
      );
      if (response?.data) {
        if (response?.data?.message === "success") {
          dispatch(signIn(response?.data?.data[0]));
        } else {
        }
      }
    } catch (e) {
      return e;
    }
    setVisibility(true);
  };

  const setVis = () => {
    setVisibility(!visibility);
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
    >
      <div className="modal-dialog">
        <div className="modal-content modalContainer">
          <div className="modal-header header">
            <div className="headerLeftContainer pl-0">
              <button
                type="button"
                className="btn bi-x-lg close "
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              ></button>
              <h1
                className="modal-title fs-5 headerLeftText"
                id="exampleModalLabel"
              >
                Profili düzenle
              </h1>
            </div>
            <div className="editProfileContain">
              <span
                className="editProfileBtn"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={(e) => SaveInfo(e)}
              >
                Kaydet
              </span>
            </div>
          </div>

          <div className="backgroundImageContain"></div>
          <div className="profileTitleContain">
            <div className="profileImageContain">
              <img className="imgContain" src={profilPic} alt="/" />
            </div>
            <div className="profileContainerContain"></div>
          </div>

          <div className="modal-body">
            <form>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control input"
                  id="floatingInput"
                  placeholder="İsim"
                  defaultValue={NAME === "" ? "" : NAME}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete={"off"}
                />
                <label htmlFor="floatingInput" className="label">
                  İsim
                </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control input"
                  id="floatingInput"
                  placeholder="Kişisel bilgiler"
                  defaultValue={information === "" ? "" : information}
                  onChange={(e) => setInformation(e.target.value)}
                  autoComplete={"off"}
                />
                <label htmlFor="floatingInput" className="label">
                  Kişisel bilgiler
                </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control input"
                  id="floatingInput"
                  placeholder="Konum"
                  defaultValue={location === "" ? "" : location}
                  onChange={(e) => setLocation(e.target.value)}
                  autoComplete={"off"}
                />
                <label htmlFor="floatingInput" className="label">
                  Konum
                </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control input"
                  id="floatingInput"
                  placeholder="Internet sitesi"
                  defaultValue={webSite === "" ? "" : webSite}
                  onChange={(e) => setWebSite(e.target.value)}
                  autoComplete={"off"}
                />
                <label htmlFor="floatingInput" className="label">
                  Internet sitesi
                </label>
              </div>

              <div className="userBirth">
                <span className="userSpan">Doğum tarihi · </span>
                <span className="editSpan mb-3" onClick={setVis}>
                  {visibility ? "Düzenle" : "Iptal"}
                </span>{" "}
                <br />
                {visibility ? (
                  <span className="birthDaySpan">{BIRTHDAY}</span>
                ) : (
                  <>
                    <div className="select">
                      <select
                        id="inputState"
                        className="form-select selectMonth"
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        defaultValue={birthdayArray[1]}
                      >
                        {monthOptions.map((option, index) => {
                          return <option key={index}>{option}</option>;
                        })}
                      </select>
                      <select
                        id="inputState"
                        className="form-select selectDay"
                        onChange={(e) => setSelectedDay(e.target.value)}
                        defaultValue={birthdayArray[0]}
                      >
                        {dayOptions.map((option, index) => {
                          return <option key={index}>{option}</option>;
                        })}
                      </select>
                      <select
                        id="inputState"
                        className="form-select selectYear"
                        onChange={(e) => setSelectedYear(e.target.value)}
                        defaultValue={birthdayArray[2]}
                      >
                        {yearOptions.map((option, index) => {
                          return <option key={index}>{option}</option>;
                        })}
                      </select>
                    </div>
                  </>
                )}
                <div></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
