import React, { useState, useEffect } from "react";
import ChatsContainer from "../Chats Container/ChatsContainer";
import styles from "./MessagesCont.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSelectedUser as updateSelectedUserLatest,
  Chatshow as ChatshowLatest,
} from "../../../features/chatSlice_latest";
import {
  updateSelectedUser as updateSelectedUserVibe,
  Chatshow as ChatshowVibe,
} from "../../../features/vibeChatSlice";

const MessagesCont = ({ isNetworkMessage, setIsNetworkMessage }) => {
  const [sorter, setSorter] = useState("Newest");
  const [width, setWidth] = useState(window.innerWidth);
  const chatData = useSelector((state) =>
    isNetworkMessage ? state.chatLatest : state.vibeChat
  );
  const dispatch = useDispatch();
  // console.log(chatData.chatdisplay);

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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 className={styles.message}>Messages</h2>
          </div>
          <div className={styles.messageTypeSelect}>
            <div>
              <span
                style={{
                  color: isNetworkMessage && "black",
                  cursor: "pointer",
                  padding: "5px 10px",
                }}
                className={isNetworkMessage && styles.networkMessage}
                onClick={() => {
                  setIsNetworkMessage(true);
                  dispatch(updateSelectedUserVibe(null));
                  dispatch(ChatshowVibe());
                }}
              >
                Network
              </span>
              <span
                style={{
                  color: !isNetworkMessage && "black",
                  cursor: "pointer",
                  padding: "5px 10px",
                }}
                className={!isNetworkMessage && styles.matchedMessage}
                onClick={() => {
                  setIsNetworkMessage(false);
                  dispatch(updateSelectedUserLatest(null));
                  dispatch(ChatshowLatest());
                }}
              >
                Match
              </span>
            </div>
          </div>

          {/* <div className={styles.sorterCont}>
            <p className={styles.sorterText}>Sort by</p>
            <div className={styles.messageSorterCont}>
              <select
                onChange={(e) => setSorter(e.target.value)}
                className={styles.sorter}
                name="sortBy"
                value={sorter}
              >
                <option className={styles.options} value="Newest">
                  Newest
                </option>
                <option value="Oldest">Oldest</option>
              </select>
            </div>
          </div> */}

          <ChatsContainer
            sorter={sorter}
            isNetworkMessage={isNetworkMessage}
            setIsNetworkMessage={setIsNetworkMessage}
          />
        </section>
      ) : (
        <section
          className={styles.outerCont}
          style={{ display: chatData.chatdisplay === false ? "flex" : "none" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 className={styles.message}>Messages</h2>
          </div>
          {/* <div className={styles.sorterCont}>
            <p className={styles.sorterText}>Sort by</p>
            <div className={styles.messageSorterCont}>
              <select
                onChange={(e) => setSorter(e.target.value)}
                className={styles.sorter}
                name="sortBy"
                value={sorter}
              >
                <option className={styles.options} value="Newest">
                  Newest
                </option>
                <option value="Oldest">Oldest</option>
              </select>
            </div>
          </div> */}

          <ChatsContainer
            sorter={sorter}
            isNetworkMessage={isNetworkMessage}
            setIsNetworkMessage={setIsNetworkMessage}
          />
        </section>
      )}
    </>
  );
};

export default MessagesCont;
