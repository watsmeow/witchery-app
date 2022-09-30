import React, { useState } from "react";
import './Post.css';
import Comment from '../../img/comment.png';
import Fire from '../../img/firepentagram.png';
import Nofire from '../../img/blackpentagram.png';
import Darkmoon from '../../img/darkmoon.png';
import Lightmoon from '../../img/lightmoon.png';
import { useSelector, useDispatch } from 'react-redux'
import { likePost } from "../../api/postRequest";
import { deletePost } from "../../actions/PostAction";

const Post = ({data}) => {
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.authReducer.authData)
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)

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
  }
  return (
    <div className="Post">
        <h4>{data.username}</h4>
        <img src={
          data.image 
          ? process.env.REACT_APP_PUBLIC_FOLDER + data.image
          : ""
        } 
        alt="" />

        <div className="detail">
          <p>{data.desc}</p>
        </div>
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