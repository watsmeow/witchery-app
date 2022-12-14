
import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import { getAllUsers } from "../../api/userRequest";
import User from "../User/User";
import { useSelector } from "react-redux";
import FollowersModal from "../FollowersModal/FollowersModal";

const FollowersCard = ({ location }) => {
    const [modalOpened, setModalOpened] = useState(false);
    const [persons, setPersons] = useState([]);
    const { user } = useSelector((state) => state.authReducer.authData);
  
    useEffect(() => {
        const fetchPersons = async () => {
          const { data } = await getAllUsers();
          setPersons(data);
        };
        fetchPersons();
      }, []);
    
  return (
    <div className="FollowersCard">
      <div>
        <h3>People you may know</h3>
        {persons.map((person, id) => {
          if (person._id !== user._id) return <User 
          person={person} 
          key={id} 
          />;
        })}
        <div className="button-holder">
        {!location ? (
          <button 
          className="button"
          onClick={() => setModalOpened(true)}>More</button>
        ) : (
          ""
        )}
        </div>
        <FollowersModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
        />
      </div>
    </div>
  )
}

export default FollowersCard