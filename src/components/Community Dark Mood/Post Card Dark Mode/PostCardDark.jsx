import { deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../../firebase";
import style from "./PostCardDark.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { getUserDocByRef } from "../../../firebase";
import LikeIcon from "../../Like And Liked Icon/LikeIcon";
import LikedIcon from "../../Like And Liked Icon/LikeIcon";
// import commentIcon from "../../images/postCommentIcon.png";
import { FaComments, FaRegCommentDots, FaBullseye } from "react-icons/fa";
import { RiShareForwardFill, RiShareForwardLine } from "react-icons/ri";
import { TfiMoreAlt } from "react-icons/tfi";
import { AiOutlineHeart, AiTwotoneLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
import { BiCommentDots } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import eyeIcon from "../../../images/white-outline-eye.png";
import commentIcon from "../../../images/white-outline-comment.png";
import rightArrow from "../../../images/right-arraow-bg-blue.png";

export default function PostCardDark({
  postsData,
  setPostsData,
  item,
  handleEditPostButtonClick,
  setPostsAuthorIsClick,
  setPostsAuthorInfo,
  isLoggedIn,
  openModal,
  postId,
}) {
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
  const user = useSelector((state) => state.user);

  const [postedByUserDoc, setPostedByUserDoc] = useState({});

  const [commentedByUserDoc, setCommentedByUserDoc] = useState([]);
  const [showMorePostTextClick, setShowMorePostTextClick] = useState(false);
  const [newCommentTextAreaClick, setNewCommentTextAreaClick] = useState(false);
  const [postTime, setPostTime] = useState("");
  const [postComments, setPostComments] = useState([]);
  const [postDetail, setPostDetail] = useState();

  // get the posts comments
  async function fetchPostData() {
    const postRef = doc(db, "Posts", postId); // Replace 'yourDocumentId' with the actual ID of the document you want to retrieve
    const docSnapshot = await getDoc(postRef);

    if (docSnapshot.exists()) {
      // Document exists, you can access its data using docSnapshot.data()
      const data = docSnapshot.data();
      setPostComments(data.comments);
      setPostDetail(data);
      
    } else {
      // Document doesn't exist
      console.log("Document not found.");
    }
  }

  useEffect(() => {
    fetchPostData();
  }, []);

  //CHECK IF POST LIKES CONTAIN USER OR NOT
  const getLikedPostIdFromFirebase = async (id, items) => {
    const isLiked = postDetail.likes.includes(user?.user?.email);
    let newLikeArray;

    if (isLiked) {
     
      newLikeArray = postDetail.likes.filter((item) => item !== user?.user?.email);
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
  
  };

  //UPDATE POST LIKE PART DATABASE
  const updateLikedPostInFirebase = async (data, id) => {
    const userDocumentRef = doc(db, "Posts", postId);

    try {
      await updateDoc(userDocumentRef, { likes: data });

      await fetchPostData()

      return;
    } catch (error) {
      console.log(error.message);
    }
  };

  //HANDLE NEW COMMENT ON POST

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

    postDetail.comments = newCommentArray
    // console.log("this is the list of updated comment ",newCommentArray)
    setPostsData(
      postsData.map((item) => {
        if (item.id === id) {
          return { ...item, comments: newCommentArray };
        } else return item;
      })
    );
    updateCommentInFirebase(newCommentArray, id);
    // fetchPostData()
    setNewComment("");
    setNewCommentTextAreaClick(false);
  };

  //UPDATE NEWCOMMENT IN FIREBASE
  const updateCommentInFirebase = async (data, id) => {
    const userDocumentRef = doc(db, "Posts", id);

    try {
      await updateDoc(userDocumentRef, { comments: data });
      toast("Sucessfully Commented");
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
      toast("Sucessfully Editted");
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
    postDetail.comments = newCommentArray

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
      toast("Sucessfully Deleted");
      fetchPostData();
    } catch (error) {
      console.log(error.message);
    }
  };

  //GET USER DATA FROM REFERENCE LINK WHO HAS POSTED

  useEffect(() => {
    getUserDocByRef(item?.postedby).then((res) => {
      setPostedByUserDoc(res);
    });
  }, [item]);
  useEffect(() => {
    getUserDocByRef(item?.postedby).then((res) => {
      setPostedByUserDoc(res);
    });
  }, [userDoc]);

  //GET USER DATA FROM REFERENCE LINK WHO HAS COMMENTED

  useEffect(() => {
    item.comments.map((event) => {
      getUserDocByRef(event.commentedby).then((res) => {
        setCommentedByUserDoc((prev) => {
          return [...prev, res];
        });
      });
    });
  }, [item]);

  // HANDLE POST SEND CLICK

  const handleSendPostLinkClick = (id) => {
    var tempUrl = window.location.href;
    var url = `${tempUrl}/${id}`;
    navigator.clipboard.writeText(url).then(
      function () {
        toast("Link Copied To ClipBoard");
      },
      function (err) {
        console.error("Could not copy text: ", err);
      }
    );
  };

  //GET TIME OF POST
  useEffect(() => {
    setPostTime(new Date(item?.createdAt.seconds * 1000));
  }, [item]);

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
                setPostsAuthorIsClick(true);
                setPostsAuthorInfo(postedByUserDoc);
              }
            }}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginRight: "1rem",
            }}
            src={postedByUserDoc?.image}
            alt=""
          />
          <div className={style.postAuthorNameAndDesignationCont}>
            <h3
              onClick={() => {
                console.log("postcard click: ", isLoggedIn);
                if (!isLoggedIn) {
                  return openModal();
                } else {
                  setPostsAuthorIsClick(true);
                  setPostsAuthorInfo(postedByUserDoc);
                }
              }}
              className={style.postAuthorName}
            >
              {postedByUserDoc?.name}
            </h3>
            <p className={style.postAuthorDesignation}>
              {postedByUserDoc?.designation ? postedByUserDoc?.designation : ""}
            </p>
          </div>

          <div className={style.postUploadDateContainer}>
            {new Date(item?.createdAt?.seconds * 1000).toDateString().slice(4)}

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
                      user?.user?.email === item?.postedby?.id
                        ? "threeDotsOptions"
                        : "standardThreeDotsOption"
                    }
                  >
                    {user?.user?.email === item?.postedby?.id ? (
                      <div
                        onClick={() => handleDeletePostButtonClick(item.id)}
                        className={style.threeDotsDeletePostOption}
                      >
                        Delete Post
                      </div>
                    ) : null}
                    {user?.user?.email === item?.postedby?.id ? (
                      <a
                        style={{
                          textDecoration: "none",
                          color: "black",
                          margin: "auto",
                        }}
                      >
                        <div
                          onClick={() => {
                            handleEditPostButtonClick(item, item.id);
                            setIsThreeDotsClicked(false);
                          }}
                          className={style.threeDotsEditPostOptio}
                        >
                          Edit Post
                        </div>
                      </a>
                    ) : null}
                    <div className={style.threeDotsReportPostOption}>
                      Report Post
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className={style.postDivideLine_community}></div>
        <div className={style.postTextContainer}>
          {item?.text.length > 100 ? (
            <h3 className={style.postText}>
              {showMorePostTextClick ? (
                item?.text
              ) : (
                <>
                  {item?.text.slice(0, 100)}
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
            <h3 className={style.postText}>{item?.text}</h3>
          )}
        </div>
        {item?.image ? (
          <div className="postImageContainer" style={{ width: "100%" }}>
            <img
              className="postImage"
              style={{ aspectRatio: "7/3", width: "100%" }}
              src={item?.image}
              alt="postImage"
            />
          </div>
        ) : null}
        <div className={style.postDivideLine_community}></div>
        <div className={style.postLikesAndCommentContainer}>
          <div style={{ display: "flex", alignItems: "center", width: "95%" }}>
            <div
              onClick={() => {
                getLikedPostIdFromFirebase(item.id, item);
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

              <h3
            
                style={{ cursor: "pointer" }}
                className={style.postLikeCount}
              >
                {postDetail?.likes.length} Like
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
              <div className="commentContainer">
                {/* <img src={commentIcon} alt='commentIcon' onClick={()=>{setCommentIconClick(current=>!current)}} className='commentPostIcon'/> */}
                <img src={commentIcon} alt="img" className="commentPostIconn" />

                {/* ;(document.getElementsByClassName(`${item.id}`)[0]).click();(document.getElementsByClassName(`${item.id}`)[0]).focus() */}
              </div>
              {/* <p className='postLikeCountText'>{item?.comments.length<=1?"Comment":"Comments"}</p> */}
              <h3 className={style.postCommentCount}>
                {postDetail?.comments.length} Comment
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
              <div className="postSendCont">
                <div className="postSendIcon">
                  {/* <img style={{width:"100%",height:"100%"}} src="./images/paper-plane.png" alt="sendIcon" /> */}
                  <RiShareForwardLine style={{ fontSize: "1.8rem" }} />
                </div>
                <h3
                  style={{ cursor: "pointer" }}
                  className={style.postCommentCount}
                >
                  Share
                </h3>
              </div>
            </div>

            <div className={style.postCommentContainer}>
              <div className="commentContainer">
                {/* <img src={commentIcon} alt='commentIcon' onClick={()=>{setCommentIconClick(current=>!current)}} className='commentPostIcon'/> */}
                <img src={eyeIcon} />

                {/* 
                <FaBullseye
                  onClick={() => {
                    setCommentIconClick((current) => !current);
                  }}
                  className="commentPostIconn"
                /> */}

                {/* ;(document.getElementsByClassName(`${item.id}`)[0]).click();(document.getElementsByClassName(`${item.id}`)[0]).focus() */}
              </div>
              {/* <p className='postLikeCountText'>{item?.comments.length<=1?"Comment":"Comments"}</p> */}
              <h3 className={style.postCommentCount}>
                {item?.comments.length + item.likes.length + 2}{" "}
              </h3>
            </div>
          </div>
          {/* saveCont */}
          <BsBookmark
            onClick={() => {
              if (!isLoggedIn) {
                return openModal();
              } else {
                console.log("user logged!");
              }
            }}
            stlye={{ color: "white" }}
            className="post_card_save_post_icon"
          />
        </div>
      </section>

      <section className={style.newCommentOnPostSection}>
        {editCommentButtonIsClick ? (
          <section className={style.uploadPostContainerrrrSection}>
            <div className="newCommentContainerrrr">
              <img
                className="community-newComment-cont-userImage"
                src={
                  userDoc?.image
                    ? userDoc.image
                    : "https://media.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif"
                }
                alt="userImage"
              />
              <div className="textAreaUploadContainer">
                <div>
                  <textarea
                    autoFocus
                    onChange={(e) => setNewEdittedComment(e.target.value)}
                    name="newEditComment"
                    id={style.postCommentContainerExpanded}
                    rows="3"
                    placeholder="Share Your Thoughts"
                    value={newEdittedComment}
                  ></textarea>
                  <div
                    className={`${style.addImageandUploadPostIcon} ${style.newCommentAddImageAndUpload}`}
                  >
                    <button
                      onClick={() => handleEditCommentonPost(item, item.id)}
                      className="uploadPostIconButton"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section
            style={{ display: commentIconClick ? "" : "none" }}
            className={style.uploadPostContainerrrrSection}
          >
            <div className="newCommentContainerrrr">
              <img
                className={style.communityNewCommentContUserImage}
                src={
                  userDoc?.image
                    ? userDoc.image
                    : "https://media.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif"
                }
                alt="userImage"
              />
              <div
                style={{ position: "relative", width: "85%" }}
                className={style.textAreaUploadContainer}
              >
                <textarea
                  autoFocus
                  className={item?.id}
                  onClick={() => {
                    setNewCommentTextAreaClick(true);
                  }}
                  onChange={(e) => setNewComment(e.target.value)}
                  name="newComment"
                  id={
                    newCommentTextAreaClick
                      ? "postCommentContainerExpanded"
                      : "postCommentContainer"
                  }
                  rows="3"
                  placeholder="Share Your Thoughts"
                  value={newComment}
                ></textarea>
                {newCommentTextAreaClick ? (
                  <img
                    onClick={() => handleNewCommentonPost(item, item.id)}
                    class={style.rightArrowImg}
                    src={rightArrow}
                  />
                ) : null}

                <img
                  onClick={() => handleNewCommentonPost(item, item.id)}
                  class={style.rightArrowImg}
                  src={rightArrow}
                />

                <GrAddCircle
                  onClick={() =>
                    setNewCommentTextAreaClick((current) => !current)
                  }
                  className={
                    newCommentTextAreaClick
                      ? "expandTextAreaIconExpanded"
                      : "expandTextAreaIcon"
                  }
                />
              </div>
            </div>
          </section>
        )}

        {/* OLD COMMENT SECTION */}
        {commentIconClick ? (
          <section
            className={
              item?.comments.length !== 0
                ? style.oldCommentSection
                : style.oldCommentSectionNothing
            }
          >
            {postDetail?.comments?.map((list) => {
              return (
                <>
                  <div className="commentedByAndComment" key={list.commentid}>
                    <div className="commented-by-and-edit-cont">
                      <img
                        className="commentedUserImage"
                        src={
                          commentedByUserDoc?.filter((it) => {
                            return it.email === list?.commentedby?.id;
                          })[0]?.image
                        }
                        alt="CommentedUserPhoto"
                      />
                      <p className="commented-by">
                        {
                          commentedByUserDoc?.filter((it) => {
                            return it.email === list?.commentedby?.id;
                          })[0]?.name
                        }
                      </p>
                      {list?.commentedby?.id === user?.user?.email ? (
                        <TfiMoreAlt
                          className="threeDotsPost commentThreeDotsPost"
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
                          <div className="threeDotsOptions commentThreeDotsOption">
                            <div
                              onClick={() =>
                                handleDeleteCommentClick(
                                  list.commentid,
                                  item,
                                  item.id
                                )
                              }
                              className="threeDotsDeletePostOption"
                            >
                              Delete
                            </div>
                            <a
                              style={{
                                textDecoration: "none",
                                color: "black",
                                margin: "auto",
                              }}
                            >
                              <div
                                onClick={() => {
                                  handleEditCommentClick(list.commentid, list);
                                  setIsCommentThreeDotsClicked(false);
                                }}
                                className="threeDotsEditPostOption"
                              >
                                Edit
                              </div>
                            </a>
                          </div>
                        </>
                      ) : null}
                    </div>
                    <p className="commented-by-comment">{list.comment}</p>
                  </div>
                </>
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
