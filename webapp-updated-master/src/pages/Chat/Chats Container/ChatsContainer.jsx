import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatSkeleton from "../../../components/Post Skeleton/Chat Skeleton/ChatSkeleton";
import {
  db,
  getAllUserHavingChatWith,
  getAllMatchedUserHavingChatWith,
} from "../../../firebase";
import styles from "./ChatContainer.module.css";
import {
  updateSelectedUser as updateSelectedUserLatest,
  Chatshow as ChatshowLatest,
} from "../../../features/chatSlice_latest";
import {
  updateSelectedUser as updateSelectedUserVibe,
  Chatshow as ChatshowVibe,
} from "../../../features/vibeChatSlice";

// const currentcUser={email:"jatin@reverrapp.com"}

const ChatsContainer = ({ sorter, isNetworkMessage, setIsNetworkMessage }) => {
  const currentcUser = useSelector((state) => state.userDoc);
  const currentLoggedInUser = useSelector((state) => state.user);
  // const currentcUser={email:"mauricerana@gmail.com"}
  const dispatch = useDispatch();
  const [dummyLoading, setDummyLoadig] = useState(false);
  const [dummyLoading2, setDummyLoadig2] = useState(false);
  const [chatList, setChatList] = useState([]);
  const chatData = useSelector((state) =>
    isNetworkMessage ? state.chatLatest : state.vibeChat
  );
  const [chatUserData, setChatUserData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  const handleClick2 = () => {
    setIsClicked2(!isClicked2);
  };

  const getAllUserChat = async () => {
    try {
      setChatUserData([]);
      const userEmail = currentLoggedInUser?.user?.email;
      setDummyLoadig(true);
      if (isNetworkMessage) {
        await getAllUserHavingChatWith(currentcUser, setChatList);
      } else {
        await getAllMatchedUserHavingChatWith(userEmail, setChatList);
      }

      setDummyLoadig(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getAllUserChat();
  }, [currentcUser, isNetworkMessage]);

  useEffect(() => {
    if (chatList.length === 0) {
      setDummyLoadig2(false);
      return;
    }

    if (chatUserData.length === 0) {
      chatList.map(async (list, idx) => {
        const docRef = doc(db, "Users", list.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.data())
          setChatUserData((prev) => {
            return [
              ...new Set([
                ...prev,
                {
                  id: docSnap.data().email,
                  email: docSnap.data().email,
                  userType: docSnap.data().userType,
                  bucket: list?.bucket,
                  name: docSnap.data().name,
                  userImg: docSnap.data().image,
                  latestMessage: list?.messages[list?.messages?.length - 1].msg,
                  sendAT:
                    list.messages[list.messages.length - 1].createdAt !== ""
                      ? list?.messages[list?.messages?.length - 1].createdAt
                          .seconds * 1000
                      : "",
                  latestMessageSenderId:
                    list?.messages[list?.messages?.length - 1].sendBy,
                  imgMsg: list?.messages[list?.messages?.length - 1].image,
                },
              ]),
            ];
          });
        setDummyLoadig2(false);
      });
    } else if (chatUserData.length > 0) {
      let newChatUserData = [];
      chatUserData.forEach((oldChat) => {
        chatList.forEach((newList) => {
          if (oldChat?.id === newList?.id) {
            newChatUserData.push({
              ...oldChat,
              latestMessage:
                newList?.messages[newList?.messages?.length - 1].msg,
              sendAT:
                newList.messages[newList.messages.length - 1].createdAt !== ""
                  ? newList?.messages[newList?.messages?.length - 1].createdAt
                      .seconds * 1000
                  : "",
              imgMsg: newList?.messages[newList?.messages?.length - 1].image,
            });
          } else {
            return;
          }
        });
      });

      let dummy = newChatUserData;
      dummy.sort(customSort);
      const finaluserChatArr = chatUserData.map((oldChat) => {
        if (oldChat?.id === dummy[0]?.id) {
          return {
            ...oldChat,
            latestMessage: dummy[0]?.latestMessage,
            sendAT: dummy[0].sendAT,
            imgMsg: dummy[0]?.imgMsg,
          };
        } else {
          return oldChat;
        }
      });
      setChatUserData(finaluserChatArr);
    }
  }, [chatList]);

  function customSort(a, b) {
    const dateA = new Date(a.sendAT);
    const dateB = new Date(b.sendAT);

    if (dateB > dateA) {
      return 1;
    } else if (dateB < dateA) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {}, [sorter]);

  return (
    <section className={styles.outerCont}>
      {dummyLoading ? (
        <ChatSkeleton cards={3} />
      ) : chatUserData.length === 0 ? (
        <p className={styles.noChatsMesssage}>No Chats To Display</p>
      ) : null}

      {/* {dummyLoading === false && chatUserData.length !== 0 ? (
        <div className={styles.buttonsGroup}>
          <button
            className={styles.chatButton}
            style={{
              color: isClicked ? "white" : "#0a2458",
              backgroundColor: isClicked ? "#0a2458" : "white",
              border: isClicked ? "0.5px solid white" : "",
            }}
            onClick={handleClick}
          >
            Your Chats
          </button>
          <button
            className={styles.matchButton}
            style={{
              color: isClicked2 ? "#0a2458" : "white",
              backgroundColor: isClicked2 ? "white" : "#0a2458",
            }}
            onClick={handleClick2}
          >
            New Matches
          </button>
        </div>
      ) : null} */}
      {chatUserData.length > 0 &&
        chatUserData
          .sort((a, b) => {
            return sorter === "Newest"
              ? b.sendAT - a.sendAT
              : a.sendAT - b.sendAT;
          })
          .map((data, idx) => {
            return (
              <div className={styles.messageGroup}>
                <div
                  key={idx}
                  onClick={() => {
                    if (isNetworkMessage) {
                      dispatch(updateSelectedUserLatest(data));
                      dispatch(ChatshowLatest());
                    } else {
                      dispatch(updateSelectedUserVibe(data));
                      dispatch(ChatshowVibe());
                    }
                  }}
                  style={{
                    background:
                      chatData?.selectedUser?.id === data.id ? "unset" : "",
                  }}
                  className={styles.chatCont}
                >
                  <img
                    className={styles.chatImg}
                    src={data.userImg}
                    alt="chatImg"
                  />
                  <div className={styles.userCont}>
                    <h3 className={styles.userName}>{data.name}</h3>
                    <div className={styles.userLastTextCont}>
                      <p className={styles.userLastText}>
                        {data.latestMessageSenderId === currentcUser.email &&
                          "Me: "}
                      </p>{" "}
                      <p className={styles.userLastText}>
                        {data.latestMessage !== ""
                          ? data.latestMessage.slice(0, 15)
                          : "Image"}
                      </p>
                    </div>
                  </div>
                  <p className={styles.chatTime}>
                    {data.sendAT !== ""
                      ? new Date(data.sendAT).toTimeString().slice(0, 5)
                      : ""}
                  </p>
                </div>
              </div>
            );
          })}
    </section>
  );
};

export default ChatsContainer;
