import React from 'react'
import './Home.css'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/ProfileSide/ProfileSide'

const Home = () => {
  return (
    <div className='Home'>
        <ProfileSide/>
        <PostSide/>
    </div>
  )
}

export default Home