import React, { useRef, useState } from "react";
import { ImAttachment } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { setRedeploy } from "../../../features/reDeploySlice";
import styles from "./VibeMessageMain.module.css";
import { AiFillCloseCircle, AiOutlineSend } from "react-icons/ai";
import { BsEmojiFrown } from "react-icons/bs";
import { SendMessage, uploadMedia } from "../../../firebase";

const VibeInput = () => {
  const currentcUser = useSelector((state) => state.userDoc);
  const currentLoggedInUser = useSelector((state) => state.user);
  const [sending, setSending] = useState(false);
  const deploy = useSelector((state) => state.deploy);
  const dispatch = useDispatch();
  const chatData = useSelector((state) => state.vibeChat);
  const chooseFileRef = useRef(null);
  const [imgUpload, setImgUpload] = useState(null);
  const [tempImgUrl, setTempImgURL] = useState(null);
  const [newMsg, setNewMsg] = useState("");
  const chooseFile = () => {
    if (chooseFileRef.current) {
      chooseFileRef.current.click();
    }
  };

  //ON IMAGE CHANGE
  function onImageChange(e) {
    setImgUpload(e.target.files[0]);
    const fileURL = e.target.files[0];
    if (fileURL) {
      setTempImgURL(URL.createObjectURL(fileURL));
    }
  }

  const saveChatToDatabase = async (imgLink) => {
    console.log("chatData", chatData.selectedUser);
    await SendMessage(
      currentLoggedInUser?.user,
      chatData.selectedUser,
      newMsg,
      imgLink,
      chatData.selectedUser.bucket
    );
    dispatch(setRedeploy(!deploy));
    setTempImgURL(null);
    setImgUpload(null);
    setNewMsg("");
    setSending(false);
  };

  const handleSendMessage = async () => {
    setSending(true);
    if (newMsg === "") {
      setSending(false);
      return;
    }

    if (imgUpload) {
      const imgLink = await uploadMedia(imgUpload, "Messages/images");
      saveChatToDatabase(imgLink);
      return;
    }

    saveChatToDatabase(null);
  };

  return (
    <section className={styles.outerCont}>
      {/* <input
        
              type="file"
              hidden
              className="postImageUpload"
              accept='image/*'
            /> */}
      {/* <div className={styles.wrapperEmoji}>
        <ImAttachment className={styles.attachmentIcon} />
      </div> */}
      <BsEmojiFrown className={styles.emoji} />
      <input
        // style={{ paddingLeft: "5%", height: "2.3em" }}
        className={styles.textInp}
        type="text"
        placeholder="Send Message..."
        value={newMsg}
        onChange={(e)=>{setNewMsg(e.target.value)}}
        onKeyDown={(e)=>(e.key === "Enter" && handleSendMessage())}
      />
      <AiOutlineSend
        style={{ borderRadius: "30px", width: "60px", height: " 39px" }}
        className={styles.sendMessageBtn}
        onClick={handleSendMessage}
      />
    </section>
  );
};

export default VibeInput;
