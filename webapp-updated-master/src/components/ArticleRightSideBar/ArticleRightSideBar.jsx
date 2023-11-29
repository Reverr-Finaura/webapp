// import React, { useState, useEffect } from "react";
// import './ArticleRightSideBar.css'
// import ArticleDisplay from './ArticleDisplay'
// import { collection, doc, getDocs, query } from "firebase/firestore";
// import { db } from "../../firebase";

// const ArticleRightSideBar = (props) => {

//   const [users, setUsers] = useState([]);
//   const [randomArticles, setrandomArticles] = useState([]);

//   // FETCH USER DATA FROM FIREBASE
//   useEffect(() => {
//     async function fetchUsers() {
//       const mentorsRef = collection(db, "Blogs");
//       const q = query(mentorsRef);
//       const querySnapshot = await getDocs(q);
//       const filteredUsers = querySnapshot.docs
//         .map(doc => doc.data())
//         .filter(docData =>
//           docData.hasOwnProperty("author") &&
//           docData.author.trim() !== "" &&
//           docData.hasOwnProperty("heading") &&
//           docData.heading.trim() !== "" &&
//           docData.hasOwnProperty("imageUrl") &&
//           docData.imageUrl.trim() !== ""
//         );
//       setUsers(filteredUsers);
//     }
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     if (users.length > 0) {
//       const getrandomArticles = () => {
//         let randomArticlesArr = [];
//         let length = users.length - 1;

//         for (let i = 0; i < 4; i++) {
//           let randomIndex = Math.floor(Math.random() * length);
//           let randomElement = users[randomIndex];
//           randomArticlesArr.push(randomElement);
//         }

//         setrandomArticles(randomArticlesArr);
//       };

//       getrandomArticles();
//     }
//   }, [users]);

// console.log(randomArticles);

//   return (
//     <div>

//       { randomArticles && randomArticles.slice(0, 4).map( (news) => {
//           return(
//             <div className='allCards' style={{display:'flex', flexDirection:'row'}}>
//               <ArticleDisplay title={news.heading}/>
//             </div>

//             )

//           }
//         )
//       }

//     </div>
//     // <ArticleDisplay title={props.title}/>

//   )

// }

// export default ArticleRightSideBar

import React, { useState, useEffect } from "react";
import "./ArticleRightSideBar.css";
import ArticleDisplay from "./ArticleDisplay";
import { collection, doc, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
const filters = [
  "Featured",
  "Accounting",
  "Business",
  "Consulting",
  "Gaming",
  "Entrepeneurship",
  "Finance",
  "Healthcare",
];

const ArticleRightSideBar = (props) => {
  const [users, setUsers] = useState([]);
  const [randomArticles, setrandomArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(filters[0]);

  const navigate = useNavigate();
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

        for (let i = 0; i < 5; i++) {
          let randomIndex = Math.floor(Math.random() * length);
          let randomElement = users[randomIndex];
          randomArticlesArr.push(randomElement);
        }

        setrandomArticles(randomArticlesArr);
        console.log(randomArticlesArr);
      };

      getrandomArticles();
    }
  }, [users]);

  const extractImg = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const imgElement = doc.querySelector("img");
    return imgElement ? imgElement.getAttribute("src") : null;
  };
  console.log("random articles", randomArticles);

  return (
    <div className='right-container'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className='articlesFilters'>
            {filters.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setActiveFilter(item)}
                  className={`articleItem ${
                    activeFilter === item ? "activeFilter" : ""
                  }`}
                >
                  {item}
                </div>
              );
            })}
          </div>
          <div className='articlerightsidecontainer'>
            <div
              onClick={() => navigate(`/discover/${randomArticles[0]?.id}`)}
              className='firstarticlebox'
              style={{
                width: "350px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                style={{ height: "200px", width: "300px", padding: "20px" }}
                src={randomArticles[0]?.image.imageUrl}
                alt=''
              />
              <p
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: "25px",
                  fontWeight: "bold",
                  padding: "20px",
                }}
              >
                {randomArticles[0]?.heading}
              </p>
            </div>
            <div className='rightMiniArticles'>
              {randomArticles &&
                randomArticles.slice(1, 4).map((article, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => navigate(`/discover/${article?.id}`)}
                      className='allCards'
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <ArticleDisplay
                        title={article.heading}
                        description={article.body}
                        articleImg={article.image}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ArticleRightSideBar;
