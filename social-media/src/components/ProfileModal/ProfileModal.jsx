import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/UploadAction";
import { updateUser } from "../../actions/UserAction";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const {password, ...other} = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      userData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      userData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(updateUser(param.id, userData));
    setModalOpened(false);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form 
      className="infoForm"
      onSubmit={handleSubmit}>
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.firstname}
          />

          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="title"
            placeholder="Your title"
            onChange={handleChange}
            value={formData.title}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="practitionerOf"
            placeholder="Type of magic typically practiced"
            onChange={handleChange}
            value={formData.practitionerOf}
          />

          <input
            type="text"
            className="infoInput"
            name="magicTradition"
            placeholder="Magic traditions you are trained in"
            onChange={handleChange}
            value={formData.magicTradition}
          />
        </div>


        <div>
            Profile Image 
            <input 
            type="file" 
            name='profileImage'
            onChange={onImageChange}
            />
            Cover Image
            <input 
            type="file" 
            name="coverImage" 
            onChange={onImageChange}
            />
        </div>

        <button 
        className="button">
          Store
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModal;