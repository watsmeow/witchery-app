import React from 'react';
import ProfileCard from '../ProfileCard/ProfileCard';
import FollowersCard from '../FollowersCard/FollowersCard'

import "./ProfileSide.css"
const ProfileSide = () => {
  return (
    <div className="ProfileSide">
        <ProfileCard
        location="/homepage" />
        <FollowersCard />
    </div>
  )
}

export default ProfileSide