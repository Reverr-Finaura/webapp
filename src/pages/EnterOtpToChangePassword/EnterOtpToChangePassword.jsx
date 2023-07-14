import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import { create, modify, selectNewUser } from "../../features/newUserSlice";
import { auth } from "../../firebase";
import styles from "./EnterOtpToChangePassword.module.css";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import otpPhoto from "../../images/otp-picture.png";
import ChangePasswordUpdated from "../ChangePasswordUpdated/ChangePasswordUpdated";

function EnterOtpToChangePassword({ propOtp, tempUserData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [enteredOtp, setEnteredotp] = useState("");
  const [firstDigit, setFirstDigit] = useState("");
  const [secondDigit, setSecondDigit] = useState("");
  const [thirdDigit, setThirdDigit] = useState("");
  const [fourthDigit, setFourthDigit] = useState("");
  const [fifthDigit, setFifthDigit] = useState("");
  const [sixthDigit, setSixthDigit] = useState("");
  const newUser = useSelector(selectNewUser);
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const [otpMatched, setOtpMatched] = useState(false);
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

  const checkOtp = (e) => {
    e.preventDefault();

    console.log("otp1", propOtp, enteredOtp);
    console.log("otp1", newOTP, enteredOtp);

    if (
      ((newOTP === "" && propOtp === enteredOtp) ||
        (newOTP !== "" && newOTP === enteredOtp)) &&
      (seconds > 0 || minutes > 0)
    ) {
      setOtpMatched(true);
    } else if (seconds <= 0 && minutes <= 0) {
      toast.error("OTP expired");
    } else {
      toast.error("Please check the entered OTP");
    }
  };

  const resendOtp = () => {
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
    setNewOTP(otp);

    var templateParams = {
      from_name: "Reverr",
      to_name: tempUserData.name,
      to_email: tempUserData.email,
      otp,
    };
    console.log("otp1", templateParams);
    console.log("otp1", otp);
    // dispatch(modify({ rand }));
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
        },
        function (error) {
          //   console.log("FAILED...", error);
        }
      )
      .then(() => {
        toast.success("New OTP has been sent to your e-mail");
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.message);
      });
    setMinutes(3);
    setSeconds(0);
  };

  return (
    <div>
      {otpMatched === true ? (
        <ChangePasswordUpdated email={tempUserData.email} />
      ) : (
        <>
          <NavBarFinalDarkMode isLoggedIn={false} />
          <div className={styles.otp}>
            <div className={styles.leftPart}>
              <div className={styles.getStarted}>
                <h1>Enter Verification Code</h1>
              </div>
              <div className={styles.para}>
                <p>Enter the OTP sent to your given Email Id.</p>
              </div>
              <form className={styles.otpForm} onSubmit={checkOtp}>
                <div className={styles.otpInputs}>
                  <input
                    maxLength={1}
                    type="text"
                    value={firstDigit}
                    onChange={(e) => setFirstDigit(e.target.value)}
                  />
                  <input
                    maxLength={1}
                    type="text"
                    value={secondDigit}
                    onChange={(e) => setSecondDigit(e.target.value)}
                  />
                  <input
                    maxLength={1}
                    type="text"
                    value={thirdDigit}
                    onChange={(e) => setThirdDigit(e.target.value)}
                  />
                  <input
                    maxLength={1}
                    type="text"
                    value={fourthDigit}
                    onChange={(e) => setFourthDigit(e.target.value)}
                  />
                  <input
                    maxLength={1}
                    type="text"
                    value={fifthDigit}
                    onChange={(e) => setFifthDigit(e.target.value)}
                  />
                  <input
                    maxLength={1}
                    type="text"
                    value={sixthDigit}
                    onChange={(e) => setSixthDigit(e.target.value)}
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
                  <Button className={styles.verifyBtn} type="submit">
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

            <div className="rightPart">
              <img className={styles.otpRightImg} src={otpPhoto} />
            </div>
          </div>
          {/* <Footer /> */}
        </>
      )}
    </div>
  );
}

export default EnterOtpToChangePassword;
