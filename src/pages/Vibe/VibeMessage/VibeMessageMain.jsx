import React, { useEffect } from "react";
import style from "./VibeMessageMain.module.css";
import profileimg from "../../../images/MentorProfileCard.webp";
import VibeYourChat from "./VibeYourChat";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectedChat from "./SelectedChat";
import defaultImg from "../../../images/default-profile-pic.webp";
import { createMatchedInMessagesDoc } from "../../../firebase";
// import { set } from "video.js/dist/types/tech/middleware";

const data = [
  {
    img: profileimg,
    name: "Dante",
    message:
      "Vero rerum dolorem natus sed sit commodi. Voluptate sit cupiditate ut et eos consectetur id. Dolor a sit libero dolorum sequi ratione assumenda deleniti. Velit et facere expedita modi molestiae quia itaque. Rem voluptatum ipsum ex tempore. Et eos illum minus delectus sint deleniti.",
  },
  {
    img: profileimg,
    name: "Dante",
    message:
      "Vero rerum dolorem natus sed sit commodi. Voluptate sit cupiditate ut et eos consectetur id. Dolor a sit libero dolorum sequi ratione assumenda deleniti. Velit et facere expedita modi molestiae quia itaque. Rem voluptatum ipsum ex tempore. Et eos illum minus delectus sint deleniti.",
  },
  {
    img: profileimg,
    name: "Dante",
    message:
      "Vero rerum dolorem natus sed sit commodi. Voluptate sit cupiditate ut et eos consectetur id. Dolor a sit libero dolorum sequi ratione assumenda deleniti. Velit et facere expedita modi molestiae quia itaque. Rem voluptatum ipsum ex tempore. Et eos illum minus delectus sint deleniti.",
  },
  {
    img: profileimg,
    name: "Dante",
    message:
      "Vero rerum dolorem natus sed sit commodi. Voluptate sit cupiditate ut et eos consectetur id. Dolor a sit libero dolorum sequi ratione assumenda deleniti. Velit et facere expedita modi molestiae quia itaque. Rem voluptatum ipsum ex tempore. Et eos illum minus delectus sint deleniti.",
  },
  {
    img: profileimg,
    name: "Dante",
    message:
      "Vero rerum dolorem natus sed sit commodi. Voluptate sit cupiditate ut et eos consectetur id. Dolor a sit libero dolorum sequi ratione assumenda deleniti. Velit et facere expedita modi molestiae quia itaque. Rem voluptatum ipsum ex tempore. Et eos illum minus delectus sint deleniti.",
  },
  {
    img: profileimg,
    name: "Dante",
    message:
      "Vero rerum dolorem natus sed sit commodi. Voluptate sit cupiditate ut et eos consectetur id. Dolor a sit libero dolorum sequi ratione assumenda deleniti. Velit et facere expedita modi molestiae quia itaque. Rem voluptatum ipsum ex tempore. Et eos illum minus delectus sint deleniti.",
  },
];

const VibeMessageMain = () => {
  const userDoc = useSelector((state) => state.userDoc);
  const [name, setName] = useState("");
  const [profileImg, setProfileImg] = useState(defaultImg);
  const [Chatselected, setChatSelected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userDoc) {
      setName(userDoc.name);
      userDoc.image !== undefined && userDoc.image !== ""
        ? setProfileImg(userDoc.image)
        : setProfileImg(defaultImg);
    }
    console.log("userDoc.......", userDoc);
  }, [userDoc]);

  useEffect(() => {
    const createMatch = async () => {
      try {
        await createMatchedInMessagesDoc(
          "test@reverr.io",
          // "apurbar06@gmail.com",
          "ced19i053@iiitdm.ac.in"
          // "sivatharun2212@gmail.com"
        );
      } catch (error) {
        console.log("error", error);
      }
    };

    // createMatch();
  }, []);

  return (
    <div className={style.RigtSidebarContainer}>
      <div className={style.UserdetailsHeader}>
        <div>
          <img
            className={style.UserdetailsHeaderImg}
            src={profileImg}
            alt="img"
          />
          <p>{name}</p>
        </div>
        <p
          className={style.UserdetailsHeaderPtag}
          onClick={() => navigate("/userprofile")}
        >
          View Profile &gt;
        </p>
      </div>

      {Chatselected ? (
        <SelectedChat setChatSelected={setChatSelected} />
      ) : (
        <VibeYourChat data={data} setChatSelected={setChatSelected} />
      )}
    </div>
  );
};

export default VibeMessageMain;
