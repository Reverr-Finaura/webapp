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
          doc.data().email !== currentLoggedInUser?.user?.email &&
          (doc.data().hasOwnProperty("network") // Check if "network" array is present in doc.data()
            ? !doc.data().network.includes(currentLoggedInUser?.user?.email) // if present then only check current user's email is not included in it
            : true)
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
      const shuffleArray = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      };
  
      const getRandomUsers = () => {
        const randomUsersArr = users.slice(); // Create a shallow copy of the users array
        shuffleArray(randomUsersArr);
        setRandomUsers(randomUsersArr.slice(0, 8)); // Select the first 8 elements
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
