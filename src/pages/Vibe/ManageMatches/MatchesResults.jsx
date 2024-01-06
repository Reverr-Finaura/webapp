import React from "react";
import style from "./matches.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, deleteMatchedInMessagesDoc } from "../../../firebase";

const MatchesResults = ({
  data,
  ismanage,
  setData,
  updateUserVibeChat,
  setUpdateUserVibeChat,
}) => {
  const navigate = useNavigate();
  const userDoc = useSelector((state) => state.userDoc);

  const HandleRemoveLikedUser = async (otherUserEmail) => {
    try {
      const otherDocRef = doc(db, "Users", otherUserEmail);
      const docRef = doc(db, "Users", userDoc?.email);
      const docSnap = await getDoc(docRef);
      const otherDocSnap = await getDoc(otherDocRef);

      if (docSnap.exists() && otherDocSnap.exists()) {
        let userLikedBy = docSnap.data().liked_by || [];
        let otherLike = otherDocSnap.data().likes || [];
        userLikedBy = userLikedBy.filter((user) => user !== otherUserEmail);
        otherLike = otherLike.filter((user) => user !== userDoc?.email);
        await updateDoc(docRef, { liked_by: userLikedBy });
        await updateDoc(otherDocRef, { likes: otherLike });
        const newMatchedUsers = data.filter(
          (user) => user.email !== otherUserEmail
        );
        setData(newMatchedUsers);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const HandleRemoveMatchUsers = async (otherUserEmail) => {
    try {
      console.log("inside handleRemoveMatch");
      const otherDocRef = doc(db, "Users", otherUserEmail);
      const docRef = doc(db, "Users", userDoc?.email);
      const docSnap = await getDoc(docRef);
      const otherDocSnap = await getDoc(otherDocRef);

      if (docSnap.exists() && otherDocSnap.exists()) {
        let matched_users = docSnap.data().matched_user || [];
        let other_matched_users = otherDocSnap.data().matched_user || [];

        matched_users = matched_users.filter((user) => user !== otherUserEmail);
        other_matched_users = other_matched_users.filter(
          (user) => user !== userDoc?.email
        );
        await updateDoc(docRef, { matched_user: matched_users });
        await updateDoc(otherDocRef, { matched_user: other_matched_users });
        await deleteMatchedInMessagesDoc(userDoc?.email, otherUserEmail);
        const newMatchedUsers = data.filter(
          (user) => user.email !== otherUserEmail
        );
        setData(newMatchedUsers);
        setUpdateUserVibeChat(true);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  return (
    <div className={style.matchesreusultmiddlecontainer}>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <div className={style.matchesresultinnercontainer}>
            <div className={style.singlematchresultcontainer}>
              <img
                style={{ width: "35px", height: "35px", borderRadius: "50%" }}
                src={
                  item.image ||
                  "/static/media/default-profile-pic.3ad98a37176f047b65bd.png"
                }
                alt='img'
              />
              <div
                onClick={() => {
                  navigate(`/userprofile/${item.email}`);
                }}
                style={{ cursor: "pointer" }}
              >
                <p>{item.name}</p>
                <p style={{ fontSize: "15px", color: "#A7A7A7" }}>
                  {item.designation}
                </p>
              </div>
            </div>

            <div className={style.buttonContainer}>
              {ismanage ? (
                <button
                  style={{
                    background: "none",
                    border: "2px solid #00B3FF",
                    color: "#00B3FF",
                    cursor: "pointer",
                  }}
                  onClick={() => HandleRemoveMatchUsers(item?.email)}
                >
                  Remove
                </button>
              ) : (
                <div>
                  <button
                    onClick={() => {
                      navigate(`/userprofile/${item?.email}`);
                    }}
                  >
                    View Profile
                  </button>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => HandleRemoveLikedUser(item?.email)}
                  >
                    x
                  </span>
                </div>
              )}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default MatchesResults;