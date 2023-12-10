import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db, getUserFromDatabase } from "../../../firebase";
import style from "./PostCardDark.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { getUserDocByRef } from "../../../firebase";
import { RiShareForwardLine } from "react-icons/ri";
import { TfiMoreAlt } from "react-icons/tfi";
import { AiOutlineHeart } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { AiFillHeart } from "react-icons/ai";
import eyeIcon from "../../../images/white-outline-eye.webp";
import commentIcon from "../../../images/white-outline-comment.webp";
import rightArrow from "../../../images/right-arraow-bg-blue.webp";
import defaultImg from "../../../images/default-profile-pic.webp";
import ReactTimeAgo from "react-time-ago";
import founder from "../../../images/badges/Founder- badge.png";
import investor from "../../../images/badges/Investor - badge.png";
import mentor from "../../../images/badges/Mentor - badge.png";
import pro from "../../../images/badges/Pofessional - badge.png";

export default function PostCardDark({
  postsData,
  setPostsData,
  item,
  handleEditPostButtonClick,
  isLoggedIn,
  openModal,
  postId,
}) {
  const user = useSelector((state) => state.user);
  const userDoc = useSelector((state) => state.userDoc);
  const [isThreeDotsClicked, setIsThreeDotsClicked] = useState(false);
  const [isCommentThreeDotsClicked, setIsCommentThreeDotsClicked] =
    useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentIconClick, setCommentIconClick] = useState(false);
  const [editCommentButtonIsClick, setEditCommentButtonIsClick] =
    useState(false);
  const [newEdittedComment, setNewEdittedComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [threeDotsClickCommentId, setThreeDotsClickCommentId] = useState(null);
  const [postedByUserDoc, setPostedByUserDoc] = useState({
    notificationList: [],
  });
  const [commentedByUserDoc, setCommentedByUserDoc] = useState([]);
  const [showMorePostTextClick, setShowMorePostTextClick] = useState(false);
  const [newCommentTextAreaClick, setNewCommentTextAreaClick] = useState(false);
  const [postDetail, setPostDetail] = useState();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  // const [postTime, setPostTime] = useState("");
  // const [userType, setUserType] = useState();
  // const [postComments, setPostComments] = useState([]);

  async function fetchPostData() {
    const postRef = doc(db, "Posts", postId); // Replace 'yourDocumentId' with the actual ID of the document you want to retrieve
    try {
      const docSnapshot = await getDoc(postRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setPostDetail(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchPostData();
  }, [postId]);

  // const [userDocPostedBy, setUserDocPostedBy] = useState({});
  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await getUserDocByRef(
  //       item?.postedby?._path?.segments[1]
  //     );
  //     setUserDocPostedBy(data);
  //   };
  //   getData();
  // }, []);

  //CHECK IF POST LIKES CONTAIN USER OR NOT
  const getLikedPostIdFromFirebase = async (id, items) => {
    const isLiked = postDetail.likes.includes(user?.user?.email);
    let newLikeArray;
    if (isLiked) {
      newLikeArray = postDetail.likes.filter(
        (item) => item !== user?.user?.email
      );
    } else {
      newLikeArray = [...postDetail.likes, user?.user?.email];
    }
    postDetail.likes = newLikeArray;
    setPostsData((prevPostsData) => {
      return prevPostsData.map((item) => {
        if (item.id === id) {
          return { ...item, likes: newLikeArray };
        } else {
          return item;
        }
      });
    });
    await updateLikedPostInFirebase(newLikeArray, id);
    setPostsData((prevPostsData) => {
      return prevPostsData.map((item) => {
        if (item.id === id) {
          return { ...item, likes: newLikeArray };
        } else {
          return item;
        }
      });
    });
  };
  const setNotificationDatainFirebase = async (item) => {
    try {
      const userDocumentRef = await doc(db, "Users", postedByUserDoc.email);
      if (postedByUserDoc.email === user?.user?.email) {
        return;
      }
      const notificationData = {
        time: new Date(),
        message: `${user?.user?.email} liked your post`,
        user: user?.user?.email,
        type: "Like-Notification",
        postId: postId,
        id: item.id,
      };
      const userDocSnapshot = await getDoc(userDocumentRef);

      if (userDocSnapshot.exists()) {
        const existingNotifications =
          userDocSnapshot.data().notificationList || [];

        // Check if user is already present in the notificationList user with postID as well
        const userAlreadyNotified = existingNotifications.some(
          (item) => item.user === user?.user?.email && item.postId === postId
        );
        if (!userAlreadyNotified) {
          await updateDoc(userDocumentRef, {
            notificationList: [...existingNotifications, notificationData],
          });
        }
      } else {
        await updateDoc(userDocumentRef, {
          notificationList: [notificationData],
        });
      }
      return;
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateLikedPostInFirebase = async (data, id) => {
    const userDocumentRef = doc(db, "Posts", postId);
    try {
      await updateDoc(userDocumentRef, { likes: data });
      await fetchPostData();
      return;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNewCommentonPost = async (item, id) => {
    const userRef = doc(db, "Users", user?.user?.email);
    let newCommentArray;
    if (newComment === "") {
      toast("Nothing to Comment");
      return;
    }
    newCommentArray = postDetail.comments.concat([
      {
        comment: newComment,
        commentedby: userRef,
        commentid: new Date().getTime(),
      },
    ]);

    getUserDocByRef(userRef).then((userData) => {
      setCommentedByUserDoc((prev) => [...prev, userData]);
    });
    postDetail.comments = newCommentArray;
    setPostsData(
      postsData.map((item) => {
        if (item.id === id) {
          return { ...item, comments: newCommentArray };
        } else return item;
      })
    );
    updateCommentInFirebase(newCommentArray, id);
    setPostsData(
      postsData.map((item) => {
        if (item.id === id) {
          return { ...item, comments: newCommentArray };
        } else return item;
      })
    );
    setNewComment("");
    setNewCommentTextAreaClick(false);
  };

  const setCommentNotificationDatainFirebase = async (item) => {
    try {
      if (postedByUserDoc.email === user?.user?.email) {
        return;
      }
      const userDocumentRef = await doc(db, "Users", postedByUserDoc.email);
      const notificationData = {
        time: new Date(),
        message: `${user?.user?.email} Commented on your post`,
        user: user?.user?.email,
        type: "Comment-Notification",
        postId: postId,
        id: item.id,
      };
      const userDocSnapshot = await getDoc(userDocumentRef);

      if (userDocSnapshot.exists()) {
        const existingNotifications =
          userDocSnapshot.data().notificationList || [];

        // Check if user is already present in the notificationList user with postID as well
        // const userAlreadyNotified = existingNotifications.some(
        //   (item) =>
        //     item.user === user?.user?.email &&
        //     item.postId === postId &&
        //     item.type === "Comment-Notification"
        // );
        await updateDoc(userDocumentRef, {
          notificationList: [...existingNotifications, notificationData],
        });
      }
      return;
    } catch (error) {
      console.log(error.message);
    }
  };

  //UPDATE NEWCOMMENT IN FIREBASE
  const updateCommentInFirebase = async (data, id) => {
    const userDocumentRef = doc(db, "Posts", id);

    try {
      await updateDoc(userDocumentRef, { comments: data });
      toast("Successfully Commented");
      fetchPostData();

      setNewComment("");
    } catch (error) {
      console.log(error.message);
    }
  };

  //HANDLE EDIT COMMENT BUTTON CLICK

  const handleEditCommentClick = (commentId, comment) => {
    setEditCommentButtonIsClick(true);
    setNewEdittedComment(comment.comment);
    setEditCommentId(commentId);
  };

  const handleEditCommentonPost = (item, itemId) => {
    let newEditCommentArray;

    if (newEdittedComment === "") {
      toast("Nothing To Edit");
      return;
    }

    newEditCommentArray = postDetail.comments.map((event) => {
      if (event.commentid === editCommentId) {
        return { ...event, comment: newEdittedComment };
      } else return event;
    });
    setPostsData(
      postsData.map((item) => {
        if (item.id === itemId) {
          return { ...item, comments: newEditCommentArray };
        } else return item;
      })
    );
    setNewCommentTextAreaClick(false);
    updateEdittedCommentInFirebase(newEditCommentArray, itemId);
  };

  //UPDATE NEWEDIITEDCOMMENT IN FIREBASE
  const updateEdittedCommentInFirebase = async (data, id) => {
    const userDocumentRef = doc(db, "Posts", id);

    try {
      await updateDoc(userDocumentRef, { comments: data });
      toast("Successfully Edited");
      fetchPostData();
      setEditCommentButtonIsClick(false);
      setNewEdittedComment("");
      setNewComment("");
      setEditCommentId(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  // HANDLE DELETE POST BUTTON CLICK
  const handleDeletePostButtonClick = async (itemId) => {
    toast("Processing Your Request");
    setIsThreeDotsClicked(false);
    const postsRef = doc(db, "Posts", itemId);
    await deleteDoc(postsRef);

    const newPostIdArray = userDoc.posts.filter((item) => {
      return item !== itemId;
    });

    updateUserDatabaseAgain(newPostIdArray);
  };

  //UPDATE USER DATABSE IN FIREBASE

  const updateUserDatabaseAgain = async (id) => {
    const userDocumentRef = doc(db, "Users", user?.user?.email);

    try {
      await updateDoc(userDocumentRef, { posts: id });

      toast("Deleted Post");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error.message);
    }
  };

  //DELETE COMMENT ON POST CLICK

  const handleDeleteCommentClick = (commentId, item, itemId) => {
    const newCommentArray = postDetail.comments.filter((event) => {
      return event.commentid !== commentId;
    });
    postDetail.comments = newCommentArray;

    setPostsData(
      postsData.map((item) => {
        if (item.id === itemId) {
          return { ...item, comments: newCommentArray };
        } else return item;
      })
    );
    updateDeleteCommentInFirebase(newCommentArray, itemId);
  };

  //UPDATE DELTECOMMENT IN FIREBASE
  const updateDeleteCommentInFirebase = async (data, id) => {
    const userDocumentRef = doc(db, "Posts", id);

    try {
      await updateDoc(userDocumentRef, { comments: data });
      toast("Successfully Deleted");
      fetchPostData();
    } catch (error) {
      console.log(error.message);
    }
  };

  //GET USER DATA FROM REFERENCE LINK WHO HAS POSTED

  // useEffect(() => {
  //   if (item.postedby._path.segments) {
  //     getUserFromDatabase(
  //       item?.postedby?._path?.segments[item.postedby._path.segments.length - 1]
  //     ).then((res) => {
  //       setPostedByUserDoc((prev) => {
  //         return {
  //           ...prev,
  //           ...res,
  //           notificationList: res?.notificationList
  //             ? [...prev?.notificationList, ...res?.notificationList]
  //             : prev?.notificationList,
  //         };
  //       });
  //     });
  //     return;
  //   } else {
  //     getUserDocByRef(item?.postedby).then((res) => {
  //       setPostedByUserDoc((prev) => {
  //         return {
  //           ...prev,
  //           ...res,
  //           notificationList: res?.notificationList
  //             ? [...prev?.notificationList, ...res?.notificationList]
  //             : prev?.notificationList,
  //         };
  //       });
  //     });
  //     return;
  //   }
  // }, [item]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let userDoc;
        if (item.postedby._path.segments) {
          userDoc = await getUserFromDatabase(
            item?.postedby?._path?.segments[
              item.postedby._path.segments.length - 1
            ]
          );
        } else {
          userDoc = await getUserDocByRef(item?.postedby);
        }
        setPostedByUserDoc((prev) => ({
          ...prev,
          ...userDoc,
          notificationList: userDoc?.notificationList
            ? [...prev?.notificationList, ...userDoc?.notificationList]
            : prev?.notificationList,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (item) {
      fetchData();
    }
  }, [item]);

  // useEffect(() => {
  //   if (userDoc) {
  //     // getUserDocByRef(item?.postedby?._path?.segments[1]).then((res) => {
  //     getUserFromDatabase(item?.postedby?._path?.segments[1]).then((res) => {
  //       setPostedByUserDoc((prev) => {
  //         return {
  //           ...prev,
  //           ...res,
  //           notificationList: res?.notificationList
  //             ? [...prev?.notificationList, ...res?.notificationList]
  //             : prev?.notificationList,
  //         };
  //       });
  //     });
  //   }
  // }, [userDoc]);

  //GET USER DATA FROM REFERENCE LINK WHO HAS COMMENTED

  useEffect(() => {
    item.comments.map(async (event) => {
      try {
        const res = await getUserDocByRef(event?.commentedby);
        setCommentedByUserDoc((prev) => {
          return [...prev, res];
        });
      } catch (error) {
        console.log("Error fetching user document:", error);
      }
    });
  }, [item]);

  // useEffect(() => {
  //   const fetchCommentedUserDocs = async () => {
  //     const userDocPromises = item.comments.map(async (event) => {
  //       try {
  //         const res = await getUserDocByRef(event?.commentedby);
  //         return res;
  //       } catch (error) {
  //         console.log("Error fetching user document:", error);
  //         return null;
  //       }
  //     });
  //     const userDocs = (await Promise.all(userDocPromises)).filter(
  //       (doc) => doc
  //     );
  //     setCommentedByUserDoc(userDocs);
  //   };

  //   fetchCommentedUserDocs();
  // }, [item]);

  // for video play and pause
  const handlePlayVideo = () => {
    const videoElement = document.getElementById("videoPlayer");
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  // HANDLE POST SEND CLICK

  const handleSendPostLinkClick = (id) => {
    var tempUrl = window.location.href;
    var url = `${tempUrl}/${id}`;
    navigator.clipboard.writeText(url).then(
      function () {
        toast("Link Copied To ClipBoard");
      },
      function (err) {
        // console.error("Could not copy text: ", err);
      }
    );
  };

  // handleRepostPost
  function handleReportPost() {
    toast("Post Reported");
  }
  // fetching the post user type
  useEffect(() => {});

  //GET TIME OF POST
  // useEffect(() => {
  //   setPostTime(new Date(item?.createdAt.seconds * 1000));
  // }, [item]);

  return (
    <>
      <section className={style.PostCardContainer} id={item.id}>
        <div
          style={{ alignItems: "center" }}
          className={style.postAuthorDetails}
        >
          <img
            onClick={() => {
              if (!isLoggedIn) {
                return openModal();
              } else {
                if (postedByUserDoc?.email === user?.user?.email) {
                  navigate("/userprofile");
                } else if (!postedByUserDoc?.email) {
                  return console.log("empty");
                } else {
                  navigate(`/userprofile/${postedByUserDoc?.email}`);
                }
              }
            }}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginRight: "1rem",
              objectFit: "cover",
            }}
            src={postedByUserDoc?.image ? postedByUserDoc?.image : defaultImg}
            alt=''
          />
          <div className={style.postAuthorNameAndDesignationCont}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <h3
                onClick={() => {
                  if (!isLoggedIn) {
                    return openModal();
                  } else {
                    // setPostsAuthorIsClick(true);
                    // setPostsAuthorInfo(postedByUserDoc);
                    if (postedByUserDoc?.email === user?.user?.email) {
                      navigate("/userprofile");
                    } else if (!postedByUserDoc?.email) {
                      return console.log("empty");
                    } else {
                      navigate(`/userprofile/${postedByUserDoc?.email}`);
                    }
                  }
                }}
                className={style.postAuthorName}
              >
                {postedByUserDoc?.name ? postedByUserDoc?.name : " "}
                {/* {userDocPostedBy?.name ? userDocPostedBy?.name : " "} */}
              </h3>
              <div className='postAuthorType'>
                {postedByUserDoc &&
                  (() => {
                    switch (postedByUserDoc?.userType) {
                      case "founder":
                        return (
                          // <div className={style.founder}>
                          <img className={style.typeImg} src={founder} alt='' />
                          // Founder
                          // </div>
                        );
                      case "mentor":
                        return (
                          // <div className={style.mentor}>
                          <img className={style.typeImg} src={mentor} alt='' />
                          // Mentor
                          // </div>
                        );
                      case "investor":
                        return (
                          // <div className={style.investor}>
                          <img
                            className={style.typeImg}
                            src={investor}
                            alt=''
                          />
                          // Investor
                          // </div>
                        );
                      case "professionals":
                        return (
                          // <div className={style.professional}>
                          <img className={style.typeImg} src={pro} alt='' />
                          // Professional
                          // </div>
                        );
                      default:
                        return null;
                    }
                  })()}
              </div>
            </div>

            <p className={style.postAuthorDesignation}>
              {postedByUserDoc?.designation ? postedByUserDoc?.designation : ""}
            </p>
          </div>

          <div className={style.postUploadDateContainer}>
            {item?.createdAt?._seconds ? (
              <ReactTimeAgo
                className={style.timeSpan}
                date={
                  item.createdAt._seconds * 1000 +
                  item.createdAt._nanoseconds / 1e6
                }
                locale='en-US'
              />
            ) : (
              <ReactTimeAgo
                className={style.timeSpan}
                date={item?.createdAt.toDate()}
                locale='en-US'
              />
            )}

            {/* MORE OPTION CONT */}
            <div className={style.threeDotsMainCont}>
              <div className={style.threeDotsContainer}>
                <div style={{ display: "flex", transform: "rotate(90deg)" }}>
                  <TfiMoreAlt
                    onClick={() => {
                      if (!isLoggedIn) {
                        return openModal();
                      } else {
                        setIsThreeDotsClicked((current) => !current);
                      }
                    }}
                    className={style.threeDotsPost}
                  />
                </div>

                {isThreeDotsClicked ? (
                  <div
                    className={
                      user?.user?.email === postedByUserDoc.email
                        ? style.threeDotsOptions
                        : style.standardThreeDotsOption
                    }
                  >
                    {user?.user?.email === postedByUserDoc.email ? (
                      <div
                        style={{
                          textDecoration: "none",
                          margin: "auto",
                        }}
                      >
                        <div
                          onClick={() => {
                            handleEditPostButtonClick(item, item.id);
                            setIsThreeDotsClicked(false);
                          }}
                          className={style.threeDotsEditPostOption}
                        >
                          Edit Post
                        </div>
                      </div>
                    ) : null}

                    {user?.user?.email === postedByUserDoc.email ? (
                      <div
                        onClick={() => handleDeletePostButtonClick(item.id)}
                        className={style.threeDotsDeletePostOption}
                      >
                        Delete Post
                      </div>
                    ) : null}
                    {user?.user?.email !== postedByUserDoc.email ? (
                      <div
                        onClick={() => handleReportPost()}
                        className={style.threeDotsReportPostOption}
                      >
                        Report Post
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className={style.postDivideLine_community}></div>
        <div className={style.postTextContainer}>
          {Array.isArray(item.text) ? (
            item?.text.length > 3 ? (
              <h3 className={style.postText}>
                {showMorePostTextClick ? (
                  <>
                    {item?.text.map((textItem, index) => (
                      <div key={index}>{textItem}</div>
                    ))}
                    <span
                      style={{ color: "#00b2ff", cursor: "pointer" }}
                      onClick={() => setShowMorePostTextClick(false)}
                      className={style.morePostTextButto}
                    >
                      ...show less
                    </span>{" "}
                  </>
                ) : (
                  // Display the first three strings in item.text with "continue" link
                  <>
                    {item?.text.slice(0, 3).map((textItem, index) => (
                      <div key={index}>{textItem}</div>
                    ))}
                    <span
                      style={{ color: "#00b2ff", cursor: "pointer" }}
                      onClick={() => setShowMorePostTextClick(true)}
                      className={style.morePostTextButto}
                    >
                      ...continue
                    </span>{" "}
                  </>
                )}
              </h3>
            ) : (
              <h3 className={style.postText}>
                {item?.text.map((textItem, index) => (
                  <div key={index}>{textItem}</div>
                ))}
              </h3>
            )
          ) : (
            <h3 className={style.postText}>{item?.text}</h3>
          )}
        </div>
        {item?.image ? (
          <div className='postImageContainer' style={{ width: "100%" }}>
            <img
              className='postImage'
              style={{ width: "100%" }}
              src={item?.image}
              alt='postImage'
            />
          </div>
        ) : null}
        {item?.video ? (
          <div className='postImageContainer' style={{ width: "100%" }}>
            <video
              //  id="videoPlayer"
              id='my-video'
              style={{ aspectRatio: "7/3", width: "100%", height: "49em" }}
              src={item?.video}
              alt='postVideo'
              muted='muted'
              autoplay='autoplay'
              className='video-js'
              controls
              preload='auto'
              width='640'
              height='264'
              poster='MY_VIDEO_POSTER.jpg'
              data-setup='{}'
            ></video>
            {/* <button onClick={handlePlayVideo} className="playButton">
              {isPlaying ? "Pause" : "Play"}
            </button> */}
          </div>
        ) : null}

        <div className={style.postDivideLine_community}></div>
        <div className={style.postLikesAndCommentContainer}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100 %",
              justifyContent: "space-evenly",
            }}
          >
            <div
              onClick={() => {
                getLikedPostIdFromFirebase(item.id, item);
                setNotificationDatainFirebase(item);
              }}
              className={style.postLikesContainer}
            >
              <div className={style.postLikesContainerLikeIcon}>
                {postDetail?.likes.includes(user?.user?.email) ? (
                  <AiFillHeart className={style.postLikesContainerLikedIconn} />
                ) : (
                  <AiOutlineHeart
                    className={style.postLikesContainerLikeIconn}
                  />
                )}
              </div>

              <h3 style={{ cursor: "pointer" }} className={style.postLikeCount}>
                {postDetail?.likes.length}{" "}
                <span className={style.postIconsText}>Like</span>
              </h3>
            </div>

            <div
              className={style.postCommentContainer}
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (!isLoggedIn) {
                  return openModal();
                } else {
                  setCommentIconClick((current) => !current);
                }
              }}
            >
              <div className={style.commentContainer}>
                <img
                  src={commentIcon}
                  alt='img'
                  className={style.commentPostIconn}
                />
              </div>
              <h3 className={style.postCommentCount}>
                {postDetail?.comments.length}{" "}
                <span className={style.postIconsText}>Comment</span>
              </h3>
            </div>

            <div
              onClick={() => {
                if (!isLoggedIn) {
                  return openModal();
                } else {
                  handleSendPostLinkClick(item.id);
                }
              }}
              className={style.postSendLinkContainer}
            >
              <div className={style.postSendCont}>
                <div className={style.postSendIcon}>
                  <RiShareForwardLine style={{ fontSize: "1.8rem" }} />
                </div>
                <h3
                  style={{ cursor: "pointer" }}
                  className={style.postCommentCount}
                >
                  {" "}
                  <span className={style.postIconsText}>Share</span>
                </h3>
              </div>
            </div>

            <div className={style.postCommentContainer}>
              <div className={style.commentContainer}>
                <img src={eyeIcon} alt='' />
              </div>
              <h3 className={style.postCommentCount}>
                {item?.comments.length + item.likes.length + 2}{" "}
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className={style.newCommentOnPostSection}>
        {editCommentButtonIsClick ? (
          <section className={style.uploadPostContainerrrrSection}>
            <div className={style.newCommentContainerrrr}>
              <img
                className='community-newComment-cont-userImage'
                src={
                  userDoc?.image
                    ? userDoc.image
                    : "https://media.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif"
                }
                alt='userImage'
              />
              <div className={style.textAreaUploadContainer}>
                <textarea
                  autoFocus
                  onChange={(e) => setNewEdittedComment(e.target.value)}
                  name={style.newEditComment}
                  id={style.postCommentContainerExpanded}
                  rows='3'
                  placeholder='Share Your Thoughts'
                  value={newEdittedComment}
                ></textarea>
                <div
                  className={`${style.addImageandUploadPostIcon} ${style.newCommentAddImageAndUpload}`}
                >
                  <button
                    onClick={() => handleEditCommentonPost(item, item.id)}
                    className={`${style.newCommentAddImageAndUpload} ${style.uploadPostIconButton}`}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section
            style={{ display: commentIconClick ? "" : "none" }}
            className={style.uploadPostContainerrrrSection}
          >
            <div className={style.newCommentContainerrrr}>
              <img
                className={style.communityNewCommentContUserImage}
                src={
                  userDoc?.image
                    ? userDoc.image
                    : "https://media.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif"
                }
                alt='userImage'
              />
              <div
                style={{ position: "relative", width: "85%" }}
                className={style.textAreaUploadContainer}
              >
                <GrAddCircle
                  onClick={() =>
                    setNewCommentTextAreaClick((current) => !current)
                  }
                  className={
                    newCommentTextAreaClick
                      ? style.expandTextAreaIconExpanded
                      : style.expandTextAreaIcon
                  }
                />
                <textarea
                  autoFocus
                  className={item?.id}
                  onClick={() => {
                    setNewCommentTextAreaClick(true);
                  }}
                  onChange={(e) => setNewComment(e.target.value)}
                  name='newComment'
                  id={
                    newCommentTextAreaClick
                      ? style.postCommentContainerExpanded
                      : style.postCommentContainer
                  }
                  rows='3'
                  placeholder='Share Your Thoughts'
                  value={newComment}
                ></textarea>
                {newCommentTextAreaClick ? (
                  <img
                    onClick={() => {
                      handleNewCommentonPost(item, item.id);
                      setCommentNotificationDatainFirebase(item);
                    }}
                    className={style.rightArrowImg}
                    src={rightArrow}
                    alt='rightArrow'
                  />
                ) : null}

                <img
                  onClick={() => {
                    handleNewCommentonPost(item, item.id);
                    setCommentNotificationDatainFirebase(item);
                  }}
                  className={style.rightArrowImg}
                  src={rightArrow}
                  alt='rightArrow'
                />
              </div>
            </div>
          </section>
        )}

        {/* OLD COMMENT SECTION */}
        {commentIconClick ? (
          <section
            className={
              postDetail?.comments.length !== 0
                ? style.oldCommentSection
                : style.oldCommentSectionNothing
            }
          >
            {postDetail?.comments?.map((list, index) => {
              return (
                <React.Fragment key={index}>
                  <div className='commentedByAndComment'>
                    <div className='commented-by-and-edit-cont'>
                      <img
                        className='commentedUserImage'
                        src={
                          commentedByUserDoc?.filter((it) => {
                            return it.email === list?.commentedby?.id;
                          })[0]?.image
                            ? // The ternary operator starts here
                              commentedByUserDoc?.filter((it) => {
                                return it.email === list?.commentedby?.id;
                              })[0]?.image
                            : defaultImg
                        }
                        alt='CommentedUserPhoto'
                      />
                      <p className='commented-by'>
                        {
                          commentedByUserDoc?.filter((it) => {
                            return it.email === list?.commentedby?.id;
                          })[0]?.name
                        }
                      </p>

                      {list?.commentedby?.id === user?.user?.email ? (
                        <TfiMoreAlt
                          className='threeDotsPost commentThreeDotsPost'
                          onClick={() => {
                            setIsCommentThreeDotsClicked((current) => !current);
                            setThreeDotsClickCommentId(list?.commentid);
                          }}
                        />
                      ) : null}
                      {/* <img onClick={()=>{setIsCommentThreeDotsClicked(current=>!current);setThreeDotsClickCommentId(list?.commentid)}} className='threeDotsPost commentThreeDotsPost' src="./images/dots.png" alt="3dots" /> */}

                      {isCommentThreeDotsClicked &&
                      list?.commentedby?.id === user?.user?.email &&
                      threeDotsClickCommentId === list?.commentid ? (
                        <>
                          <div className='threeDotsOptions commentThreeDotsOption'>
                            <a
                              style={{
                                textDecoration: "none",
                                color: "black",
                                margin: "auto",
                                color: "#fff",
                              }}
                            >
                              <div
                                onClick={() => {
                                  handleEditCommentClick(list.commentid, list);
                                  setIsCommentThreeDotsClicked(false);
                                }}
                                className='threeDotsEditPostOption'
                              >
                                Edit
                              </div>
                            </a>

                            <div
                              onClick={() =>
                                handleDeleteCommentClick(
                                  list.commentid,
                                  item,
                                  item.id
                                )
                              }
                              className='threeDotsDeletePostOption'
                            >
                              Delete
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                    <p className='commented-by-comment'>{list.comment}</p>
                  </div>
                </React.Fragment>
              );
            })}
          </section>
        ) : null}
      </section>
    </>
  );
}

PostCardDark.defaultProps = {
  isLoggedIn: true,
  openModal: () => {},
};
