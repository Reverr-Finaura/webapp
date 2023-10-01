import React, { useEffect, useState } from "react";
import styles from "./LoginNew.module.css";
import { auth, db } from "../../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, setUserData } from "../../features/userSlice";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import axios from "axios";
import useQuery from "../../Utils/useQuery";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setName } from "../../features/onboardingSlice";
import { create } from "../../features/newUserSlice";

const LoginTesting = () => {
  const selectedCountry = useSelector((state) => state.countryCode);
  const [metaData, setMetaData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithOTPModal, setSignInWithOTPModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [tempOtp, setTempOtp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.themeColor);
  const provider = new GoogleAuthProvider();
  const [showCodePicker, setShowCodePicker] = useState(false);
  const queryy = useQuery();
  const user_code = queryy.get("code");
  const linkedinLoginError = queryy.get("error");
  const [isLogginInUsingLinkedIn, setIsLogginInUsingLinkedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const onboardingData = useSelector((state) => state.onboarding);
  const [userType, setUserType] = useState("individual");

  //LINKEDIN LOGIN
  const getUserDataFromLinkedin = async (code) => {
    try {
      const data = await axios.post(
        "https://server.reverr.io/getUserDataFromLinkedin",
        { code: code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("data",data.data.data)
      if (data.status === 200) {
        const signInMethods = await fetchSignInMethodsForEmail(
          auth,
          data?.data?.data?.email
        );
        if (signInMethods.length > 0) {
          if (signInMethods[0] === "password") {
            let userDocument = {};
            const userDataRef = collection(db, "Users");
            const q = query(userDataRef);
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
              if (doc.id === data?.data?.data?.email) {
                userDocument = doc.data();
              }
            });

            if (JSON.stringify(userDocument) !== "{}") {
              try {
                await signInWithEmailAndPassword(
                  auth,
                  userDocument.email,
                  userDocument.password
                );
                toast.success("Successfully Logged In");
                navigate("/");
                setLoading(false);
                setIsLogginInUsingLinkedIn(false);
              } catch (error) {
                console.log("err", error);
                setLoading(false);
                setIsLogginInUsingLinkedIn(false);
              }
            } else {
              toast.error("User is not registered yet, Kindly signup first.");
              setIsLogginInUsingLinkedIn(false);
            }
          } else if (signInMethods[0] === "google.com") {
            toast.error(
              "User is already registered using google, Kindly signin using google."
            );
            setIsLogginInUsingLinkedIn(false);
          } else {
            toast.error("User is not registered yet, Kindly signup first.");
            setIsLogginInUsingLinkedIn(false);
          }
        } else {
          toast.error("User is not registered yet, Kindly signup first.");
          setIsLogginInUsingLinkedIn(false);
        }
      }
    } catch (error) {
      console.log("err", error);
      toast.error(error.response.data.message);
      setIsLogginInUsingLinkedIn(false);
    }
  };

  useEffect(() => {
    if (user_code) {
      getUserDataFromLinkedin(user_code);
      setIsLogginInUsingLinkedIn(true);
    }
  }, [user_code]);

  useEffect(() => {
    if (linkedinLoginError) {
      navigate("/");
      toast.error(linkedinLoginError);
    }
  }, [linkedinLoginError]);

  //CHECK FOR META DATA
  useEffect(() => {
    async function fetchUserDocFromFirebase() {
      const userDataRef = collection(db, "meta");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setMetaData(doc.data().emailPhone);
      });
    }
    fetchUserDocFromFirebase();
  }, []);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds >= 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      // .then(async (userCredential) => {
      //   dispatch(
      //     login({
      //       email: auth.currentUser.email,
      //       uid: auth.currentUser.uid,
      //       displayName: auth.currentUser.displayName,
      //       profilePic: auth.currentUser.photoURL,
      //     })
      //   );
      // })
      .then(async () => {
        const docRef = doc(db, "Users", auth.currentUser.email);
        try {
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("docSnap  exist");
            dispatch(
              login({
                email: auth.currentUser.email,
                uid: auth.currentUser.uid,
                displayName: auth.currentUser.displayName,
                profilePic: auth.currentUser.photoURL,
              })
            );
            navigate("/community");
          } else {
            console.log("User document does not exist.");
            dispatch(
              create({
                email: auth.currentUser.email,
                uid: auth.currentUser.uid,
                displayName: auth.currentUser.displayName,
                profilePic: auth.currentUser.photoURL,
                userType: userType,
                loginType: "google",
              })
            );
            dispatch(setEmail(auth.currentUser.email));
            dispatch(setName(auth.currentUser.displayName));

            const onboardingDataSoFar = {
              ...onboardingData,
              name: auth.currentUser.displayName,
              email: auth.currentUser.email,
            };
            // Perform a single update with all the fields to be updated
            await setDoc(docRef, onboardingDataSoFar, { merge: true });
            navigate("/onboarding-first");
          }
        } catch (error) {
          console.log(error.message);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onSubmit = (e) => {
    console.log("Login");
    e.preventDefault();
    if (/^\d+$/.test(email)) {
      loginPhone();
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // console.log(auth.currentUser.email, email);
        const docRef = doc(db, "Users", auth.currentUser.email);
        const docSnap = await getDoc(docRef).then((doc) => {
          dispatch(setUserData(doc.data()));
          dispatch(
            login({
              email: auth.currentUser.email,
              uid: auth.currentUser.uid,
              displayName: auth.currentUser.displayName,
              profilePic: auth.currentUser.photoURL,
            })
          );
        });
      })
      .then(() => {
        toast.success("Sucessfully logged in");
        // navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  const loginPhone = () => {
    let tempData = metaData.filter((item) => {
      return item.phone === email;
    });
    if (tempData.length === 0) {
      toast.error("Phone number not registered yet");
      return;
    }

    signInWithEmailAndPassword(auth, tempData[0].email, password)
      .then(async (userCredential) => {
        const docRef = doc(db, "Users", auth.currentUser.email);
        const docSnap = await getDoc(docRef);
        dispatch(setUserData(docSnap.data()));
        dispatch(
          login({
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            profilePic: auth.currentUser.photoURL,
          })
        );
      })
      .then(() => {
        toast.success("Sucessfully logged in");
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  function generate(n) {
    var add = 1,
      max = 12 - add;
    if (n > max) {
      return generate(max) + generate(n - max);
    }
    max = Math.pow(10, n + add);
    var min = max / 10;
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ("" + number).substring(add);
  }

  const sendOTP = async () => {
    setLoading(true);
    if (mobileNumber === "") {
      toast.error("Required phone Number");
      setLoading(false);
      return;
    }
    let tempData = metaData.filter((item) => {
      return item.phone === mobileNumber;
    });
    if (tempData.length === 0) {
      toast.error("Phone number not registered yet");
      setLoading(false);
      return;
    }
    const otp = generate(6);
    setTempOtp(otp);
    try {
      const data = await axios.post("https://server.reverr.io/sendSmsCode", {
        to: mobileNumber,
        code: selectedCountry.dialCode.slice(1),
        message: `Your Reverr Login OTP is ${otp}`,
      });
      if (data.data.status) {
        toast.success(data.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("err", error);
      toast.error(error.response.data.message);
      setTempOtp(null);
    }
    setMinutes(3);
    setSeconds(0);
  };

  const confirmOtpNLogin = () => {
    setLoading(true);
    if (otpValue === "") {
      toast.error("Required otp");
      setLoading(false);
      return;
    }
    if (otpValue !== tempOtp) {
      toast.error("Otp does not match");
      setLoading(false);
      return;
    }
    let tempData = metaData.filter((item) => {
      return item.phone === mobileNumber;
    });
    fetchDataOfUserFromDB(tempData[0]);
  };

  const fetchDataOfUserFromDB = async (data) => {
    let tempDocData = {};
    const userDataRef = await collection(db, "Users");
    const q = await query(userDataRef);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (doc.id === data.email) {
        tempDocData = { password: doc.data().password };
      }
    });
    try {
      await signInWithEmailAndPassword(auth, data.email, tempDocData.password);
      toast.success("Successfully Logged In");
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log("err", error);
      setLoading(false);
    }
  };
  function onlyNumbers(str) {
    return /^[0-9]+$/.test(str);
  }
  useEffect(() => {
    if (email.length === 0) {
      setShowCodePicker(false);
      return;
    }
    if (onlyNumbers(email)) {
      setShowCodePicker(true);
      return;
    }
    if (!onlyNumbers(email)) {
      setShowCodePicker(false);
      return;
    }
  }, [email]);

  const handleLinkedinLogin = () => {
    window.open("https://server.reverr.io/api/linkedin/authorize", "_self");
  };
  // userDoc.Vibe_Data.How_To_Meet - []
  const handleTogglePassword = (event) => {
    event.preventDefault();
    console.log(showPassword);
    setShowPassword(!showPassword);
  };

  console.log("Set Show Password", showPassword);
  return (
    <>
      <NavBarFinalDarkMode isLoggedIn={false} />
      <div className={styles.PageWrapper}>
        <div className={styles.hiddenOnDesktop}>
          <div className={styles.headerImage}>
            <div className={styles.leftHeading}>
              Welcome to <span>Reverr</span>.
            </div>
            <div className={styles.rightImage}>
              {/* <img className={styles.hiddenOnMobile} src="/images/login_Image.png" alt="LoginImg" /> */}
              <img
                src={require("../../images/loginmobile.webp")}
                alt="LoginImg"
              />
            </div>
          </div>
        </div>
        <div className={styles.leftContent}>
          <div
            className={[styles.leftHeading, styles.hiddenOnMobile].join(" ")}
          >
            Welcome to <span>Reverr</span>.
          </div>
          <form onSubmit={onSubmit} className={styles.form}>
            <div>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Your E-Mail"
              />
            </div>
            <div style={{ position: "relative" }}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Enter a password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className={styles.toggleButton}
                // onClick={handleTogglePassword}
                onClick={(e) => {
                  console.log("TEsting");
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className={styles.forgotPassword}>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <button type="submit">Login</button>
          </form>
          <div className={styles.leftBottom}>
            <button onClick={signInWithGoogle} className={styles.googleBtn}>
              <span className={styles.gIconCont}>
                <img
                  className={styles.gICon}
                  src="/images/gIcon.png"
                  alt="gICon"
                />
                Continue with Google{" "}
              </span>
            </button>
            <div className={styles.newUser}>
              {/* <span>Don't remember password?&nbsp;&nbsp;&nbsp;</span> */}
              <Link to="/otp-login">Login with OTP</Link>
            </div>
            <div className={styles.newUser}>
              <span>New to Reverr?&nbsp;&nbsp;&nbsp;</span>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
        <div className={styles.hiddenOnMobile}>
          <div className={styles.headerImage}>
            <div className={styles.rightImage}>
              <img src="/images/login_Image.webp" alt="LoginImg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginTesting;
