import React, { useEffect, useRef, useState } from "react";
import style from "./CommunityFinalDark.module.css";
import defaultImg from "../../../images/default-profile-pic.webp";
import styles from "../Post Card Dark Mode/PostCardDark.module.css";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostCardDark from "../../../components/Community Dark Mood/Post Card Dark Mode/PostCardDark";
import { useDispatch, useSelector } from "react-redux";
import PostSkeleton from "../../../components/Post Skeleton/PostSkeleton";
import CommunityUserProfilePopup from "../../../components/Community User Profile Popup/CommunityUserProfilePopup";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { RxCrossCircled } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import NoFollowingCard from "../../../components/No Following Card/NoFollowingCard";
import { MdOutlineAddPhotoAlternate, MdVideoCameraBack } from "react-icons/md";
import { setUserSpace } from "../../../features/userSlice";
import { BsImages } from "react-icons/bs";
import darkSparkle from "../../../images/black-sparkle.webp";
import DiscoverPerfectTools from "../../DynamicComponents/DiscoverPerfectTools/DiscoverPerfectTools";
import FeaturedSuggestions from "../../DynamicComponents/FeaturedSuggestions/FeaturedSuggestions";
import FeaturedMentors from "../../DynamicComponents/FeaturedMentors/FeaturedMentors";

const CommunityFinalDark = ({ isLoggedIn, openModal }) => {
  const dispatch = useDispatch();
  const postData = [];
  const [userSpaceArr, setUserSpaceArr] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [postsData, setPostsData] = useState([]);
  const [newPostText, setNewPostText] = useState("");
  const user = useSelector((state) => state.user);
  const userDoc = useSelector((state) => state.userDoc);
  const [newPostdataId, setNewPostDataId] = useState([]);
  const [editPostButtonClick, setEditPostButtonClick] = useState(false);
  const [newEditText, setNewEditText] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [textAreaIsClick, setTextAreaIsClick] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [navbarPostButtonClick, setNavbarPostButtonClick] = useState(false);
  const [postsAuthorIsClick, setPostsAuthorIsClick] = useState(false);
  const [postsAuthorInfo, setPostsAuthorInfo] = useState(null);
  const [sortOptionSelected, setSortOptionSelected] = useState({
    time: "Newest",
    whose: "Everything",
  });
  const [sortOptionClick, setSortOptionClick] = useState(false);
  const [postIdExist, setPostIdExist] = useState("");
  const [newScoll, setNewScroll] = useState(0);
  const [newsData, setNewsData] = useState();
  const [singleNews, setSingleNews] = useState(null);
  const [blogArray, setBlogArray] = useState([]);
  const [mySpaceStatus, setMySpaceStatus] = useState(true);
  const [whatHotStatus, setWhatHotStatus] = useState(false);
  const [spaceFilteredPost, setSpaceFilteredPost] = useState([]);
  const [whatsHotCommunityPost, setWhatsHotCommunityPost] = useState([]);
  const [postSpaceData, setPostSpaceData] = useState([]);
  const [selectedCommunitySpace, setSelectedCommunitySpace] = useState([]);
  const [postUploadStatus, setPostUploadStatus] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [imageModalStatus, setImageModalStatus] = useState(false);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.bing.microsoft.com/v7.0/news/search",
      params: { q: "startup", safeSearch: "Off", textFormat: "Raw" },
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": "bd03e8f8f29b46479ee4c2004280308f",
      },
    };

    async function getNews() {
      try {
        await axios.request(options).then((res) => {
          setNewsData(res.data.value);
        });
      } catch (err) {
        console.log(err);
      }
    }
    getNews();
  }, []);

  window.onscroll = () => {
    setScroll(window.scrollY);
  };
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const updateScroll = () => {
    setNewScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  //GET SITE URL
  useEffect(() => {
    function getCurrentURL() {
      return window.location.href;
    }
    const url = getCurrentURL();
    const subUrl = url.indexOf("y");
    setPostIdExist(url.slice(subUrl + 2));
  }, []);

  // CHECK FOR USER DOC DATA
  // useEffect(() => {
  //   if (!(userDoc !== null)) {
  //     // console.log("running");
  //     async function fetchUserDocFromFirebase() {
  //       const userDataRef = collection(db, "Users");
  //       const q = query(userDataRef);
  //       const querySnapshot = await getDocs(q);

  //       querySnapshot.forEach((doc) => {
  //         if (doc.id === user?.user?.email) {
  //           setCurrentUserDoc(doc.data());
  //           dispatch(setUserDoc(doc.data()));
  //         }
  //       });
  //     }
  //     fetchUserDocFromFirebase();
  //   }
  // }, [user]);

  //CHECK IF USERDOC HAS POSTS
  useEffect(() => {
    if (userDoc?.posts) {
      setNewPostDataId(userDoc?.posts);
      return;
    }
  }, [userDoc]);

  //FETCH POSTS DATA FROM FIREBASE

  useEffect(() => {
    async function fetchPostsFromDb() {
      setIsPostLoading(true);
      const postRef = collection(db, "Posts");
      const q = query(postRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        postData.push({ ...doc.data(), id: doc.id });
      });

      setSpaceFilteredPost(postData);

      setPostsData(
        postData.sort((a, b) => {
          return b.createdAt.seconds - a.createdAt.seconds;
        })
      );

      // console.log("this is the filtered post community dark", postData);

      let postDataAllLikesLength = 0;
      postsData.map((post) => {
        postDataAllLikesLength += post.likes.length;
      });

      const likesAverage = Math.round(
        postDataAllLikesLength / postsData.length
      );
      setWhatsHotCommunityPost(
        postsData.filter((post) => {
          return post.likes.length >= likesAverage;
        })
      );
      // console.log("hot community posts ", whatsHotCommunityPost);

      if (sortOptionSelected.time === "") {
        setPostsData(
          postData.sort((a, b) => {
            return b.createdAt.seconds - a.createdAt.seconds;
          })
        );
        furtherSortPost();
      }
      if (sortOptionSelected.time === "Popular Now") {
        setPostsData(
          postData.sort((a, b) => {
            return b.likes.length - a.likes.length;
          })
        );
        furtherSortPost();
      }
      if (sortOptionSelected.time === "Newest") {
        setPostsData(
          postData.sort((a, b) => {
            return b.createdAt.seconds - a.createdAt.seconds;
          })
        );
        furtherSortPost();
      }
      if (sortOptionSelected.time === "Oldest") {
        setPostsData(
          postData.sort((a, b) => {
            return a.createdAt.seconds - b.createdAt.seconds;
          })
        );
        furtherSortPost();
      }
      setIsPostLoading(false);
    }
    fetchPostsFromDb();
  }, [sortOptionSelected, whatHotStatus]);

  //FURTHER SORT POST AFTER INITIAL SORT
  const furtherSortPost = () => {
    if (sortOptionSelected.whose === "Everything") {
      setPostsData(postData);
      return;
    }
    if (sortOptionSelected.whose === "People You Follow") {
      const newData = postData.filter((item) => {
        return userDoc.network.includes(item.postedby.id);
      });
      setPostsData(newData);
    }
  };

  //Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 6;
  const pagesVisited = pageNumber * postsPerPage;
  const displayPosts = postsData.slice(0, pagesVisited + postsPerPage);

  // const pageCount=Math.ceil(postsData.length/notesPerPage)
  const fetchMorePosts = () => {
    setTimeout(() => {
      setPageNumber(pageNumber + 1);
    }, 1000);
  };
  const chooseFileRef = useRef(null);
  const chooseVidoFileRef = useRef(null);

  const editFileRef = useRef(null);
  const chooseEditFileRef = () => {
    if (editFileRef.current) {
      chooseFileRef.current.click();
    }
  };

  const chooseFile = () => {
    if (chooseFileRef.current) {
      chooseFileRef.current.click();
    }
  };
  const chooseVideoFile = () => {
    if (chooseVidoFileRef.current) {
      chooseVidoFileRef.current.click();
    }
  };

  const RemoveFile = () => {
    setImageUpload(null);
    setTempImageURL(null);
    setSelectedVideo(null);
    setTempVideoURL(null);

    if (chooseFileRef.current) {
      chooseFileRef.current.value = ""; // Reset input value
    }
    if (chooseVidoFileRef.current) {
      chooseVidoFileRef.current.value = ""; // Reset input value
    }
  };

  // uploadVideoToFireBase()
  const uploadVideoToFireBase = async () => {
    if (!postSpaceData[0]) {
      toast("No postSpace");
      return;
    }
    if (postSpaceData.length != 1) {
      toast("No postSpace");
      return;
    }
    if (selectedVideo === null && newPostText === "") {
      toast("Nothing To Post");
      return;
    }
    toast("Processing Your Request");

    let downloadURL = "";

    if (selectedVideo === null) {
      createNewPost("");
    } else {
      const videoRef = ref(
        storage,
        `Community/Posts/${selectedVideo.name + new Date().getTime()}`
      );
      try {
        const uploadTask = uploadBytesResumable(videoRef, selectedVideo);
        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            reject,
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((url) => {
                  downloadURL = url;
                  resolve();
                })
                .catch(reject);
            }
          );
        });
      } catch (error) {
        toast.error(error.message);
        return;
      }
    }

    createNewPost(downloadURL);
  };

  const [imageUpload, setImageUpload] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [tempImageURL, setTempImageURL] = useState(null);
  const [tempVideoURL, setTempVideoURL] = useState(null);

  // on video change
  const onVideoChange = (event) => {
    // Get the selected video file from the input element
    const file = event.target.files[0];
    setSelectedVideo(file);
    setImageModalStatus(true);
    if (file) {
      setTempVideoURL(URL.createObjectURL(file));
    }
  };

  //ON IMAGE CHANGE
  function onImageChange(e) {
    setImageUpload(e.target.files[0]);
    const fileURL = e.target.files[0];
    setImageModalStatus(true);
    if (fileURL) {
      setTempImageURL(URL.createObjectURL(fileURL));
    }
  }

  const onEditChange = (e) => {
    setImageModalStatus(true);
    const fileURL = e.target.files[0];
    const checkFileType = fileURL.type;
    if (checkFileType.startsWith("image/")) {
      setImageUpload(e.target.files[0]);
      setTempImageURL(URL.createObjectURL(fileURL));
      setSelectedVideo(null);
    } else if (checkFileType.startsWith("video/")) {
      setSelectedVideo(fileURL);
      setTempVideoURL(URL.createObjectURL(fileURL));
      setImageUpload(null);
    }
  };
  // UPLOAD IMAGE TO FIREBASE

  const uploadImageToFireBase = async () => {
    if (!postSpaceData[0]) {
      toast("No postSpace");
      return;
    }
    if (postSpaceData.length != 1) {
      toast("No postSpace");
      return;
    }
    if (imageUpload === null && newPostText === "") {
      toast("Nothing To Post");
      return;
    }
    toast("Processing Your Request");
    if (imageUpload === null) {
      createNewPost("");
      return;
    } else if (imageUpload !== null) {
      const imageReff = ref(
        storage,
        `Community/Posts/${imageUpload.name + new Date().getTime()}`
      );
      const uploadTask = uploadBytesResumable(imageReff, imageUpload);
      try {
        await uploadBytes(imageReff, imageUpload);
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          createNewPost(downloadURL);
        });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  // // Fetch User email and ventorId from database
  // const [userVendorId, setUserVendorId] = useState([]);
  // useEffect(() => {
  //   async function fetchUserVendorId() {
  //     const userRef = collection(db, "Users");
  //     const q = query(userRef);
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       if (doc.data().userType === "Mentor" || doc.data().userType === "mentor") {
  //         setUserVendorId((prev) => {
  //           return [
  //             ...prev,
  //             {
  //               email: doc.data().email,
  //               vendorId: doc.data().vendorId,
  //             },
  //           ];
  //         });
  //       }
  //     });
  //   }
  //   fetchUserVendorId();
  // }, []);

  // console.log("userVendorId", userVendorId);

  //UPLOAD NEW POST TO FIREBASE
  const createNewPost = async (item) => {
    const userRef = doc(db, "Users", user?.user?.email);
    toast("Processing Your Request");
    try {
      const timeId = new Date().getTime().toString();
      let newPostId = [...newPostdataId];
      const newPostArray = newPostText.split("\n");
      if (tempImageURL) {
        await setDoc(doc(db, "Posts", timeId), {
          comments: [],
          createdAt: new Date(),
          image: item,
          video: null,
          likes: [],
          postedby: userRef,
          text: newPostArray,
          postSpace: postSpaceData,
        });
      }
      if (tempVideoURL) {
        await setDoc(doc(db, "Posts", timeId), {
          comments: [],
          createdAt: new Date(),
          image: null,
          video: item,
          likes: [],
          postedby: userRef,
          text: newPostArray,
          postSpace: postSpaceData,
        });
      }

      newPostId.push(timeId);
      updateUserDatabase(newPostId);
    } catch (error) {
      console.log(error.message);
    }
  };

  //UPDATE USER DATABSE IN FIREBASE

  const updateUserDatabase = async (id) => {
    const userDocumentRef = doc(db, "Users", user?.user?.email);

    try {
      await updateDoc(userDocumentRef, { posts: id });

      toast("Successfully Posted");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error.message);
    }
  };

  // HANDLE EDIT POST BUTTON CLICK
  const handleEditPostButtonClick = (item, itemId) => {
    // console.log(item, itemId);
    setEditPostButtonClick(true);
    // let result = item.text.join("\n");
    setNewEditText(item.text);

    setEditPostId(itemId);
    if (item.image !== "") {
      setTempImageURL(item.image);
    }
    if (item.video !== "") {
      setTempVideoURL(item.video);
    }
  };

  //EDIT POST IN DATABASE
  const EditPostInDatabaseVideo = async (imageURLL) => {
    const postRef = doc(db, "Posts", editPostId);
    try {
      await updateDoc(postRef, { video: imageURLL, text: newEditText });
      toast("Successfully Saved");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error(error.message);
    }
  };

  const EditPostInDatabase = async (imageURLL) => {
    const postRef = doc(db, "Posts", editPostId);
    try {
      await updateDoc(postRef, { image: imageURLL, text: newEditText });
      toast("Successfully Saved");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error(error.message);
    }
  };
  // EDIT POST CHECK
  const EditPost = async () => {
    toast("Processing Your Request");
    if (imageUpload === null && newEditText === "" && selectedVideo === null) {
      toast("Nothing To Edit");
      return;
    }
    if (imageUpload === null) {
      EditPostInDatabase(tempImageURL);
      return;
    } else if (imageUpload !== null && selectedVideo === null) {
      const imageReff = ref(
        storage,
        `Community/Posts/${imageUpload.name + new Date().getTime()}`
      );
      const uploadTask = uploadBytesResumable(imageReff, imageUpload);
      try {
        await uploadBytes(imageReff, imageUpload);
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          EditPostInDatabase(downloadURL);
        });
      } catch (error) {
        toast.error(error.message);
      }
    } else if (selectedVideo !== null && imageUpload === null) {
      const videoRef = ref(
        storage,
        `Community/Posts/${selectedVideo.name + new Date().getTime()}`
      );
      try {
        const uploadTask = uploadBytesResumable(videoRef, selectedVideo);
        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            reject,
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((url) => {
                  EditPostInDatabaseVideo(url);
                  resolve();
                })
                .catch(reject);
            }
          );
        });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  //FETCH BLOG DATA FROM FIREBASE

  useEffect(() => {
    async function fetchBlogsFromDb() {
      const blogRef = collection(db, "Blogs");
      const q = query(blogRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setBlogArray((prev) => {
          return [...prev, { ...doc.data(), id: doc.data().id }];
        });
      });
    }
    fetchBlogsFromDb();
  }, []);

  // below code is for the userspace
  const [activeIndex, setActiveIndex] = useState([]);

  async function fechingActiveIndexFirebase() {
    const docRef = doc(db, "Users", user?.user?.email);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.data().activeIndex) {
        setUserSpaceArr(docSnap.data().userSpace);
        setActiveIndex(docSnap.data().activeIndex);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // fetching the activeIndex from the firebase
  useEffect(() => {
    fechingActiveIndexFirebase();
  }, [user?.user?.email]);

  const handleSpaceMenuDataClick = (index, event, value) => {
    // console.log(index, event, value)
    if (activeIndex.includes(index)) {
      setActiveIndex(activeIndex.filter((i) => i !== index)); // Remove the index if it's already active
    } else {
      setActiveIndex([...activeIndex, index]); // Add the index if it's not active
    }
    // setIsSpaceMenuDataActive(!isSpaceMenuDataActive)
    setUserSpaceArr((prevOptions) => {
      if (prevOptions.includes(value)) {
        return prevOptions.filter((option) => option !== value);
      } else {
        return [...prevOptions, value];
      }
    });
  };

  // spaceFilteredData here

  useEffect(() => {
    if (postsData.length >= 1 && userSpaceArr.length >= 1) {
      const filteredData = postsData.filter((eachElement) => {
        if (Array.isArray(eachElement.postSpace)) {
          return eachElement.postSpace.some((value) =>
            userSpaceArr.includes(value)
          );
        }
      });

      setSpaceFilteredPost(filteredData);
    }
  }, [postsData, userSpaceArr]);

  function narrowUserSpaceFiltering() {
    // console.log("narrow filtering useeffect called");

    if (activeIndex.length >= 1 && userSpaceArr.length >= 0) {
      let narrowfiltering = activeIndex.map((index) => userSpaceArr[index]);

      const NarrowFilteredPost = postsData.filter((post) =>
        post.postSpace.some((space) => narrowfiltering.includes(space))
      );
      // console.log("this is the narrowFiltered one ", NarrowFilteredPost);
      setSpaceFilteredPost(NarrowFilteredPost);
    }
    if (!activeIndex.length >= 1) {
      if (postsData.length >= 1 && userSpaceArr.length >= 1) {
        const filteredData = postsData.filter((eachElement) => {
          if (Array.isArray(eachElement.postSpace)) {
            return eachElement.postSpace.some((value) =>
              userSpaceArr.includes(value)
            );
          }
        });

        setSpaceFilteredPost(filteredData);
      }
    }
  }
  useEffect(() => {
    narrowUserSpaceFiltering();
  }, [user?.user?.email, activeIndex]);

  // updating the activeIndex in the firebase
  async function updateActiveUserSpaceDatabase() {
    const userdocRef = doc(db, "Users", user?.user?.email);
    try {
      await updateDoc(userdocRef, { activeIndex: activeIndex });
      fechingActiveIndexFirebase();
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleModalSubmit() {
    updateActiveUserSpaceDatabase();

    dispatch(setUserSpace(userSpaceArr));
    setSelectedCommunitySpace(userSpaceArr);
    setIsOpen(false);
  }
  function openTheSpaceModal() {
    fechingActiveIndexFirebase();
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }
  function handleModalClose() {
    fechingActiveIndexFirebase();
    setIsOpen(false);
  }

  const handleOptionChange = (event) => {
    const newValue = event.target.value;
    setPostSpaceData([newValue]);
  };

  useEffect(() => {
    // console.log("postSpaceData", postSpaceData[0]);
    if (
      (newPostText || tempImageURL) &&
      postSpaceData.length == 1 &&
      postSpaceData[0]
    ) {
      setPostUploadStatus(true);
    } else {
      setPostUploadStatus(false);
    }
  }, [newPostText, tempImageURL, postSpaceData]);

  const sortedPosts = spaceFilteredPost.sort((a, b) => {
    const dateA =
      new Date(a.createdAt._seconds * 1000 + a.createdAt._nanoseconds / 1e6) ||
      new Date(
        a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1e6
      ).getTime();
    const dateB =
      new Date(b.createdAt._seconds * 1000 + b.createdAt._nanoseconds / 1e6) ||
      new Date(
        b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1e6
      ).getTime();
    return dateB - dateA;
  });

  return (
    <>
      {imageModalStatus && (
        <div className={style.overlay}>
          <div className={style.imageModal}>
            {tempImageURL && (
              <div className={style.communityPostImageCont}>
                <img
                  className={style.communityPostImage}
                  src={tempImageURL}
                  alt='postFile'
                />
                <div className={style.editDeleteBtn}>
                  <FiEdit onClick={chooseFile} className={style.editBtn} />
                  <RxCrossCircled
                    onClick={RemoveFile}
                    className={style.delete_Btn}
                  />
                </div>
              </div>
            )}
            {tempVideoURL && (
              <div className={style.communityPostImageCont}>
                <video
                  src={tempVideoURL}
                  style={{
                    width: "100% !important",
                    height: "100% !important",
                    minWidth: "400px",
                  }}
                  id='my-video'
                  alt='postVideo'
                  muted='muted'
                  autoplay='autoPlay'
                  className={`video-js ${style.communityPostImage}`}
                  controls
                  preload='auto'
                  width='640'
                  height='264'
                  poster='MY_VIDEO_POSTER.jpg'
                  data-setup='{}'
                ></video>
                <div className={style.editDeleteBtn}>
                  <FiEdit onClick={chooseVideoFile} className={style.editBtn} />
                  <RxCrossCircled
                    onClick={RemoveFile}
                    className={style.delete_Btn}
                  />
                </div>
              </div>
            )}
            <button
              className={style.imageModalSubmitebtn}
              onClick={() => setImageModalStatus(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
      {/* raaya chat boot */}
      <iframe
        title='chat-bot'
        src='https://www.chatbase.co/chatbot-iframe/dpblbF2UGnrFPdqMPCxWb'
        width='100%'
        style={{ height: "100%", minHeight: "700px", display: "none" }}
        frameBorder='0'
      ></iframe>

      {/* userSpace modal */}
      <button
        onClick={() => {
          if (!isLoggedIn) {
            return openModal();
          } else {
            openTheSpaceModal();
          }
        }}
        className={style.spaceSectionButton}
      >
        <span className={style.spaceSectionButtonImg}>
          <img src={darkSparkle} alt='' />
        </span>
        Change your Space
      </button>
      {/* change space  */}
      {isOpen && (
        <div className={style.spaceSection}>
          <div className={style.spaceModal}>
            <div className={style.spaceModalContent}>
              <p className={style.spaceModalHeading}>Select your space (s).</p>

              <div className={style.spaceMenu}>
                {userDoc?.userSpace?.length >= 1 ? (
                  userDoc?.userSpace?.map((space, index) => {
                    return (
                      <div
                        key={index}
                        className={`${style.spaceMenuData} ${
                          activeIndex.includes(index)
                            ? style.spaceMenuDataActive
                            : ""
                        }`}
                        onClick={(event) =>
                          handleSpaceMenuDataClick(
                            index,
                            event,
                            event.target.innerText
                          )
                        }
                      >
                        <p
                          className={`${style.spaceMenuDataPara} ${
                            activeIndex.includes(index)
                              ? style.spaceMenuDataParaActive
                              : ""
                          }`}
                        >
                          {space}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <p style={{ color: "#fff" }}>
                    No spaces found please add from edit profile
                  </p>
                )}
              </div>
              <div className={style.spaceDoneCloseBtn}>
                <button
                  className={style.spaceDoneBtn}
                  onClick={handleModalSubmit}
                >
                  Done
                </button>
                <button
                  className={style.spaceCloseBtn}
                  onClick={handleModalClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {width >= 600 ? (
        <>
          {/* <SidebarFinal /> */}
          {/* <NavBarFinalDarkMode/> */}
          {/* <CommunitySidebar /> */}
          {/* <CommunityNavbar
            setNavbarPostButtonClick={setNavbarPostButtonClick}
          /> */}
        </>
      ) : (
        <>
          {/* <PhnSidebar />
          <KnowledgeNavbar /> */}
        </>
      )}

      <section
        style={{
          position: postsAuthorIsClick || postIdExist !== "" ? "fixed" : "",
        }}
        id={style.communityFinalPageOuterSection}
      >
        <section
          style={{ position: singleNews ? "fixed" : "" }}
          id={style.communityFinalPage}
        >
          <ToastContainer />
          <input
            onChange={onImageChange}
            ref={chooseFileRef}
            type='file'
            accept='image/*'
            hidden
            className={style.postImageUpload}
          />
          <input
            onChange={onVideoChange}
            ref={chooseVidoFileRef}
            type='file'
            accept='video/*'
            hidden
            className={style.postImageUpload}
          />
          <input
            onChange={onEditChange}
            ref={editFileRef}
            type='file'
            accept='image/*,video/*'
            hidden
            className={style.postImageUpload}
          />

          {/* NAVBAR POST BUTTON CLICK SECTION */}
          {navbarPostButtonClick ? (
            <section className={style.editPostContainerrrr}>
              <ToastContainer />
              <div className={style.editPostContainereditcontainer}>
                <div
                  onClick={() => {
                    setNavbarPostButtonClick(false);
                    setTempImageURL(null);
                    setImageUpload(null);
                  }}
                  className={style.closeContainerButton}
                >
                  X
                </div>
                <section className={style.uploadPostContainerrrrSection}>
                  <div className={style.EdituploadPostContainerrrr}>
                    <img
                      // className='community-upload-cont-userImage'
                      className={style.communityUploadContUserImage}
                      src={userDoc?.image ? userDoc.image : defaultImg}
                      alt='userImage'
                    />
                    <div className={style.textAreaUploadContainer}>
                      <div className={style.navbarUploadPostOuterBoxContainer}>
                        <textarea
                          onChange={(e) => setNewPostText(e.target.value)}
                          name='postText'
                          className={style.navbarUploadPostContainerTextArea}
                          id={style.postTextContainerExpanded}
                          rows='3'
                          value={newPostText}
                          placeholder='What Would You Like To Post?'
                        ></textarea>
                        {tempImageURL ? (
                          <div className={style.editcommunityPostImagecont}>
                            <img
                              className={style.editcommunityPostImage}
                              src={tempImageURL}
                              alt='postFile'
                            />
                            <div className={style.editDeleteBtn}>
                              <RxCrossCircled
                                onClick={RemoveFile}
                                className={style.delete_Btn}
                              />
                              <FiEdit
                                onClick={chooseFile}
                                className={style.editBtn}
                              />
                            </div>
                          </div>
                        ) : null}
                        {/* { && } */}
                        <div className={style.addImageandUploadPostIcon}>
                          <MdOutlineAddPhotoAlternate
                            className={style.addImageInCommunityReactIcon}
                            onClick={chooseFile}
                          />

                          <button
                            onClick={uploadImageToFireBase}
                            className={style.uploadPostIconButton}
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </section>
          ) : null}
          {/* EDIT OLD POST SECTION */}

          {editPostButtonClick ? (
            <>
              <section className={style.editPostContainerrrr}>
                <ToastContainer />
                <div className={style.editPostContainereditcontainer}>
                  <div
                    onClick={() => {
                      setEditPostButtonClick(false);
                      setTempImageURL(null);
                      setImageUpload(null);
                    }}
                    className={style.closeContainerButton}
                  >
                    X
                  </div>
                  <section className={style.uploadPostContainerrrrSection}>
                    <div className={style.EdituploadPostContainerrrr}>
                      <img
                        className={style.communityUploadContUserImage}
                        src={userDoc?.image ? userDoc.image : defaultImg}
                        alt='userImage'
                      />
                      <div className={style.textAreaUploadContainer}>
                        <div
                          className={style.navbarUploadPostOuterBoxContainer}
                        >
                          <textarea
                            onChange={(e) => {
                              {
                                const newValue = e.target.value;
                                const newLinesArray = newValue.split("\n");
                                setNewEditText(newLinesArray);
                              }
                            }}
                            name='postText'
                            className={style.editOldPostTextArea}
                            id={style.postTextContainerExpanded}
                            rows='3'
                            value={newEditText.join("\n")}
                            placeholder='What Would You Like To Edit?'
                          ></textarea>
                          {tempImageURL ? (
                            <div className={style.editcommunityPostImagecont}>
                              <div
                                className={
                                  style.editImageOverLayContainerImageContainer
                                }
                              >
                                <div
                                  className={style.editImageOverLayContainer}
                                ></div>
                                <img
                                  className={style.editcommunityPostImage}
                                  src={tempImageURL}
                                  alt='postFile'
                                />
                                <button
                                  onClick={chooseEditFileRef}
                                  className={style.changePhotoIconButton}
                                >
                                  Change
                                </button>
                              </div>
                            </div>
                          ) : null}

                          {tempVideoURL ? (
                            <div className={style.editcommunityPostImagecont}>
                              <div
                                className={
                                  style.editImageOverLayContainerImageContainer
                                }
                              >
                                <div
                                  className={style.editImageOverLayContainer}
                                ></div>
                                <video
                                  className={`video-js ${style.editcommunityPostImage}`}
                                  src={tempVideoURL}
                                  id='my-video'
                                  alt='postVideo'
                                  muted='muted'
                                  autoplay='autoPlay'
                                  controls
                                  preload='auto'
                                  width='640'
                                  height='264'
                                  poster='MY_VIDEO_POSTER.jpg'
                                  data-setup='{}'
                                ></video>
                                <button
                                  onClick={chooseEditFileRef}
                                  className={style.changePhotoIconButton}
                                >
                                  Change
                                </button>
                              </div>
                            </div>
                          ) : null}

                          <div className={style.addImageandUploadPostIcon}>
                            <button
                              onClick={EditPost}
                              className={style.uploadPostIconButton}
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </section>
            </>
          ) : null}

          {/* UPLOAD NEW POST SECTION */}
          <div className={style.reverrCommunityUploadContainerrr}>
            <div className='reverrCommunityHeadingAndPostUploadIcon'>
              <div>
                {isLoggedIn ? (
                  <h2 className={style.reverrCommunityHeading}>
                    {" "}
                    Welcome To Reverr ,{" "}
                    <span
                      style={{
                        color: "rgba(42, 114, 222, 1)",
                        textTransform: "capitalize",
                      }}
                    >
                      {userDoc?.name ? userDoc.name : ""}
                    </span>
                  </h2>
                ) : (
                  <h2 className={style.reverrCommunityHeading}>
                    {" "}
                    Welcome To Reverr
                  </h2>
                )}
              </div>
            </div>

            <section
              className={`${style.uploadPostContainerrrrSection}
               ${style.uploadPostContainerrrrSectionBoxShadow}`}
            >
              <div className={style.uploadPostContainerrrr}>
                <img
                  className={style.communityUploadContUserImage}
                  src={
                    !isLoggedIn
                      ? defaultImg
                      : userDoc?.image
                      ? userDoc.image
                      : defaultImg
                  }
                  alt='userImage'
                />
                <div className={style.textAreaUploadContainer}>
                  <div
                    className={
                      textAreaIsClick
                        ? style.navbarUploadPostOuterBoxContainer
                        : style.UploadPostOuterBoxContainerNotExpanded
                    }
                  >
                    <textarea
                      style={{ borderRadius: "30px" }}
                      onClick={() => {
                        if (!isLoggedIn) {
                          return openModal();
                        } else {
                          setTextAreaIsClick(true);
                        }
                      }}
                      onChange={(e) => setNewPostText(e.target.value)}
                      name='postText'
                      id={
                        textAreaIsClick
                          ? style.postTextContainerExpanded
                          : style.postTextContainer
                      }
                      rows='3'
                      value={newPostText}
                      placeholder='What Would You Like To Post?'
                    ></textarea>

                    {textAreaIsClick ? (
                      <div
                        className={style.clsBtn}
                        onClick={() => {
                          setTextAreaIsClick(false);
                          RemoveFile();
                        }}
                      >
                        close
                      </div>
                    ) : null}
                    {!textAreaIsClick ? (
                      <img
                        className={style.ArrowImgAfterTextArea}
                        src='./images/right-arraow-bg-blue.webp'
                        alt='img'
                        onClick={() => {
                          if (!isLoggedIn) {
                            return openModal();
                          } else {
                            console.log("user logged!");
                          }
                        }}
                      />
                    ) : null}

                    {tempImageURL ? (
                      <div className={style.communityPostImageCont}>
                        <img
                          className={style.communityPostImage}
                          src={tempImageURL}
                          alt='postFile'
                        />
                        <div className={style.editDeleteBtn}>
                          <RxCrossCircled
                            onClick={RemoveFile}
                            className={style.delete_Btn}
                          />
                          <FiEdit
                            onClick={chooseFile}
                            className={style.editBtn}
                          />
                        </div>
                      </div>
                    ) : null}

                    {tempVideoURL ? (
                      <div className={style.communityPostImageCont}>
                        <video
                          src={tempVideoURL}
                          className={`video-js ${style.communityPostImage}`}
                          id='my-video'
                          alt='postVideo'
                          muted='muted'
                          autoplay='autoPlay'
                          controls
                          preload='auto'
                          width='640'
                          height='264'
                          poster='MY_VIDEO_POSTER.jpg'
                        ></video>
                        <div className={style.editDeleteBtn}>
                          <RxCrossCircled
                            onClick={RemoveFile}
                            className={style.delete_Btn}
                          />
                          <FiEdit
                            onClick={chooseFile}
                            className={style.editBtn}
                          />
                        </div>
                      </div>
                    ) : null}

                    {postSpaceData.length >= 1 ? (
                      <p className={style.spaceTag}>{postSpaceData}</p>
                    ) : null}
                  </div>

                  <div className={style.postAssetsIconMain}>
                    {/* image section */}
                    <div
                      className={style.postAssetsIconMaindiv}
                      onClick={() => {
                        if (!isLoggedIn) {
                          return openModal();
                        } else {
                          chooseFile();
                          setTextAreaIsClick(true);
                        }
                      }}
                    >
                      <BsImages className={style.assest_icon} />
                      <span className={style.icon_text}>Images</span>
                    </div>

                    {/* this is the video section */}
                    <div
                      className={style.postAssetsIconMaindiv}
                      onClick={() => {
                        if (!isLoggedIn) {
                          return openModal();
                        } else {
                          chooseVideoFile();
                          setTextAreaIsClick(true);
                        }
                      }}
                    >
                      <MdVideoCameraBack className={style.assest_icon} />
                      <span className={style.icon_text}>Video</span>
                    </div>

                    <select
                      className={style.userSpaceSelect}
                      onClick={() => {
                        if (!isLoggedIn) {
                          return openModal();
                        } else {
                          console.log("user logged!");
                        }
                      }}
                      onChange={handleOptionChange}
                    >
                      <option className={style.userSpaceOption} value=''>
                        Select Spaces
                      </option>
                      {userDoc?.userSpace?.map((item, index) => {
                        return (
                          <option
                            className={style.userSpaceOption}
                            value={item}
                            key={index}
                          >
                            {item}
                          </option>
                        );
                      })}
                    </select>
                    <button
                      onClick={() => {
                        if (!isLoggedIn) {
                          return openModal();
                        } else {
                          if ((tempImageURL && newPostText) || tempImageURL) {
                            uploadImageToFireBase();
                          } else if (
                            (tempVideoURL && newPostText) ||
                            tempVideoURL
                          ) {
                            uploadVideoToFireBase();
                          } else {
                            uploadImageToFireBase();
                          }
                        }
                      }}
                      className={
                        postUploadStatus
                          ? style.uploadPostIconButton
                          : style.disabledPostIconButton
                      }
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* POST SECTION */}

          <div className={style.infiniteScrollOuterDiv}>
            <InfiniteScroll
              dataLength={displayPosts.length}
              next={fetchMorePosts}
              hasMore={displayPosts.length !== postsData.length}
              style={{ overflow: "unset" }}
              loader={
                <div>
                  <PostSkeleton cards={2} />
                </div>
              }
            >
              <div className={style.communityNavbarBlock}>
                <div
                  onClick={(e) => {
                    setMySpaceStatus(true);
                    setWhatHotStatus(false);
                  }}
                  className={
                    mySpaceStatus
                      ? `${style.communityNavbarBlockNav} ${style.activeNav}`
                      : style.communityNavbarBlockNav
                  }
                >
                  <h3
                    className={
                      mySpaceStatus
                        ? `${style.communityNavHeading} ${style.activeNavHeading}`
                        : style.communityNavHeading
                    }
                  >
                    My Space
                  </h3>
                </div>

                <div
                  onClick={() => {
                    setMySpaceStatus(false);
                    setWhatHotStatus(true);
                  }}
                  className={
                    whatHotStatus
                      ? `${style.communityNavbarBlockNav} ${style.activeNav}`
                      : style.communityNavbarBlockNav
                  }
                >
                  <h3
                    className={
                      whatHotStatus
                        ? `${style.communityNavHeading} ${style.activeNavHeading}`
                        : style.communityNavHeading
                    }
                  >
                    What's Hot?
                  </h3>
                </div>
                {/* <div className={style.communityNavbarBlockNav}>
                  <h3 className={style.communityNavHeading}>Recent</h3>
                </div> */}
              </div>

              {mySpaceStatus ? (
                // myfeed posts-container
                <section className='posts-containerr'>
                  {isPostLoading &&
                    displayPosts.length === 0 &&
                    sortOptionSelected.whose !== "People You Follow" && (
                      <div>
                        <PostSkeleton cards={2} />
                      </div>
                    )}
                  {userDoc?.network?.length === 0 &&
                  sortOptionSelected.whose === "People You Follow" ? (
                    <>
                      <NoFollowingCard
                        setSortOptionSelected={setSortOptionSelected}
                        setSortOptionClick={setSortOptionClick}
                      />
                    </>
                  ) : null}
                  {sortedPosts.map((item, index) => {
                    if (index === 3) {
                      return (
                        <React.Fragment key={index}>
                          <PostCardDark
                            postsData={postsData}
                            setPostsData={setPostsData}
                            item={item}
                            key={index}
                            handleEditPostButtonClick={
                              handleEditPostButtonClick
                            }
                            isLoggedIn={isLoggedIn}
                            openModal={openModal}
                            postId={item.id}
                            // setPostsAuthorIsClick={setPostsAuthorIsClick}
                            // setPostsAuthorInfo={setPostsAuthorInfo}
                            // postsDataWithUserDoc={postsDataWithUserDoc}
                          />
                          <FeaturedSuggestions
                            isLoggedIn={isLoggedIn}
                            openModal={openModal}
                          />
                        </React.Fragment>
                      );
                    } else if (index === 7) {
                      return (
                        <React.Fragment key={index}>
                          <PostCardDark
                            postsData={postsData}
                            setPostsData={setPostsData}
                            item={item}
                            key={index}
                            handleEditPostButtonClick={
                              handleEditPostButtonClick
                            }
                            isLoggedIn={isLoggedIn}
                            openModal={openModal}
                            postId={item.id}
                            // setPostsAuthorIsClick={setPostsAuthorIsClick}
                            // setPostsAuthorInfo={setPostsAuthorInfo}
                            // postsDataWithUserDoc={postsDataWithUserDoc}
                          />
                          <DiscoverPerfectTools
                            isLoggedIn={isLoggedIn}
                            openModal={openModal}
                          />
                        </React.Fragment>
                      );
                    } else if (index === 11) {
                      return (
                        <React.Fragment key={index}>
                          <PostCardDark
                            postsData={postsData}
                            setPostsData={setPostsData}
                            item={item}
                            key={index}
                            handleEditPostButtonClick={
                              handleEditPostButtonClick
                            }
                            isLoggedIn={isLoggedIn}
                            openModal={openModal}
                            postId={item.id}
                            // setPostsAuthorIsClick={setPostsAuthorIsClick}
                            // setPostsAuthorInfo={setPostsAuthorInfo}
                            // postsDataWithUserDoc={postsDataWithUserDoc}
                          />
                          <FeaturedMentors
                            isLoggedIn={isLoggedIn}
                            openModal={openModal}
                          />
                        </React.Fragment>
                      );
                    } else {
                      return (
                        <React.Fragment key={index}>
                          <PostCardDark
                            postsData={postsData}
                            setPostsData={setPostsData}
                            item={item}
                            key={index}
                            handleEditPostButtonClick={
                              handleEditPostButtonClick
                            }
                            isLoggedIn={isLoggedIn}
                            openModal={openModal}
                            postId={item.id}
                            // setPostsAuthorIsClick={setPostsAuthorIsClick}
                            // setPostsAuthorInfo={setPostsAuthorInfo}
                            // postsDataWithUserDoc={postsDataWithUserDoc}
                          />
                        </React.Fragment>
                      );
                    }
                  })}
                  {!isPostLoading && sortedPosts.length === 0 ? (
                    <div className={styles.noPostAvailable}>
                      CHOOSEN POST SPACE, IS NOT AVAIBLE RIGHT NOW!
                    </div>
                  ) : null}
                </section>
              ) : (
                // what's hot posts-container
                <section className='posts-containerr'>
                  {isPostLoading &&
                    displayPosts.length === 0 &&
                    sortOptionSelected.whose !== "People You Follow" && (
                      <div>
                        <PostSkeleton cards={2} />
                      </div>
                    )}
                  {userDoc?.network?.length === 0 &&
                  sortOptionSelected.whose === "People You Follow" ? (
                    <>
                      <NoFollowingCard
                        setSortOptionSelected={setSortOptionSelected}
                        setSortOptionClick={setSortOptionClick}
                      />
                    </>
                  ) : null}
                  {whatsHotCommunityPost.map((item, index) => {
                    return (
                      <PostCardDark
                        postsData={postsData}
                        setPostsData={setPostsData}
                        item={item}
                        key={index}
                        handleEditPostButtonClick={handleEditPostButtonClick}
                        isLoggedIn={isLoggedIn}
                        openModal={openModal}
                        postId={item.id}
                        // setPostsAuthorIsClick={setPostsAuthorIsClick}
                        // setPostsAuthorInfo={setPostsAuthorInfo}
                        // postsDataWithUserDoc={postsDataWithUserDoc}
                      />
                    );
                  })}

                  {!isPostLoading && whatsHotCommunityPost.length === 0 ? (
                    <div className={styles.noPostAvailable}>
                      CHOOSEN POST SPACE, IS NOT AVAIBLE RIGHT NOW!
                    </div>
                  ) : null}
                </section>
              )}
            </InfiniteScroll>
          </div>
        </section>
      </section>

      <CommunityUserProfilePopup
        setPostsAuthorIsClick={setPostsAuthorIsClick}
        postsAuthorInfo={postsAuthorInfo}
        setPostsAuthorInfo={setPostsAuthorInfo}
        postsAuthorIsClick={postsAuthorIsClick}
        postsData={postsData}
        setPostsData={setPostsData}
        handleEditPostButtonClick={handleEditPostButtonClick}
      />

      <Outlet />
    </>
  );
};

CommunityFinalDark.defaultProps = {
  isLoggedIn: true,
  openModal: () => {},
};

export default CommunityFinalDark;

// useEffect(() => {
//   const fetchUserInformation = async () => {
//     const updatedPostsData = await Promise.all(
//       postsData.map(async (item) => {
//         const userData = await getUserDocByRef(item.postedby);
//         return { ...item, postedby: userData }; // Create a new object with updated user data
//       })
//     );
//       setPostsDataWithUserDoc(parsedObject);
//   };

//   fetchUserInformation();
// }, [postsData]);

// useEffect(() => {
//   const fetchUserInformation = async () => {
//     try {
//       const updatedPostsData = await Promise.all(
//         postsData.map(async (item) => {
//           console.log(item.postedby);
//           let userData;
//           if (item.postedby._path.segments[1]) {
//             userData = await getUserFromDatabase(item.postedby);
//             console.log(userData);
//             delete userData.password;
//           } else if (item.postedby) {
//             userData = await getUserDocByRef(item.postedby);
//             delete userData.password;
//           }
//           return { ...item, postedby: userData };
//         })
//       );
//       const parsedObject = JSON.parse(JSON.stringify(updatedPostsData));
//       setPostsDataWithUserDoc(parsedObject);
//     } catch (error) {
//       console.error("Error while fetching user information:", error);
//     }
//   };

//   fetchUserInformation();
// }, [postsData]);

// console.log("postsDateWithUserDoc ----", postsDataWithUserDoc);
// console.log("this is the postsData----", postsData);
