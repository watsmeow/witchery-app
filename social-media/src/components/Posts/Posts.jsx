import React, { useEffect, useState } from "react";
import './Posts.css';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux'
import { getTimelinePosts } from "../../actions/PostAction";
import { useParams } from "react-router-dom";
import { getUser, getAllUsers } from "../../api/userRequest";


const Posts = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const params = useParams()
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  }, [])
  
  if (!posts) return "No current posts";
  if (params.id) posts = posts.filter((post) => post.userId === params.id)

  return (
    <div className="Posts">
      {loading ? 
      "Retrieving posts" :
      posts.map((post, id)=>{
            return <Post data={post} key={id}/>
        })}
    </div>
  )
}

export default Posts