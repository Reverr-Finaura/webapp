import React from "react";
import style from "./VibeMessageMain.module.css";
import profileimg from "../../../images/MentorProfileCard.webp";
import dots from "../../../images/dots.webp";
import SelectedChatBox from "./SelectedChatBox";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedUser, Chatshow } from "../../../features/vibeChatSlice";
import VibeInput from "./VibeInput";
import VibeMessageDropdown from "./VibeMessageDropdown";

const SelectedChat = ({ setChatSelected,setMobileChatNoHeader }) => {
  const chatData = useSelector((state) => state.vibeChat);
  const dispatch = useDispatch();

  return (
    <div className={style.SelectedChatContainer}>
      <div className={style.SelectedChatHeader}>
        <div>
          <span
            onClick={() => {
              setChatSelected(false);
              setMobileChatNoHeader(false);
              dispatch(updateSelectedUser(null));
              dispatch(Chatshow());
            }}
            style={{ cursor: "pointer" }}
          >
            {" "}
            &lt;
          </span>
          <img
            className={style.UserdetailsHeaderImg}
            src={chatData.selectedUser.userImg}
            alt="img"
          />
          <p style={{cursor:"default",}}>{chatData.selectedUser.name}</p>
        </div>
        <div>
        {/* <img style={{width:"30px",height:"30px",transform:"rotate(90deg)"}} src={dots} alt="" /> */}
        <VibeMessageDropdown/>
        </div>
        
      </div>
      <hr style={{ width: "100%", color: "#A7A7A7" }} />

      <div
        className={style.scrollnone}
        style={{ width: "100%", height: "80%", overflowY: "scroll" }}
      >
        <SelectedChatBox />
      </div>

      <div>
        <VibeInput />
      </div>
    </div>
  );
};

export default SelectedChat;
