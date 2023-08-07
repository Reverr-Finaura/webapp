import React, { useEffect } from "react";
import style from "./VibeMessageMain.module.css";
import profileimg from "../../../images/MentorProfileCard.webp";
import VibeYourChat from "./VibeYourChat";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectedChat from "./SelectedChat";
import defaultImg from "../../../images/default-profile-pic.webp";
import {
  ReciveMessage,
  createMatchedInMessagesDoc,
  db,
} from "../../../firebase";
import { updateSelectedUserData } from "../../../features/vibeChatSlice";
import { doc, getDoc } from "firebase/firestore";
import { setUserDoc } from "../../../features/userDocSlice";
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
  const currentLoggedInUser = useSelector((state) => state.user);
  const userDoc = useSelector((state) => state.userDoc);
  const chatData = useSelector((state) => state.vibeChat);
  const [tempId, setTempId] = useState("");
  const [name, setName] = useState("");
  const [profileImg, setProfileImg] = useState(defaultImg);
  const [Chatselected, setChatSelected] = useState(false);
  const [Recive, setRecive] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("userDoc.......0", userDoc);

  // useEffect(() => {
  //   if (userDoc) {
  //     setName(userDoc.name);
  //     userDoc.image !== undefined && userDoc.image !== ""
  //       ? setProfileImg(userDoc.image)
  //       : setProfileImg(defaultImg);
  //   }
  // }, [userDoc]);

  // Fetch current user doc from firebase and set it to redux store
  useEffect(() => {
    async function fetchUserDocFromFirebase() {
      const docRef = doc(db, "Users", currentLoggedInUser?.user?.email);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        // console.log("111", data)
        setName(data.name);
        data.image !== undefined && data.image !== ""
          ? setProfileImg(data.image)
          : setProfileImg(defaultImg);
        dispatch(setUserDoc(data));
      }
    }
    fetchUserDocFromFirebase();
  }, [currentLoggedInUser]);

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

  useEffect(() => {
    const getChatList = async () => {
      ReciveMessage(
        currentLoggedInUser?.user,
        chatData.selectedUser,
        setRecive,
        chatData.selectedUser.bucket
      );
    };
    if (chatData.selectedUser && tempId !== chatData.selectedUser.id) {
      getChatList();
      setTempId(chatData.selectedUser.id);
    }
  }, [chatData]);

  useEffect(() => {
    let finalReceive = [];
    if (Recive.length > 0) {
      Recive.map((c, idx) => {
        finalReceive.push({
          ...c,
          createdAt:
            c.createdAt.seconds !== "" ? c.createdAt.seconds * 1000 : "",
        });
      });
      dispatch(updateSelectedUserData(finalReceive));
    }
  }, [Recive]);

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
