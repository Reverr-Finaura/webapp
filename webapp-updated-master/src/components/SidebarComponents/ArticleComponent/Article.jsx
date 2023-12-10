import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "./Article.module.css";

function Article({ isLoggedIn, openModal }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [randomArticles, setrandomArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const mentorsRef = collection(db, "Blogs");
      const q = query(mentorsRef);
      const querySnapshot = await getDocs(q);
      const filteredUsers = querySnapshot.docs
        // .filter(docData =>
        //   docData.hasOwnProperty("author") &&
        //   docData.author.trim() !== "" &&
        //   docData.hasOwnProperty("heading") &&
        //   docData.heading.trim() !== "" &&
        //   docData.hasOwnProperty("imageUrl") &&
        //   docData.imageUrl.trim() !== ""
        // )
        .map((doc) => doc.data());
      setUsers(filteredUsers);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const getrandomArticles = () => {
        let randomArticlesArr = [];
        let length = users.length - 1;

        for (let i = 0; i < 4; i++) {
          let randomIndex = Math.floor(Math.random() * length);
          let randomElement = users[randomIndex];
          randomArticlesArr.push(randomElement);
        }

        setrandomArticles(randomArticlesArr);
      };

      getrandomArticles();
    }
  }, [users]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>
          <span style={{ color: "#00B3FF" }}>Articles</span>
          <span style={{ color: "#ffffff" }}>&nbsp;for you</span>
        </p>
        <span onClick={() => navigate("/discover")}>View more</span>
      </div>

      {/* <span
          onClick={() => {
            if (!isLoggedIn) {
              return openModal();
            } else {
              //normal code
              navigate("/mentors");
            }
          }}
        >
          See All
        </span> */}

      {loading ? (
        <p style={{ color: "white" }}>Loading...</p>
      ) : (
        randomArticles &&
        randomArticles.slice(0, 3).map((article, index) => (
          <div
            className={styles.card}
            key={index}
            onClick={() => navigate(`/discover/${article.id}`)}
          >
            <img
              src={article.image.imageUrl}
              alt='img'
              className={styles.articleImage}
            />
            <div className={styles.articledetails}>
              <h3 className={styles.articleheading}> {article.heading}</h3>
              <p className={styles.articledesc}>{article.body}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

Article.defaultProps = {
  isLoggedIn: true,
  openModal: () => {},
};

export default Article;
