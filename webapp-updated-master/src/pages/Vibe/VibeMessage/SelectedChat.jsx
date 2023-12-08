import React, { useEffect } from "react";
import style from "./VibeMessageMain.module.css";
import profileimg from "../../../images/MentorProfileCard.webp";
import dots from "../../../images/dots.webp";
import SelectedChatBox from "./SelectedChatBox";
import { useDispatch, useSelector } from "react-redux";
import vibeChatSlice, {
  updateSelectedUser,
  Chatshow,
} from "../../../features/vibeChatSlice";
import VibeInput from "./VibeInput";
import VibeMessageDropdown from "./VibeMessageDropdown";
import { updatereadmessage } from "../../../firebase";

const SelectedChat = ({ setChatSelected, setMobileChatNoHeader }) => {
  const chatData = useSelector((state) => state.vibeChat);
  console.log(setChatSelected);
  // console.log("chahaha",chatData?.selectedUserData[chatData?.selectedUserData.length - 1].sendBy);
  const currentLoggedInUser = useSelector((state) => state.user);
  // console.log("vibechat", chatData?.selectedUser?.email  );
  // console.log("currentususus", currentLoggedInUser?.user.email  );
  const dispatch = useDispatch();
  // const lastmsgsender =
  //   chatData?.selectedUserData[chatData?.selectedUserData.length - 1].sendBy;
  const updatereadd = async () => {
    const lastmsgsender =
      chatData?.selectedUserData[chatData?.selectedUserData.length - 1].sendBy;
    if (currentLoggedInUser?.user?.email !== lastmsgsender) {
      console.log("not equal");
      await updatereadmessage(
        currentLoggedInUser?.user,
        chatData?.selectedUser?.email
      );
    }
  };

  useEffect(() => {
    updatereadd();
  }, [chatData]);

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
            src={
              chatData.selectedUser.userImg ||
              "/static/media/default-profile-pic.3ad98a37176f047b65bd.png"
            }
            alt='img'
          />
          <p style={{ cursor: "default" }}>{chatData.selectedUser.name}</p>
        </div>
        <div>
          {/* <img style={{width:"30px",height:"30px",transform:"rotate(90deg)"}} src={dots} alt="" /> */}
          {/* <VibeMessageDropdown /> */}
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
