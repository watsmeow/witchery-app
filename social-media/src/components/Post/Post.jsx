import React, { useState } from "react";
import './Post.css'
import Comment from '../../img/comment.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
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
      <span>{data.username}</span>
        <img src={
          data.image 
          ? process.env.REACT_APP_PUBLIC_FOLDER + data.image
          : ""
        } 
        alt="" />


        <div className="postReact">
            <img src={
              liked
              ? Heart
              : NotLike} 
              alt="" 
              style={{cursor: "pointer"}}
              onClick={handleLike}
              />
            <img src={Comment} alt="" />
        </div>

        <span style={{color: "var(--gray)", fontSize: '12px'}}>{likes} likes</span>

        <div className="detail">
            <span> {data.desc}</span>
        </div>

        {user._id === data.userId? 
        <button
        className="button-two"
        onClick={handleDelete}>Delete Post
        </button>
        : ""}
    </div>
  )
}

export default Post