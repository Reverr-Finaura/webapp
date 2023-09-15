import React from "react";
import style from "./VibeMessageMain.module.css";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatSkeleton from "../../../components/Post Skeleton/Chat Skeleton/ChatSkeleton";
import { db, getAllMatchedUserHavingChatWith } from "../../../firebase";
import { updateSelectedUser, Chatshow } from "../../../features/vibeChatSlice";

const VibeYourChat = ({ data, setChatSelected,mobile,setMobileChatNoHeader }) => {
  const currentcUser = useSelector((state) => state.userDoc);
  const currentLoggedInUser = useSelector((state) => state.user);
  // const currentcUser={email:"mauricerana@gmail.com"}
  const dispatch = useDispatch();
  const [dummyLoading, setDummyLoadig] = useState(false);
  const [dataPreprocessing, setDataPreprocessing] = useState(true);
  const [dummyLoading2, setDummyLoadig2] = useState(false);
  const [chatList, setChatList] = useState([]);
  const chatData = useSelector((state) => state.chatLatest);
  const [chatUserData, setChatUserData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  const handleClick2 = () => {
    setIsClicked2(!isClicked2);
  };
  console.log("chatlist",chatUserData);
  console.log( new Date(1694697491000));

  const getAllUserChat = async () => {
    try {
      const userEmail = currentLoggedInUser?.user?.email;
      setDummyLoadig(true);
      await getAllMatchedUserHavingChatWith(userEmail, setChatList);
      setDummyLoadig(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getAllUserChat();
  }, [currentLoggedInUser]);

  useEffect(() => {
    setDataPreprocessing(true);
    if (chatList.length === 0) {
      setDummyLoadig2(false);
      return;
    }

    if (chatUserData.length === 0) {
      chatList.map(async (list, idx) => {
        const docRef = doc(db, "Users", list.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.data())
        // console.log("docsnap",docSnap.data());
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
                    list?.messages[list?.messages?.length - 1].createdAt !== ""
                      ? list?.messages[list?.messages?.length - 1].createdAt?.seconds * 1000
                      : "",
                  latestMessageSenderId:
                    list?.messages[list?.messages?.length - 1].sendBy,
                  imgMsg: list?.messages[list?.messages?.length - 1].image,
                  read: list?.messages[list?.messages?.length - 1].read,
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
              read: newList?.messages[newList?.messages?.length - 1].read,
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
    setDataPreprocessing(false);
    // console.log("chat data is1:", chatUserData);
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

  // useEffect(() => {}, [sorter]);

  return (
    <div className={style.Userdisplay}>
      {
        !mobile && <div style={{cursor:"default",}} className={style.Userdisplaycapsule}>Your Messages</div>
      }
      

      <div onClick={()=>mobile && setMobileChatNoHeader(true)} className={style.messageboxcontainer}>
        {dummyLoading ? (
          <ChatSkeleton cards={3} />
        ) : chatUserData.length === 0 ? (
          <p style={{ display: "flex", justifyContent: "center" }}>
            No Chats To Display
          </p>
        ) : null}

        {!dummyLoading && chatUserData.length !== 0
          ? chatUserData.map((item, key) => (
            
              <div
                onClick={() => {
                  setChatSelected(true);
                  dispatch(updateSelectedUser(item));
                  dispatch(Chatshow());
                }}
                className={style.singlemessageboxcontainer}
                key={key}
              >
                <img src={item?.userImg} alt="img" />
                <div style={{width:"100%"}}>
                  <div style={{width:"90%",display:"flex",justifyContent:"space-between"}}>
                  <p>{item?.name}</p>
                  <p style={{fontSize:"9px",color:"#A7A7A7"}}>{`${new Date(item?.sendAT).toLocaleDateString()}`}</p>
                  </div>
                  
                  <p style={{ fontSize: "15px", color: `${item?.latestMessageSenderId !== currentLoggedInUser?.user?.email && item?.read === false ? "white" : "#A7A7A7"}` }}>
                    {item?.latestMessageSenderId === currentLoggedInUser?.user?.email
                      ? "Me: "
                      : " "}
                    {item?.latestMessage !== ""  ? item?.latestMessage?.slice(0, 35)
                      : ""}
                    ...
                  </p>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default VibeYourChat;
