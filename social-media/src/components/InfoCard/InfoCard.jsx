import React, { useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import * as UserApi from '../../api/userRequest';
import { logOut } from "../../actions/AuthAction";
import { Link } from "react-router-dom";

const InfoCard = ({location}) => {
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
        <h3>Your Information</h3>
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
      <h5>Title: </h5>
        <p>{profileUser.title}</p>
      </div>

      <div className="info">
      <h5>Currently practicing: </h5>
        <p>{profileUser.practitionerOf}</p>
      </div>

      <div className="info">
      <h5>Trained in: </h5>
          <p>{profileUser.magicTradition}</p>
      </div>

      <div className="nav-buttons">
      {location === 'profilePageLeft' ? 
        <button
        className="button">
          <Link 
          style={{textDecoration: "none", color: "inherit"}}
          to={`/home`}>
            Home
          </Link>
        </button> : ""} 
      <button 
      className="button"
      onClick={handleLogout}
      >
        Logout
      </button>
      </div>
    </div>
  );
};

export default InfoCard;