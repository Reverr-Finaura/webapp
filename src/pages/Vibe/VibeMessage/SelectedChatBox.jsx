import React, { useEffect, useRef } from "react";
import profileimg from "../../../images/MentorProfileCard.webp";
import style from "./VibeMessageMain.module.css";
import { useSelector } from "react-redux";

const data = [
  { img: profileimg, msg: "hello", type: "you" },
  { img: profileimg, msg: "hi" },
];

const SelectedChatBox = () => {
  const chatData = useSelector((state) => state.vibeChat);
  const currentcUser = useSelector((state) => state.userDoc);
  const ref = useRef();
  console.log("ref", ref);
  console.log("chatData", chatData);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    // ref.current?.scrollIntoView({ behavior: "smooth" });
    // ref.current.scrollTo({
    //   top: ref?.current?.scrollHeight,
    //   behavior: "smooth",
    // });
  }, [chatData]);
  return (
    // <section ref={ref}>
    //   {chatData.selectedUserData.map((chat, key) => (
    //     <div
    //       key={key}
    //       style={{
    //         padding: "20px",
    //         display: "flex",
    //         flexDirection:
    //           chat.sendBy === currentcUser.email ? "row-reverse" : "",
    //         width: "100%",
    //         justifyContent:
    //           chat.sendBy === currentcUser.email ? "end" : "start",
    //       }}
    //     >
    //       <img
    //         style={{
    //           width: "30px",
    //           height: "30px",
    //           borderRadius: "15px",
    //           marginTop: "5px",
    //         }}
    //         src={
    //           chat.sendBy === currentcUser.email
    //             ? currentcUser.image
    //             : chatData.selectedUser.userImg
    //         }
    //         alt=''
    //       />
    //       <p
    //         style={{
    //           background:
    //             chat.sendBy === currentcUser.email ? "#00B3FF " : "#030B18",
    //           padding: "10px",
    //           marginRight: "4px",
    //           marginLeft: "4px",
    //           cursor: "default",
    //           borderRadius:
    //             chat.sendBy === currentcUser.email
    //               ? "16px 16px 4px 16px"
    //               : "16px 16px 16px 4px",
    //         }}
    //       >
    //         {chat.msg}
    //       </p>
    //     </div>
    //   ))}
    // </section>
    <section ref={ref}>
      {chatData.selectedUserData.map(
        (chat, key) =>
          chat.msg && (
            <div
              key={key}
              style={{
                padding: "20px",
                display: "flex",
                flexDirection:
                  chat.sendBy === currentcUser.email ? "row-reverse" : "",
                width: "100%",
                justifyContent:
                  chat.sendBy === currentcUser.email ? "end" : "start",
              }}
            >
              <img
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "15px",
                  marginTop: "5px",
                }}
                src={
                  chat.sendBy === currentcUser.email
                    ? currentcUser.image
                    : chatData.selectedUser.userImg
                }
                alt=''
              />
              <p
                style={{
                  background:
                    chat.sendBy === currentcUser.email ? "#00B3FF " : "#030B18",
                  padding: "10px",
                  marginRight: "4px",
                  marginLeft: "4px",
                  cursor: "default",
                  borderRadius:
                    chat.sendBy === currentcUser.email
                      ? "16px 16px 4px 16px"
                      : "16px 16px 16px 4px",
                }}
              >
                {chat.msg}
              </p>
            </div>
          )
      )}
    </section>
  );
};

export default SelectedChatBox;
