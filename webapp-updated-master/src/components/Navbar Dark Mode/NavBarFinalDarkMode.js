import React, { useState, useRef } from "react";
import style from "./NavbarFinalDarkMode.module.css";
import products from "../../assets/Products/products";
import { useDispatch, useSelector } from "react-redux";
import { selectChat, showChat } from "../../features/chatSlice";
import { NavLink, useNavigate } from "react-router-dom";
import Chat from "../Chat/Chat";
import { signOut } from "firebase/auth";
import { auth, createNetworkInMessagesDoc, db } from "../../firebase";
import { logout, selectUser ,setPremium} from "../../features/userSlice";
import { remove } from "../../features/newUserSlice";
import { removeUserDoc, setUserDoc } from "../../features/userDocSlice";
import { removeUserFundingDoc } from "../../features/userFundingDocSlice";
import { ToastContainer, toast } from "react-toastify";
import Upgrade from "../../pages/Upgrade/Upgrade"
import "react-toastify/dist/ReactToastify.css";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { VscBellDot } from "react-icons/vsc";
import { FaLightbulb, FaFacebookMessenger } from "react-icons/fa";
import { setTheme } from "../../features/themeSlice";
import { DarkModeToggle } from "@anatoliygatt/dark-mode-toggle";
// import mentordashboardicon from "../../images/dashboardicon.svg"
import mentordashboardicon from "../../images/radix-icons_dashboard.svg";
import userIcon from "../../images/userIcon.webp";
import settingIcon from "../../images/Vector (3).webp";
import ReverrLightIcon from "../../images/Reverr Light.webp";
import ReverrDarkIcon from "../../images/new-dark-mode-logo.png";
import {
  AiFillBell,
  AiFillSetting,
  AiFillMessage,
  AiOutlineMessage,
  AiOutlineGlobal,
  AiOutlineSearch,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineNotifications,
} from "react-icons/md";
// import { IoMdLogOut } from "react-icons/io";
import { GiArchiveRegister } from "react-icons/gi";
import { BiHomeAlt, BiLock, BiLogIn } from "react-icons/bi";
import { HiOutlineTemplate } from "react-icons/hi";
import emailjs from "@emailjs/browser";
import axios from "axios";
import NotificationCard from "./NotificationCard";
import defaultImg from "../../images/default-profile-pic.webp";
import noNotificationsImg from "../../images/noNotificationsImg.svg";

const NavBarFinalDarkMode = ({ isLoggedIn, openModal }) => {
  const user = useSelector((state) => state.user);
  const [isPremium, setIsPremium] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [isSettingButtonClick, setIsSettingbuttonClick] = useState(false);
  const [isRequestsButtonClick, setRequestsbuttonClick] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chat = useSelector(selectChat);
  const userDoc = useSelector((state) => state.userDoc);
  const [userDocList, setUserDocList] = useState([]);
  const [notificationList, setNotificationList] = useState([]);
  const theme = useSelector((state) => state.themeColor);
  const [scroll, setScroll] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchResult, setsearchResult] = useState(null);
  const [userData, setUserData] = useState([]);
  const [openHam, setOpenham] = useState(false);
  const [premiumModalStatus , setPremiumModalStatus] = useState(false)

  const userType = useSelector((state) => state.onboarding.userType);
  console.log("this is ispremium---",isPremium)
  

  const [userTypeLower, setUserTypeLower] = useState("individual");
  // const state = useSelector((state) => state);
  // console.log("state", state);

  window.onscroll = () => {
    setScroll(window.scrollY);
  };
  const [notificationOpen, setNotificationOpen] = useState(false);

  // ==============code for product modal start===================
  useEffect(() => {
    if (userDoc.userType !== undefined && userDoc.userType !== "") {
      setUserTypeLower(userDoc.userType.toLowerCase());
    }
  }, [userDoc]);
  const elementsToCheck = [
    "TOOLS",
    "MENTOR",
    "FUNDING-APPLY",
    // "STARTUP SCORE",
    "KNOWLEDGE",
    "VIBE"
  ];
  const filteredArray = elementsToCheck.filter((element) =>
    products[userTypeLower].includes(element)
  );
  // console.log("filtered array" +filteredArray);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", setWindowDimensions);
    if (window.innerWidth >= 1250) {
      setOpenham(false);
    }

    return () => {
      window.removeEventListener("resize", setWindowDimensions);
    };
  }, [window.innerWidth]);

  const toggleProductModal = () => {
    setIsProductModalOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOutsideClick = (event) => {
    if (
      isProductModalOpen &&
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsProductModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isProductModalOpen]);

  // =====================code for product modal end=====================

  // ================Start functionality for search bar==================
  async function fetchUserDataFromFirebase(type) {
    const userDataRef = collection(db, "Users");
    let q;

    if (type !== "") {
      q = query(userDataRef, where("userType", "==", type));
    } else {
      q = query(userDataRef);
    }

    const querySnapshot = await getDocs(q);

    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });

    return data;
  }

  useEffect(() => {
    async function fetchData() {
      // const data = await fetchUserDataFromFirebase(userType);
      const data = await fetchUserDataFromFirebase("");

      setUserData(data);
    }
    fetchData();
  }, []);

  const getFilterData = (data, input, key) => {
    return data.filter((item) => {
      // console.log("navkey",item[key]?.toLowerCase());
      return item?.[key]?.toLowerCase().includes(input);
    });
  };

  const searchInputHandler = (e) => {
    const input = e.target.value.toLowerCase();
    if (input === "") {
      setsearchResult(null);
    } else {
      const key = "name";
      const filteredData = getFilterData(userData, input, key);
      setsearchResult(filteredData);
    }
  };
  // =====================End functionality for search bar===================


  // =============Start functionality for premium status check===============
  useEffect(() => {
    function checkPremiumStatus() {
      const oneMonthInseconds = 30 * 24 * 60 * 60;
      const threeMonthsInseconds = 3 * oneMonthInseconds;
      const sixMonthsInseconds = 6 * oneMonthInseconds;

      const premiumData = userDoc?.premiumData;
      const currentDate = new Date().getTime() / 1000;
      if (!premiumData) return;

      const premiumStartDate = premiumData.premiumStartDate;


      switch (premiumData.subscriptionPlan) {
        case "onemonth":
          if (currentDate <= premiumStartDate + oneMonthInseconds) {
            console.log("premium members")
            setIsPremium(true);
            dispatch(setPremium(true))
          }
          break;
        case "threemonths":
          if (currentDate <= premiumStartDate + threeMonthsInseconds) {
            setIsPremium(true);
            dispatch(setPremium(true))
          }
          break;
        case "sixmonths":
          if (currentDate <= premiumStartDate + sixMonthsInseconds) {
            console.log("premium members")
            setIsPremium(true);
            dispatch(setPremium(true))
          }
          break;
        default:
          setIsPremium(false);
          dispatch(setPremium(false))
          break;
      }
    }
    checkPremiumStatus();
  }, [userDoc]);
  // =============End functionality for premium status check===============



  // CHECK FOR USER PHOTO
  useEffect(() => {
    if (userDoc?.image !== "") {
      setUserImage(userDoc.image);
      return;
    }
    if (user?.user?.photoURL !== null) {
      setUserImage(user?.user?.photoURL);
      return;
    } else {
      setUserImage(
        "https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/Images%2FDefaultdp.png?alt=media&token=eaf853bf-3c60-42df-9c8b-d4ebf5a1a2a6"
      );
      return;
    }
  }, [userDoc]);

  useEffect(() => {
    setUserImage(
      "https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/Images%2FDefaultdp.png?alt=media&token=eaf853bf-3c60-42df-9c8b-d4ebf5a1a2a6"
    );
  }, []);

  //CHECK FOR THEME
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  //TOGGLE THEME
  const toggleTheme = () => {
    if (theme === "light-theme") {
      dispatch(setTheme("dark-theme"));
    } else {
      dispatch(setTheme("light-theme"));
    }
  };

  // CHECK FOR USER DOC DATA
  useEffect(() => {
    async function fetchUserDocFromFirebase() {
      const userDataRef = collection(db, "Users");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (doc.id === user?.user?.email) {
          dispatch(setUserDoc(doc.data()));
        }
      });
    }
    fetchUserDocFromFirebase();
  }, [user]);

  //CHECK FOR NOTIFICATION
  useEffect(() => {
    async function fetchNotificationFromFirebase() {
      const userDataRef = collection(db, "Users");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (userDoc?.notification?.includes(doc.id)) {
          setNotificationList((prev) => {
            return [...prev, { ...doc.data(), id: doc.id }];
          });
        }
      });
    }
    fetchNotificationFromFirebase();
  }, [isRequestsButtonClick]);

  // CHECK FOR USER DOC LIST WHO HAS REQUESTED FOLLOW
  useEffect(() => {
    async function fetchUserDocListFromFirebase() {
      const userDataRef = collection(db, "Users");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (userDoc?.receivedRequests?.includes(doc.id))
          setUserDocList((prev) => {
            return [...prev, { ...doc.data(), id: doc.id }];
          });
      });
    }
    fetchUserDocListFromFirebase();
  }, [isRequestsButtonClick]);

  //HANDLE ACCEPT FOLLOW REQUEST
  const handleAcceptFollowRequest = async (id) => {
    const userData = [];
    //GET DATA OF USER WHO HAS REQUESTED FOLLOW REQUEST
    const userRef = collection(db, "Users");
    const q = query(userRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id === id) {
        userData.push({ ...doc.data(), id: doc.id });
      }
    });

    acceptFollowRequest(id, userData[0]);
  };
  //ACCEPT FOLLOW REQUEST
  const acceptFollowRequest = async (id, userData) => {
    let notificationArray;
    if (!userDoc.notification) {
      notificationArray = [];
    } else {
      notificationArray = userDoc.notification;
    }
    const newNotificationArray = [...notificationArray, userDoc.email];

    const newReceivedRequestsArray = userDoc.receivedRequests.filter((item) => {
      return item !== id;
    });
    const newNetworkArray = userDoc.network.concat([id]);

    const userDocumentRef = doc(db, "Users", userDoc.email);

    const userWhoRequestedFollowDocRef = doc(db, "Users", id);
    const userWhoRequestedNewNetworkArray = userData.network.concat([
      userDoc.email,
    ]);
    const userWhoRequestedNewsendRequestArray = userData.sendRequests.filter(
      (item) => {
        return item !== user?.user?.email;
      }
    );
    const updatedUserDoc = {
      ...userDoc,
      receivedRequests: newReceivedRequestsArray,
      network: newNetworkArray,
    };
    console.log(
      "userWhoRequestedNewNetworkArray",
      userWhoRequestedNewNetworkArray
    );
    try {
      await updateDoc(userDocumentRef, {
        receivedRequests: newReceivedRequestsArray,
        network: newNetworkArray,
      });
      await updateDoc(userWhoRequestedFollowDocRef, {
        sendRequests: userWhoRequestedNewsendRequestArray,
        network: userWhoRequestedNewNetworkArray,
        notification: newNotificationArray,
      });
      await createNetworkInMessagesDoc(userDoc.email, id);
      toast("Accepted Follow Request");
      dispatch(setUserDoc(updatedUserDoc));
    } catch (error) {
      console.log(error.message);
    }
  };

  //HANDLE REJECT FOLLOW REQUEST
  const handleRejectFollowRequest = async (id) => {
    const userData = [];
    //GET DATA OF USER WHO HAS REQUESTED FOLLOW REQUEST
    const userRef = collection(db, "Users");
    const q = query(userRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id === id) {
        userData.push({ ...doc.data(), id: doc.id });
      }
    });
    rejectFollowRequest(id, userData[0]);
  };
  //REJECT FOLLOW REQUEST
  const rejectFollowRequest = async (id, userData) => {
    const newReceivedRequestsArray = userDoc.receivedRequests.filter((item) => {
      return item !== id;
    });
    const userDocumentRef = doc(db, "Users", userDoc.email);
    const userWhoRequestedFollowDocRef = doc(db, "Users", id);
    const userWhoRequestedNewsendRequestArray = userData.sendRequests.filter(
      (item) => {
        return item !== user?.user?.email;
      }
    );
    const updatedUserDoc = {
      ...userDoc,
      receivedRequests: newReceivedRequestsArray,
    };

    try {
      await updateDoc(userDocumentRef, {
        receivedRequests: newReceivedRequestsArray,
      });
      await updateDoc(userWhoRequestedFollowDocRef, {
        sendRequests: userWhoRequestedNewsendRequestArray,
      });
      toast("Rejected Follow Request");
      dispatch(setUserDoc(updatedUserDoc));
    } catch (error) {
      console.log(error.message);
    }
  };

  //HANDLE DELETE NOTIFICATION

  const handleDeleteNotification = async (id) => {
    const newNotificationList = notificationList.filter((item) => {
      return item.id !== id;
    });
    const userDocumentRef = doc(db, "Users", userDoc.email);
    const updatedUserDoc = { ...userDoc, notification: newNotificationList };
    try {
      await updateDoc(userDocumentRef, { notification: newNotificationList });
      dispatch(setUserDoc(updatedUserDoc));
    } catch (error) {
      console.log(error.message);
    }
  };

  function generateOTP(n) {
    var add = 1,
      max = 12 - add;
    if (n > max) {
      return generateOTP(max) + generateOTP(n - max);
    }
    max = Math.pow(10, n + add);
    var min = max / 10;
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ("" + number).substring(add);
  }

  const changePassBtnClick = async () => {
    setLoading(true);
    const otp = generateOTP(6);
    var templateParams = {
      from_name: "Reverr",
      to_name: userDoc.name,
      to_email: userDoc.email,
      otp,
    };
    try {
      await emailjs.send(
        "service_lfmmz8k",
        "template_n3pcht5",
        templateParams,
        "dVExxiI8hYMCyc0sY"
      );
      await axios.post("https://server.reverr.io/sendSmsCode", {
        to: userDoc?.phone ? userDoc?.phone : userDoc?.mobile,
        code: userDoc?.countryCode,
        message: `Your Change Password OTP is ${otp}`,
      });
    } catch (error) {
      console.log("FAILED...", error);
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }

    navigate("/change-user-password", {
      state: otp,
    });
    setLoading(false);
  };

  // console.log("userDoc", userDoc.posts);
  // console.log("notificationLisst", notificationList);
  return (
    <> 
    {premiumModalStatus ? (
      <div class={style.overlay}>
      <div className={style.premiumModal}>
        <div onClick={()=> setPremiumModalStatus(false)} className={style.closebtnModal}>
          close
        </div>
        <Upgrade/>
      </div>
      </div>
    ): ''}
      {isProductModalOpen ? (
        <div className={style.productModalCont}>
          <div className={style.productModal} ref={modalRef}>
            <text style={{ color: "#A7A7A7", fontSize: 12 }}>KEY PRODUCTS</text>
            <div className={style.productContainer}>
              {filteredArray.includes("TOOLS") ? (
                <div onClick={() => navigate("/tools")}>
                  <img src={require("../../images/rulepen.webp")} alt="img" />
                  <div className={style.keyproddiv}>
                    <text
                      style={{
                        fontSize: 14,
                        color: "#ffffff",
                      }}
                    >
                      Tools
                    </text>
                    <text
                      style={{
                        fontSize: 10,
                        color: "#A7A7A7",
                      }}
                      className={style.discriponmobilehide}
                    >
                      Elevate your startup performance with our next-level
                      online tools!
                    </text>
                  </div>
                </div>
              ) : null}
              {filteredArray.includes("MENTOR") ? (
                <div onClick={() => navigate("/mentors")}>
                  <img
                    src={require("../../images/securityuser.webp")}
                    alt="img"
                  />
                  <div className={style.keyproddiv}>
                    <text
                      style={{
                        fontSize: 14,
                        color: "#ffffff",
                      }}
                    >
                      Mentors
                    </text>
                    <text
                      style={{
                        fontSize: 10,
                        color: "#A7A7A7",
                      }}
                      className={style.discriponmobilehide}
                    >
                      Qualified mentors across multiple categories for all your
                      needs.
                    </text>
                  </div>
                </div>
              ) : null}
              {filteredArray.includes("KNOWLEDGE") ? (
                <div onClick={() => navigate("/knowledge")}>
                  <img src={require("../../images/book1.webp")} alt="img" />
                  <div className={style.keyproddiv}>
                    <text
                      style={{
                        fontSize: 14,
                        color: "#ffffff",
                      }}
                    >
                      Knowledge
                    </text>
                    <text
                      style={{
                        fontSize: 10,
                        color: "#A7A7A7",
                      }}
                      className={style.discriponmobilehide}
                    >
                      Check out our tailor-made roadmap of courses.
                    </text>
                  </div>
                </div>
              ) : null}
              {filteredArray.includes("FUNDING-APPLY") ? (
                <div onClick={() => navigate("/funding-page")}>
                  <img
                    src={require("../../images/currencyusd.webp")}
                    alt="img"
                  />
                  <div className={style.keyproddiv}>
                    <text
                      style={{
                        fontSize: 14,
                        color: "#ffffff",
                      }}
                    >
                      Funding
                    </text>
                    <text
                      style={{
                        fontSize: 10,
                        color: "#A7A7A7",
                      }}
                      className={style.discriponmobilehide}
                    >
                      Find investors perfectly suited for you.
                    </text>
                  </div>
                </div>
              ) : null}
              {/* ///Vibe/// */}
              {filteredArray.includes("VIBE") ? (
                <div  onClick={() => navigate("/vibe")}>
                  <img src={require("../../images/Vibeicon.webp")} alt="img" />
                  <div className={style.keyproddiv}>
                    <text
                      style={{
                        fontSize: 14,
                        color: "#ffffff",
                      }}
                    >
                      Vibe
                    </text>
                    <text
                      style={{
                        fontSize: 10,
                        color: "#A7A7A7",
                      }}
                      className={style.discriponmobilehide}
                    >
                      Networking with a swipe.
                    </text>
                  </div>
                </div>
              ) : null}
              {/* ///Vibe end/// */}
              {filteredArray.includes("STARTUP SCORE") ? (
                <div onClick={() => navigate("/start-up")}>
                  <img
                    src={require("../../images/moneyreveive.webp")}
                    alt="img"
                  />
                  <div className={style.keyproddiv}>
                    <text
                      style={{
                        fontSize: 14,
                        color: "#ffffff",
                      }}
                    >
                      Startup Score
                    </text>
                    <text
                      style={{
                        fontSize: 10,
                        color: "#A7A7A7",
                      }}
                      className={style.discriponmobilehide}
                    >
                      Check your startup score.
                    </text>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      <section id={scroll > 1 ? style.navbarFinalScrolled : style.navbarFinal}>
        <ToastContainer />
        <div
          onClick={() => navigate("/")}
          className={style.navbarBrandLogoImgCont}
        >
          {/* <img
            className="navbar-final-brand-logo-img"
            src={theme === "light-theme" ? ReverrDarkIcon : ReverrLightIcon}
            alt="brand-logo"
          /> */}
          <img
            className={style.navbarFinalBrandLogoImg}
            src={ReverrDarkIcon}
            alt="brand-logo"
          />
          {/* <span className={style.reverrHeadingSpan}>
            <p className={style.reverrHeading}>Reverr</p>
          </span> */}
        </div>

        {window.innerWidth >= 540 && (
          <div className={style.navbarSearch}>
            <AiOutlineSearch className={style.navbarSearchImg} />
            <input
              className={style.navbarSearchInput}
              onChange={searchInputHandler}
              placeholder="Search"
            />
            {searchResult && (
              <div className={style.navbarSearchResult}>
                <text
                  style={{ color: "#00B3FF", fontSize: 15, marginBottom: 5 }}
                >
                  Search Results
                </text>
                {searchResult.map((item, index) => (
                  <div
                    onClick={() => (
                      navigate(`/userprofile/${item.email}`),
                      setsearchResult(null)
                    )}
                    key={index}
                  >
                    <div>
                      <img
                        src={
                          item?.image
                            ? item.image
                            : require("../../images/userIcon.webp")
                        }
                        alt="img"
                      />
                      <div>
                        <text
                          style={{
                            fontSize: 14,
                            color: "#000000",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item?.name}
                        </text>
                        <text
                          style={{
                            fontSize: 10,
                            color: "#1A1E28",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item?.designation}
                        </text>
                      </div>
                    </div>
                    <div className={style.divider}></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div
          className={
            openHam ? style.hamburgermenuActive1 : style.hamburgermenuActive2
          }
        >
          <div className={style.navbarIconsCont}>
            <div className={style.allNavbarIconsImgName}>
              <div
                className={style.navbarIconsImgName}
                onClick={() =>
                  isLoggedIn ? navigate("/") : navigate("/gallery")
                }
              >
                <BiHomeAlt className={style.navbarIconsImg} />
                <p className={style.navbarIconsName}>Home</p>
              </div>
              {/* //////// */}
              {isLoggedIn &&
              (userDoc?.userType === "Mentor" ||
                userDoc?.userType === "mentor") ? (
                <div
                  className={style.navbarIconsImgName}
                  onClick={() => {
                    if (!isLoggedIn) {
                      return openModal();
                    } else {
                      navigate("/mentordashboard");
                    }
                  }}
                >
                  <img
                    style={{ color: "white" }}
                    src={mentordashboardicon}
                    className={style.navbarDashboardIcon}
                  />
                  <p className={style.navbarDashboardText}>Dashboard</p>
                  {/* <NavLink className="navlinks" to="/discover">
                <p className={style.navbarIconsName}>Discover</p>
              </NavLink> */}
                </div>
              ) : (
                <></>
                //     <div
                //       className={style.navbarIconsImgName}
                //       onClick={() => {
                //         if (!isLoggedIn) {
                //           return openModal();
                //         } else {
                //           navigate("/discover/nu");
                //         }
                //       }}
                //     >
                //       <AiOutlineGlobal className={style.navbarIconsImg} />
                //       <p className={style.navbarIconsName}>Discover</p>
                //       {/* <NavLink className="navlinks" to="/discover">
                //   <p className={style.navbarIconsName}>Discover</p>
                // </NavLink> */}
                //     </div>
              )}
              {/* //////// */}

              {isLoggedIn ? (
                <div
                  className={style.navbarIconsImgName}
                  onClick={() => {
                    if (!isLoggedIn) {
                      return openModal();
                    } else {
                      navigate("/discover");
                    }
                  }}
                >
                  <AiOutlineGlobal className={style.navbarIconsImg} />
                  <p className={style.navbarIconsName}>Discover</p>
                  {/* <NavLink className="navlinks" to="/discover">
                <p className={style.navbarIconsName}>Discover</p>
              </NavLink> */}
                </div>
              ) : (
                <div
                  className={style.navbarIconsImgName}
                  onClick={() => {
                    if (!isLoggedIn) {
                      return openModal();
                    } else {
                      navigate("/discover/nu");
                    }
                  }}
                >
                  <AiOutlineGlobal className={style.navbarIconsImg} />
                  <p className={style.navbarIconsName}>Discover</p>
                  {/* <NavLink className="navlinks" to="/discover">
              <p className={style.navbarIconsName}>Discover</p>
            </NavLink> */}
                </div>
              )}
              {!isLoggedIn ? (
                <div
                  className={style.navbarIconsImgName}
                  onClick={() => navigate("/signup")}
                >
                  <GiArchiveRegister className={style.navbarIconsImg} />
                  <p className={style.navbarIconsName}>Signup</p>
                  {/* <NavLink className="navlinks" to="/discover">
                <p className={style.navbarIconsName}>Discover</p>
              </NavLink> */}
                </div>
              ) : null}
              {!isLoggedIn ? (
                <div
                  className={style.navbarIconsImgName}
                  onClick={() => navigate("/login")}
                >
                  <BiLogIn className={style.navbarIconsImg} />
                  <p className={style.navbarIconsName}>Login</p>
                  {/* <NavLink className="navlinks" to="/discover">
                <p className={style.navbarIconsName}>Discover</p>
              </NavLink> */}
                </div>
              ) : null}
              {isLoggedIn ? (
                filteredArray.length >= 1 ? (
                  <div
                    className={style.navbarIconsImgName}
                    onClick={toggleProductModal}
                    ref={buttonRef}
                  >
                    <HiOutlineTemplate className={style.navbarIconsImg} />
                    <p className={style.navbarIconsName}>Products</p>
                  </div>
                ) : null
              ) : null}
              {isLoggedIn ? (
                <div
                  className={style.navbarIconsImgName}
                  onClick={() => navigate("/messages")}
                >
                  <AiOutlineMessage className={style.navbarIconsImg} />
                  <p className={style.navbarIconsName}>Messages</p>
                </div>
              ) : null}
              {isLoggedIn ? (
                <div
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className={style.navbarIconsImgName}
                >
                  <MdOutlineNotifications className={style.navbarIconsImg} />
                  <p className={style.navbarIconsName}>Notifications</p>
                  {notificationOpen && (
                    <>
                      {/* ///aa// */}
                      <div className={style.notificationBar}>
                        {notificationOpen ? (
                          <div
                            className={style.closeBtn}
                            onClick={() => {
                              notificationOpen(true);
                            }}
                          >
                            {" "}
                            close{" "}
                          </div>
                        ) : null}

                        {userDoc?.notificationList?.length >= 1 ? (
                          <>
                            {" "}
                            <div className={style.notificationHeadings}>
                              <h1 className={style.notificationHeading}>
                                Notifications
                              </h1>
                              {/* <h3 className={style.notificationSubHeading}>Today</h3> */}
                            </div>
                            <div className={style.notificationcardcontainer}>
                              {/* {userDoc?.notificationList?.map((item, index) => (
                              <NotificationCard key={index} item={item} />
                            ))} */}
                              {[...userDoc?.notificationList]
                                ?.sort(
                                  (a, b) =>
                                    b?.time?.seconds * 1000 -
                                    a?.time?.seconds * 1000
                                )
                                ?.map((item, index) => (
                                  <NotificationCard key={index} item={item} />
                                ))}
                            </div>
                          </>
                        ) : (
                          <>
                            <h4>Notifications</h4>
                            <div className={style.imgCont}>
                            <img src={noNotificationsImg} alt="noNotificationsImg" />
                            </div>
                            <p>You don’t have any notifications right now. 
                                  Come back later.</p>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ) : null}
            </div>

            {  !isPremium && !userDoc.hasUpgrade && (
            <button
              className={style.navbarFinalUpgradeBtn}
              onClick={() => setPremiumModalStatus(true)}
            >
              Get Premium
            </button>
          )}

            <div
              onClick={() => setRequestsbuttonClick((current) => !current)}
              className="navbar-topp-social-icon navbar_noOuterContCSS"
            >
              {/* <AiFillBell
              className={
                userDoc?.receivedRequests?.length === 0 &&
                userDoc?.notification?.length === 0
                  ? "nabar-final-notificationBell"
                  : "nabar-final-notificationBell1"
              }
            /> */}

              {isRequestsButtonClick ? (
                <div className="notifiction-dropdown-cont">
                  {userDoc?.receivedRequests?.length === 0 &&
                  userDoc?.notification?.length === 0 ? (
                    <p className="notifiction-dropdown-Request-Cont">
                      No New Notification
                    </p>
                  ) : null}
                  {userDoc?.notification?.map((item) => {
                    return (
                      <>
                        <p
                          className="notifiction-dropdown-Request-Cont"
                          key={item}
                        >
                          <span style={{ height: "fit-content" }}>
                            <img
                              className="notifiction-dropdown-Request-image"
                              src={
                                notificationList?.filter((e) => {
                                  return e.id === item;
                                })[0]?.image
                              }
                              alt="requestUsrImg"
                            />
                          </span>
                          <span className="notifiction-dropdown-Request-name">
                            {
                              notificationList?.filter((e) => {
                                return e.id === item;
                              })[0]?.name
                            }
                          </span>{" "}
                          has accepted your follow request
                          <span
                            onClick={() => handleDeleteNotification(item)}
                            className="notifiction-dropdown-Request-reject"
                          >
                            ❌
                          </span>
                        </p>
                      </>
                    );
                  })}
                  {userDoc?.receivedRequests?.map((item) => {
                    return (
                      <>
                        <p
                          className="notifiction-dropdown-Request-Cont"
                          key={item}
                        >
                          <span style={{ height: "fit-content" }}>
                            <img
                              className="notifiction-dropdown-Request-image"
                              src={
                                userDocList?.filter((e) => {
                                  return e.id === item;
                                })[0]?.image
                              }
                              alt="requestUsrImg"
                            />
                          </span>
                          <span className="notifiction-dropdown-Request-name">
                            {
                              userDocList?.filter((e) => {
                                return e.id === item;
                              })[0]?.name
                            }
                          </span>{" "}
                          wants to follow you{" "}
                          <span
                            onClick={() => handleAcceptFollowRequest(item)}
                            className="notifiction-dropdown-Request-accept"
                          >
                            ✅
                          </span>
                          <span
                            onClick={() => handleRejectFollowRequest(item)}
                            className="notifiction-dropdown-Request-reject"
                          >
                            ❌
                          </span>
                        </p>
                      </>
                    );
                  })}
                </div>
              ) : null}
            </div>
            {isLoggedIn ? (
              <div className={style.wrapperBoth}>
                <img
                  onClick={() => navigate("/userprofile")}
                  className={style.navbarfinaluserImage}
                  src={userImage ? userImage : defaultImg}
                  alt="userimg"
                />
                {/* <div className="navbar-topp-social-icon">
          <FaUserAlt className="nabar-final-userProfile-Icon" onClick={() => navigate("/userprofile")}/>
          </div> */}

                <div
                  onClick={() => setIsSettingbuttonClick((current) => !current)}
                  className="navbar-topp-social-icon setting-social-icon-cont navbar_noOuterContCSS"
                >
                  {/* <AiFillSetting className="nabar-final-setting-Icon"/> */}
                  <MdOutlineKeyboardArrowDown className="nabar-final-setting-Icon" />

                  {isSettingButtonClick ? (
                    <div className={style.settingDropdownCont}>
                      <button
                        onClick={() => navigate("/userprofile")}
                        className="setting-dropdown-button"
                      >
                        My Profile
                      </button>

                      {/* <button
                        style={{
                          cursor: loading ? "default" : "",
                          height: "50px",
                        }}
                        disabled={loading}
                        onClick={(e) => {
                          e.stopPropagation();
                          changePassBtnClick();
                        }}
                        className="setting-dropdown-button"
                      >
                        {loading ? (
                          <img
                            className="navbar_dropdown_changePassword_btn_img"
                            src="https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/Utils%2FWHITE%20Spinner-1s-343px.svg?alt=media&token=54b9d527-0969-41ff-a598-0fc389b2575a"
                            alt="loader"
                          />
                        ) : (
                          "Change Password"
                        )}
                        </button>*/}

                      {/* <button
                  onClick={() => navigate("/user-edit-profile")}
                  className="setting-dropdown-button"
                >
                  Edit Profile
                </button> */}
                      <button
                        onClick={
                          user
                            ? () =>
                                signOut(auth)
                                  .then(() => {
                                    dispatch(logout());
                                    dispatch(remove());
                                    dispatch(removeUserDoc());
                                    dispatch(removeUserFundingDoc());
                                  })
                                  .then(() => {
                                    toast.success("Sucessfully logged out");
                                    navigate("/");
                                  })
                            : () => navigate("/login")
                        }
                        className="setting-dropdown-button"
                      >
                        Logout
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className={style.hamburgermenu}>
          <GiHamburgerMenu
            className={style.hamburgermenuicon}
            onClick={() => {
              setOpenham(!openHam);
            }}
          />
        </div>
      </section>

      {chat && <Chat />}
    </>
  );
};
NavBarFinalDarkMode.defaultProps = {
  isLoggedIn: true,
  openModal: () => {},
};

export default NavBarFinalDarkMode;
