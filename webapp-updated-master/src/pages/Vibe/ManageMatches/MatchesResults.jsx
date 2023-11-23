import React from "react";
import style from "./matches.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const MatchesResults = ({ data, ismanage, setData }) => {
  const navigate = useNavigate();
  const userDoc = useSelector((state) => state.userDoc);
  const HandleRemoveLikedUser = () => {};

  const HandleRemoveMatchUsers = async (otherUserEmail) => {
    try {
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

        await docRef.update({
          matched_user: matched_users,
        });

        await otherDocRef.update({
          matched_user: other_matched_users,
        });

        const newMatchedUsers = data.filter(
          (user) => user.email !== otherUserEmail
        );
        setData(newMatchedUsers);
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
                src={item.image}
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
                  {/* <span
                    style={{ cursor: "pointer" }}
                    onClick={() => HandleRemoveLikedUser(item?.email)}
                  >
                    x
                  </span> */}
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
