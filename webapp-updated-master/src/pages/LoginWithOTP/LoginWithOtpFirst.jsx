import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import emailjs from "@emailjs/browser";
import axios from "axios";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import styles from "./LoginWithOtpFirst.module.css";
import LoginWithOtpSecond from "./LoginWithOtpSecond";
// import CountryCodePicker from "../../Utils/Country Code Picker/CountryCodePicker";
// import EnterOtpUpdated from "../EnterOtpUpdated/EnterOtpUpdated";
// import EnterOtpToChangePassword from "../EnterOtpToChangePassword/EnterOtpToChangePassword";
// import { updatePassword, signInWithEmailAndPassword } from "firebase/auth";

function LoginWithOtpFirst() {
  const selectedCountry = useSelector((state) => state.countryCode);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [tempOtp, setTempOtp] = useState(null);
  const [tempUserData, setTempUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showCodePicker, setShowCodePicker] = useState(false);
  const [metaData, setMetaData] = useState([]);
  // console.log("tempotp", tempOtp);
  // const [password, setPass] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [newOtp, setNewOtp] = useState("");
  // const theme = useSelector((state) => state.themeColor);

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
  }, [minutes, seconds]);

  //CHECK FOR META DATA
  useEffect(() => {
    // async function fetchUserDocFromFirebase() {
    //   const userDataRef = collection(db, "meta");
    //   const q = query(userDataRef);
    //   const querySnapshot = await getDocs(q);

    //   querySnapshot.forEach((doc) => {
    //     setMetaData(doc.data().emailPhone);
    //   });
    // }
    // fetchUserDocFromFirebase();
    async function fetchUserDocFromFirebase() {
      // const userDataRef = collection(db, "meta");
      // const q = query(userDataRef);
      // const querySnapshot = await getDocs(q);

      // querySnapshot.forEach((doc) => {
      //   setMetaData(doc.data().emailPhone);
      // });
      let nameDoc = "emailPhone";
      const collectionRef = collection(db, "meta");
      const docRef = doc(collectionRef, nameDoc);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        setMetaData({ ...docSnapshot.data() });
      }
    }
    fetchUserDocFromFirebase();
  }, []);

  const sendOtp = async (e) => {
    e.preventDefault();

    if (/^\d+$/.test(email)) {
      sendOTPByPhone();
      return;
    }

    setLoading(true);
    let tempDocData = {};
    const userDataRef = collection(db, "Users");
    const q = query(userDataRef);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (doc.id === email) {
        // console.log("id11: ", doc.data())
        tempDocData = { name: doc.data().name, password: doc.data().password };
        setTempUserData({
          name: doc.data().name,
          password: doc.data().password,
          email: doc.data().email,
        });
      }
    });
    if (JSON.stringify(tempDocData) === "{}") {
      toast.error("Email does not exist in database");
      setLoading(false);
      return;
    }
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
    const otp = generate(6);
    setTempOtp(otp);
    var templateParams = {
      from_name: "Reverr",
      to_name: tempDocData.name,
      to_email: email,
      otp,
    };

    emailjs
      .send(
        "service_lfmmz8k",
        "template_n3pcht5",
        templateParams,
        "dVExxiI8hYMCyc0sY"
      )
      .then(
        function (response) {
          //   console.log("SUCCESS!", response.status, response.text);
          setLoading(false);
        },
        function (error) {
          //   console.log("FAILED...", error);
          setLoading(false);
        }
      )
      .then(() => {
        toast.success("An OTP has been sent to your e-mail");
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.message);
        setLoading(false);
      });
    setMinutes(3);
    setSeconds(0);
  };

  const sendOTPByPhone = async () => {
    let tempData = metaData?.emailPhone.filter((item) => {
      return item.phone === email;
    });
    if (tempData === undefined) {
      toast.error("Phone number not registered yet");
      return;
    }

    setLoading(true);
    let tempDocData = {};
    const userDataRef = collection(db, "Users");
    const q = query(userDataRef);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (doc.id === tempData.email) {
        tempDocData = { name: doc.data().name, password: doc.data().password };
        setTempUserData({
          name: doc.data().name,
          password: doc.data().password,
          email: doc.data().email,
        });
      }
    });
    if (JSON.stringify(tempDocData) === "{}") {
      toast.error("Email does not exist in database");
      setLoading(false);
      return;
    }
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
    const otp = generate(6);
    setTempOtp(otp);
    try {
      const data = await axios.post("https://server.reverr.io/sendSmsCode", {
        to: email,
        code: selectedCountry.dialCode.slice(1),
        message: `Your Login OTP is ${otp}`,
      });
      if (data.data.status) {
        toast.success(data.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //   console.log("err", error);
      toast.error(error?.response?.data?.message);
    }
    setMinutes(3);
    setSeconds(0);
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

  return (
    <div>
      {tempOtp !== null ? (
        <LoginWithOtpSecond
          propOtp={tempOtp}
          tempUserData={tempUserData}
          email={email}
        />
      ) : (
        <>
          <NavBarFinalDarkMode isLoggedIn={false} />
          <div className={styles.mainContent}>
            <div className={styles.hiddenOnDesktop}>
              <text style={{ fontSize: 20, color: "#ffffff" }}>
                Enter Your Email
              </text>
              <img
                className={styles.mainImage}
                src={require("../../images/forgotpassword.webp")}
                alt='img'
              />
            </div>

            <div className={styles.leftComponent}>
              <p
                className={styles.hiddenOnMobile}
                style={{ fontSize: 35, color: "#ffffff", marginBlock: 20 }}
              >
                Enter Email or Phone
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "#ffffff",
                  fontFamily: "Reem-Kufi",
                }}
              >
                Enter the email address or phone number associated with your
                account
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "#ffffff",
                  fontFamily: "Reem-Kufi",
                }}
              >
                and we’ll send you an OTP to login.
              </p>
              <div className={styles.textInput}>
                <p style={{ fontSize: 10, color: "#ffffff" }}>Email or Phone</p>
                <input
                  type='email'
                  placeholder='type...'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <button
                style={{ cursor: loading ? "default" : "" }}
                onClick={sendOtp}
                disabled={loading}
              >
                Send OTP
              </button>
              <div
                style={{ marginTop: 5, display: "flex", alignSelf: "center" }}
              >
                <span style={{ color: "#999b9e", fontSize: 10 }}>
                  Don’t have an account?&nbsp;
                </span>
                <span
                  style={{
                    color: "#00b3ff",
                    fontSize: 10,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </span>
              </div>
            </div>
            <div className={styles.hiddenOnMobile}>
              <img
                className={styles.mainImage}
                src={require("../../images/forgotpassword.webp")}
                alt='img'
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LoginWithOtpFirst;
