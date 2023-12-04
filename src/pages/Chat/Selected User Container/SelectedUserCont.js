import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NewChatContainer from "../New Chat Container/NewChatContainer";
import UserChatContainer from "../User Chat Container/UserChatContainer";
import UserTitleCont from "../User Title Cont/UserTitleCont";
import styles from "./SelectedUserCont.module.css";

const SelectedUserCont = ({
  setChatUserData,
  isNetworkMessage,
  setIsNetworkMessage,
}) => {
  const chatData = useSelector((state) =>
    isNetworkMessage ? state.chatLatest : state.vibeChat
  );
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <>
      {width > 500 ? (
        <section className={styles.outerCont}>
          {!chatData.selectedUser && (
            <>
              <div className={styles.innerCont}>No Chat To Display</div>
            </>
          )}
          {chatData.selectedUser && (
            <>
              <UserTitleCont
                isNetworkMessage={isNetworkMessage}
                setIsNetworkMessage={setIsNetworkMessage}
              />
              <UserChatContainer
                isNetworkMessage={isNetworkMessage}
                setIsNetworkMessage={setIsNetworkMessage}
              />
              <NewChatContainer
                isNetworkMessage={isNetworkMessage}
                setIsNetworkMessage={setIsNetworkMessage}
              />
            </>
          )}
        </section>
      ) : (
        <section
          className={styles.outerCont}
          style={{
            display: chatData.chatdisplay === true ? "flex" : "none",
            flexDirection: "column",
          }}
        >
          {!chatData.selectedUser && (
            <>
              <div className={styles.innerCont}>No Chat To Display</div>
            </>
          )}
          {chatData.selectedUser && (
            <>
              <UserTitleCont
                isNetworkMessage={isNetworkMessage}
                setIsNetworkMessage={setIsNetworkMessage}
              />
              <UserChatContainer
                isNetworkMessage={isNetworkMessage}
                setIsNetworkMessage={setIsNetworkMessage}
              />
              <NewChatContainer
                isNetworkMessage={isNetworkMessage}
                setIsNetworkMessage={setIsNetworkMessage}
              />
            </>
          )}
        </section>
      )}
    </>
  );
};

export default SelectedUserCont;
