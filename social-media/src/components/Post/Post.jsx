import React, { useState } from "react";
import './Post.css';
// import Comment from '../../img/comment.png';
import Darkmoon from '../../img/darkmoon.png';
import Lightmoon from '../../img/lightmoon.png';
import { useSelector, useDispatch } from 'react-redux'
import { likePost } from "../../api/postRequest";
import { deletePost } from "../../actions/PostAction";
import { UilPen } from "@iconscout/react-unicons";
import PostModal from "../PostModal/PostModal";
import { useParams } from "react-router-dom";

const Post = ({data}) => {
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.authReducer.authData)
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id;

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev -1) : setLikes((prev) => prev + 1)
  };

  const handleDelete = () => {
    if (user._id === data.userId) {
      try {
        dispatch(deletePost(data._id, data.userId))
      } catch (error) {
        console.log(error)
      }
    } 
  };

  return (
    <div className="Post">

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
          <PostModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            data = {data}
          />
        </div> )
        : ("")}
      </div>
        <h2>{data.spellname}: A spell for {data.purpose} by {data.username}</h2>

        <div className="detail">

          <h5>Ingredients and instructions:</h5>
          <p>{data.howToMake}</p>
          <h5>Effects:</h5>
          <p>{data.effects}</p>

        </div>

        {
          data.image 
          ? <img src={process.env.REACT_APP_PUBLIC_FOLDER + data.image} alt="" />
          : ""
        } 

        {data.questions && (
          <p>{data.questions}</p>)}
        <div
        className="button-two-holder">
        <div className="postReact">
            <img src={
              liked
              ? Lightmoon
              : Darkmoon} 
              alt="" 
              style={{cursor: "pointer"}}
              onClick={handleLike}
              />
            <span style={{color: "var(--gray)", fontSize: '12px'}}>{likes} likes</span>
            {/* <img src={Comment} alt="" /> */}

        </div>

        
          <div className="button-holder2">
          {user._id === data.userId? 
          <button
          className="button"
          onClick={handleDelete}>Delete
          </button>
          : ""}
          </div>
        </div>

    </div>
  )
}

export default Post