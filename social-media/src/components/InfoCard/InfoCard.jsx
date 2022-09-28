import React, { useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import * as UserApi from '../../api/userRequest';
import { logOut } from "../../actions/AuthAction";

const InfoCard = () => {
  const dispatch = useDispatch()
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);


  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  const handleLogout = () => {
    dispatch(logOut())
  }

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId 
        ? (
        <div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            data = {user}
          />
        </div> )
        : ("")}
      </div>
     
      <div className="info">
      <span>Status: </span>
        <span>
          <b>{profileUser.relationship}</b>
        </span>
      </div>

      <div className="info">
      <span>Location: </span>
        <span>
          <b>{profileUser.livesin}</b>
        </span>
      </div>

      <div className="info">
      <span>Profession: </span>
        <span>
          <b>{profileUser.worksAt}</b>
        </span>
      </div>

      <button 
      className="button-two fc-button"
      onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default InfoCard;