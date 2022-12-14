import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadAction";

const PostShare = () => {
  const loading = useSelector((state) => state.postReducer.uploading);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const spellname = useRef();
  const purpose = useRef();
  const howToMake = useRef();
  const effects = useRef();
  const questions = useRef();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const reset = () => {
    setImage(null);
    spellname.current.value = "";
    purpose.current.value = "";
    howToMake.current.value = "";
    effects.current.value = "";
    questions.current.value = "";
    user.username = "";
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      spellname: spellname.current.value,
      purpose: purpose.current.value,
      howToMake: howToMake.current.value,
      effects: effects.current.value,
      questions: questions.current.value,
      username: user.username,
    };
    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost));
    reset();
  };

  return (
    <div className="PostShare">
      <div>
        <div className="postShareHeader">
          <img
            className="profileImage"
            src={
              user.profilePicture
                ? serverPublic + user.profilePicture
                : serverPublic + "defaultProfile.png"
            }
            alt=""
          />
          <h3>Share a spell</h3>
        </div>


        <input type="text" placeholder="Spell name" ref={spellname} required />
        <input type="text" placeholder="Purpose" ref={purpose}  />
        <input type="text" placeholder="Ingredients and instructions" ref={howToMake} className="ingredients" required/>
        <input type="text" placeholder="Effects" ref={effects} />
        <input type="text" placeholder="Questions for others" ref={questions} />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <button
            className="button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Uploading" : "Post"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
      </div>
     
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}


    </div>
  );
};

export default PostShare;
