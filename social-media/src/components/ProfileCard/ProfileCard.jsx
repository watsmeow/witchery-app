import React, { useState } from "react";
import "./ProfileCard.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as UserApi from '../../api/userRequest';
import { logOut } from "../../actions/AuthAction";

const ProfileCard = ({location}) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  const handleLogout = () => {
    dispatch(logOut())
  };

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img 
        src={
          user.coverPicture 
          ? serverPublic + user.coverPicture
          : serverPublic + "defaultCover.jpg"
        } 
        alt="profile-background" 
        />
        <div className="image-cropper">
          <img src={
            user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.png"
          } 
            className="profile-pic" 
            alt="profile-pic" 
            />
        </div>
      </div>

      <div className="ProfileName">
        <h2>{user.firstname}</h2>
        <span>
          {user.title
        ? user.title + " and practitioner of " + user.practitionerOf + ". Trained in " + user.magicTradition +"."
        : "Update your profile to display your details"}
        </span>
      </div>

      <div className="followStatus">

        <div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>

          {location === 'profilePage' && (
            <>

              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>

      </div>
      {location === 'profilePage' ?    


          ("")
            : 
            <div className="nav-buttons">  
        <button
        className="button">
          <Link 
          style={{textDecoration: "none", color: "inherit"}}
          to={`/profile/${user._id}`}>
            Profile
            
          </Link>
        </button>
        <button 
        className="button"
        onClick={handleLogout}
        >
          Logout
        </button>
      </div>}

    </div>
  );
};

export default ProfileCard;