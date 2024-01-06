import {
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import { auth, db } from "../../firebase";
import styles from "./LoginWithOtpSecond.module.css";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import otpPhoto from "../../images/otp-picture.webp";
import { doc, getDoc } from "firebase/firestore";
import { login, setUserData } from "../../features/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

function LoginWithOtpSecond({
  propOtp,
  tempUserData,
  email,
  whatisUsed,
  setTempOtp,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCountry = useSelector((state) => state.countryCode);
  const [enteredOtp, setEnteredotp] = useState("");
  const [firstDigit, setFirstDigit] = useState("");
  const [secondDigit, setSecondDigit] = useState("");
  const [thirdDigit, setThirdDigit] = useState("");
  const [fourthDigit, setFourthDigit] = useState("");
  const [fifthDigit, setFifthDigit] = useState("");
  const [sixthDigit, setSixthDigit] = useState("");
  const firstDigitRef = useRef(null);
  const secondDigitRef = useRef(null);
  const thirdDigitRef = useRef(null);
  const fourthDigitRef = useRef(null);
  const fifthDigitRef = useRef(null);
  const sixthDigitRef = useRef(null);
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const [newOTP, setNewOTP] = useState("");

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

  useEffect(() => {
    const enteredDigits =
      firstDigit +
      secondDigit +
      thirdDigit +
      fourthDigit +
      fifthDigit +
      sixthDigit;
    setEnteredotp(enteredDigits);
  }, [
    firstDigit,
    secondDigit,
    thirdDigit,
    fourthDigit,
    fifthDigit,
    sixthDigit,
  ]);

  const checkOtp = async (e) => {
    e.preventDefault();
    if (
      ((newOTP === "" && propOtp === enteredOtp) ||
        (newOTP !== "" && newOTP === enteredOtp)) &&
      (seconds > 0 || minutes > 0)
    ) {
      signInWithEmailAndPassword(
        auth,
        tempUserData?.email,
        tempUserData?.password
      )
        .then(async (userCredential) => {
          const docRef = doc(db, "Users", auth.currentUser.email);
          await getDoc(docRef).then((doc) => {
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
          toast.success("Successfully logged in");
          navigate("/community");
        })
        .catch((error) => {
          var errorCode = error.code;
          switch (error.code) {
            case "auth/user-not-found":
              toast.error(
                "User not found. Please check your email or sign up."
              );
              return;
            case "auth/invalid-email":
              toast.error("Invalid email address. Please enter a valid email.");
              return;
            case "auth/wrong-password":
              toast.error("Incorrect password. Please try again.");
              return;
            case "auth/invalid-login-credentials":
              toast.error(
                "We didn't find any account linked with email and password. If you created with google please countinue with google login"
              );
              return;
            default:
              errorCode = errorCode.substring(5);
              toast.error(
                errorCode.charAt(0).toUpperCase() + errorCode.slice(1)
              );
              return;
          }
        });
    } else if (seconds <= 0 && minutes <= 0) {
      toast.error("OTP expired");
    } else {
      toast.error("Please check the entered OTP");
    }
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

  const resendOtp = () => {
    if (/^\d+$/.test(email)) {
      resendOTPByPhone();
      return;
    }
    const otp = generate(6);
    setNewOTP(otp);
    setTempOtp(otp);
    var templateParams = {
      from_name: "Reverr",
      to_name: tempUserData.name,
      to_email: tempUserData.email,
      otp,
    };
    emailjs
      .send(
        "service_lfmmz8k",
        "template_n3pcht5",
        templateParams,
        "dVExxiI8hYMCyc0sY"
      )
      .then(() => {
        toast.success("New OTP has been sent to your e-mail");
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setMinutes(3);
    setSeconds(0);
  };

  const resendOTPByPhone = async () => {
    const otp = generate(6);
    setTempOtp(otp);
    setNewOTP(otp);
    try {
      const data = await axios.post("https://server.reverr.io/sendSmsCode", {
        to: email,
        code: selectedCountry.dialCode.slice(1),
        message: `Your Login OTP is ${otp}`,
      });
      if (data.data.status) {
        toast.success("New OTP has been sent to your phone number");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setMinutes(3);
    setSeconds(0);
  };

  const handleKeyDown = (e, currentRef, previousRef) => {
    if (e.key === "Backspace" && currentRef.current.value === "") {
      previousRef.current.focus();
    }
  };

  return (
    <div>
      <>
        <NavBarFinalDarkMode isLoggedIn={false} />
        <div className={styles.otp}>
          <div className={styles.hiddenOnDesktop}>
            <div className='rightPart'>
              <div className={styles.getStarted}>
                <h1>Enter Verification Code</h1>
              </div>
              <img className={styles.otpRightImg} src={otpPhoto} alt='img' />
            </div>
          </div>

          <div className={styles.leftPart}>
            <div
              className={[styles.getStarted, styles.hiddenOnMobile].join(" ")}
            >
              <h1>Enter Verification Code</h1>
            </div>
            <div className={styles.para}>
              <p>Enter the OTP sent to your given {whatisUsed}.</p>
            </div>
            <form className={styles.otpForm} onSubmit={checkOtp}>
              <div className={styles.otpInputs}>
                <input
                  maxLength={1}
                  type='text'
                  value={firstDigit}
                  onChange={(e) => {
                    setFirstDigit(e.target.value);
                    if (e.target.value.length === 1) {
                      secondDigitRef.current.focus();
                    }
                  }}
                  ref={firstDigitRef}
                />
                <input
                  maxLength={1}
                  type='text'
                  value={secondDigit}
                  onChange={(e) => {
                    setSecondDigit(e.target.value);
                    if (e.target.value.length === 1) {
                      thirdDigitRef.current.focus();
                    }
                  }}
                  onKeyDown={(e) =>
                    handleKeyDown(e, secondDigitRef, firstDigitRef)
                  }
                  ref={secondDigitRef}
                />
                <input
                  maxLength={1}
                  type='text'
                  value={thirdDigit}
                  onChange={(e) => {
                    setThirdDigit(e.target.value);
                    if (e.target.value.length === 1) {
                      fourthDigitRef.current.focus();
                    }
                  }}
                  onKeyDown={(e) =>
                    handleKeyDown(e, thirdDigitRef, secondDigitRef)
                  }
                  ref={thirdDigitRef}
                />
                <input
                  maxLength={1}
                  type='text'
                  value={fourthDigit}
                  onChange={(e) => {
                    setFourthDigit(e.target.value);
                    if (e.target.value.length === 1) {
                      fifthDigitRef.current.focus();
                    }
                  }}
                  onKeyDown={(e) =>
                    handleKeyDown(e, fourthDigitRef, thirdDigitRef)
                  }
                  ref={fourthDigitRef}
                />
                <input
                  maxLength={1}
                  type='text'
                  value={fifthDigit}
                  onChange={(e) => {
                    setFifthDigit(e.target.value);
                    if (e.target.value.length === 1) {
                      sixthDigitRef.current.focus();
                    }
                  }}
                  onKeyDown={(e) =>
                    handleKeyDown(e, fifthDigitRef, fourthDigitRef)
                  }
                  ref={fifthDigitRef}
                />
                <input
                  maxLength={1}
                  type='text'
                  value={sixthDigit}
                  onChange={(e) => setSixthDigit(e.target.value)}
                  onKeyDown={(e) =>
                    handleKeyDown(e, sixthDigitRef, fifthDigitRef)
                  }
                  ref={sixthDigitRef}
                />
              </div>
              {seconds > 0 || minutes > 0 ? (
                <p className={styles.otp_timer}>
                  Otp valid till: {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </p>
              ) : (
                <p className={styles.otp_timer}>Didn't recieve code?</p>
              )}

              <div className={styles.buttonWrap}>
                <Button className={styles.verifyBtn} type='submit'>
                  Verify
                </Button>
                <h3
                  onClick={resendOtp}
                  disabled={seconds > 0 || minutes > 0}
                  style={{
                    cursor: seconds > 0 || minutes > 0 ? "default" : "",
                    color: seconds > 0 || minutes > 0 ? "gray" : "#10b7ff",
                  }}
                  className={styles.resend}
                >
                  Resend OTP
                </h3>
              </div>
            </form>
          </div>

          <div className={styles.hiddenOnMobile}>
            <div className='rightPart'>
              <img className={styles.otpRightImg} src={otpPhoto} alt='' />
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </>
    </div>
  );
}

export default LoginWithOtpSecond;