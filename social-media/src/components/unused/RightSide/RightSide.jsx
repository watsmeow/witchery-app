import React, { useState } from "react";
import "./RightSide.css";
import FollowersCard from "../../FollowersCard/FollowersCard";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  
  return (
    <div className="RightSide">

      <FollowersCard />

    </div>
  );
};

export default RightSide;