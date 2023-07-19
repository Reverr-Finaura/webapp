import React, { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "./FeaturedSuggestions.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function FeaturedSuggestions({ isLoggedIn, openModal }) {
  const currentLoggedInUser = useSelector((state) => state.user)
  const [users, setUsers] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);
  const navigate = useNavigate()

  //FETCH USER DATA FROM FIREBASE
  useEffect(() => {
    async function fetchUsers() {
      const mentorsRef = collection(db, "Users");
      const q = query(mentorsRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (
          doc.data().hasOwnProperty("name") &&
          doc.data().name !== "" &&
          doc.data().hasOwnProperty("image") &&
          doc.data().image !== "" &&
          doc.data().hasOwnProperty("email") &&
          doc.data().email !== currentLoggedInUser?.user?.email
        ) {
          setUsers((prev) => {
            return [...prev, doc.data()];
          });
        }
      });
    }
    fetchUsers();
  }, [currentLoggedInUser]);

  useEffect(() => {
    if (users.length > 0) {
      const getRandomUsers = () => {
        let randomUsersArr = [];
        let length = users.length - 1;
        let targetCount = 8;
        let uniqueCount = 0;
        
        while (uniqueCount < targetCount) {
          let randomIndex = Math.floor(Math.random() * length);
          let randomElement = users[randomIndex];
        
          // Check if the randomElement is already in the randomUsers array
          if (!randomUsersArr.includes(randomElement)) {
            randomUsersArr.push(randomElement);
            uniqueCount++;
          }
        }
        setRandomUsers(randomUsersArr);
      };

      getRandomUsers();
    }
  }, [users]);

  return (
    <div className={styles.container} style={{ marginBottom: "3.2em" }}>
      <div className={styles.header}>
        <p>
          <span style={{ color: "#ffffff" }}>Featured</span>
          <span style={{ color: "#00B3FF" }}>&nbsp;Suggestions</span>
        </p>
        <span
          onClick={() => {
            if (!isLoggedIn) {
              return openModal();
            } else {
              console.log("user logged!");
            }
          }}
        >
          See All
        </span>
      </div>
      <div className={styles.cardContainer}>
        {randomUsers.map((user, index) => (
          <div className={styles.card}>
            <div className={styles.userRow} key={index}>
              <div>
                <img
                  src={
                    user?.image
                      ? user.image
                      : require("../../../images/userIcon.png")
                  }
                  alt="Profile"
                />
                <div>
                  <text
                    style={{
                      fontSize: 14,
                      color: "#ffffff",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user?.name}
                  </text>
                  <text
                    style={{
                      fontSize: 10,
                      color: "#A7A7A7",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user?.designation}
                  </text>
                </div>
              </div>
              <span
                onClick={() => {
                  if (!isLoggedIn) {
                    return openModal();
                  } else {
                    console.log("user logged!");
                  }
                }}
              >
                X
              </span>
            </div>
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  return openModal();
                } else {
                  {
                    // user?.userType === "Mentor" ? navigate(`/mentorprofile/${user?.email}`) 
                    // :
                    navigate(`/userprofile/${user?.email}`)

                  }
                }
              }}
            >
             Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

FeaturedSuggestions.defaultProps = {
  isLoggedIn: true,
  openModal: () => {},
};

export default FeaturedSuggestions;
