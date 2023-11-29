import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReciveMessage } from "../../firebase";
import styles from "./Chat.module.css";
import MessagesCont from "./Messages/MessagesCont";
import SelectedUserCont from "./Selected User Container/SelectedUserCont";
import { updateSelectedUserData as updateSelectedUserDataLatest } from "../../features/chatSlice_latest";
import { updateSelectedUserData as updateSelectedUserDataVibe } from "../../features/vibeChatSlice";
// import SidebarFinal from "../../components/Sidebar Final/SidebarFinal";
// import NavBarFinal from "../../components/Navbar/NavBarFinal";
// import KnowledgeNavbar from "../../components/KnowledgeNavbar/KnowledgeNavbar";
// import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";

const Chat = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isNetworkMessage, setIsNetworkMessage] = useState(true);
  const currentcUser = useSelector((state) => state.userDoc);
  const chatData = useSelector((state) =>
    isNetworkMessage ? state.chatLatest : state.vibeChat
  );
  const [tempId, setTempId] = useState("");
  const [Recive, setRecive] = useState([]);
  const dispatch = useDispatch();

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const getChatList = async () => {
      ReciveMessage(
        currentcUser,
        { email: chatData.selectedUser.id },
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
      if (isNetworkMessage) {
        dispatch(updateSelectedUserDataLatest(finalReceive));
      } else {
        dispatch(updateSelectedUserDataVibe(finalReceive));
      }
    }
  }, [Recive]);

  return (
    <>
      <div className={styles.chat_main_Cont}>
        <NavBarFinalDarkMode />
        <div className={styles.innerCont}>
          <MessagesCont
            isNetworkMessage={isNetworkMessage}
            setIsNetworkMessage={setIsNetworkMessage}
          />
        </div>
        <SelectedUserCont
          isNetworkMessage={isNetworkMessage}
          setIsNetworkMessage={setIsNetworkMessage}
        />
      </div>
    </>
  );
};

export default Chat;
