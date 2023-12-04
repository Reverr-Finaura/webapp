import React from "react";
import styles from "./UserTitleCont.module.css";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  updateSelectedUser as updateSelectedUserLatest,
  Chatshow as ChatshowLatest,
} from "../../../features/chatSlice_latest";
import {
  updateSelectedUser as updateSelectedUserVibe,
  Chatshow as ChatshowVibe,
} from "../../../features/vibeChatSlice";

const UserTitleCont = ({ isNetworkMessage, setIsNetworkMessage }) => {
  const chatData = useSelector((state) =>
    isNetworkMessage ? state.chatLatest : state.vibeChat
  );
  const dispatch = useDispatch();

  return (
    <section className={styles.outerCont}>
      <img
        className={styles.userImg}
        src={chatData.selectedUser.userImg}
        alt='userImg'
      />

      <div className={styles.userNameNStatus}>
        <h3 className={styles.userName}>{chatData.selectedUser.name}</h3>
        {/* <p className={styles.userStatus}>Online</p> */}
      </div>

      {/* <BiDotsVerticalRounded className={styles.infoIcon} /> */}
      <AiOutlineClose
        className={styles.infoIcon}
        onClick={() => {
          if (isNetworkMessage) {
            dispatch(updateSelectedUserLatest(null));
            dispatch(ChatshowLatest());
          } else {
            dispatch(updateSelectedUserVibe(null));
            dispatch(ChatshowVibe());
          }
        }}
      />
    </section>
  );
};

export default UserTitleCont;
